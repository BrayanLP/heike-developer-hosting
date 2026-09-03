import fs from 'node:fs/promises';
import path from 'node:path';
import { Marked } from 'marked';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  date: string;
  modified?: string;
  excerpt: string;
  coverImage?: string;
  categories: string[];
  tags: string[];
  author: string;
  originalUrl?: string;
  readingTime: string;
  contentHtml?: string;
  contentMarkdown?: string;
  toc?: TocItem[];
}

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/blog');

export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min de lectura`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina tildes
    .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres especiales
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Robust zero-dependency YAML Front-Matter parser
 */
export function parseFrontMatter(rawContent: string): { data: Record<string, any>; content: string } {
  const frontMatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = rawContent.match(frontMatterRegex);

  if (!match) {
    return { data: {}, content: rawContent.trim() };
  }

  const yamlBlock = match[1];
  const content = match[2].trim();
  const data: Record<string, any> = {};

  const lines = yamlBlock.split(/\r?\n/);
  let currentKey = '';
  let currentArray: string[] | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Array item like: - "item" or - item
    if (trimmed.startsWith('- ') && currentKey && currentArray !== null) {
      const itemVal = trimmed
        .replace(/^-\s*/, '')
        .replace(/^["']|["']$/g, '')
        .trim();
      currentArray.push(itemVal);
      continue;
    }

    // Key-value line
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      if (currentKey && currentArray !== null) {
        data[currentKey] = currentArray;
        currentArray = null;
      }

      const key = line.slice(0, colonIndex).trim();
      let rawValue = line.slice(colonIndex + 1).trim();

      // Remove inline comments (e.g. # comment) outside of quotes
      if (!rawValue.startsWith('"') && !rawValue.startsWith("'")) {
        const commentIdx = rawValue.indexOf('#');
        if (commentIdx !== -1) {
          rawValue = rawValue.slice(0, commentIdx).trim();
        }
      }

      // Check for inline JSON-like array: categories: ["A", "B"]
      if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
        try {
          const parsedArr = JSON.parse(rawValue.replace(/'/g, '"'));
          if (Array.isArray(parsedArr)) {
            data[key] = parsedArr;
            currentKey = '';
            currentArray = null;
            continue;
          }
        } catch {
          const items = rawValue
            .slice(1, -1)
            .split(',')
            .map((s) => s.trim().replace(/^["']|["']$/g, ''))
            .filter(Boolean);
          data[key] = items;
          currentKey = '';
          currentArray = null;
          continue;
        }
      }

      if (rawValue === '' || rawValue === '>-' || rawValue === '>') {
        currentKey = key;
        currentArray = [];
      } else {
        currentKey = key;
        currentArray = null;
        let cleanVal = rawValue.replace(/^["']|["']$/g, '');
        if (cleanVal === 'true') data[key] = true;
        else if (cleanVal === 'false') data[key] = false;
        else if (/^\d+$/.test(cleanVal)) data[key] = parseInt(cleanVal, 10);
        else data[key] = cleanVal;
      }
    }
  }

  if (currentKey && currentArray !== null) {
    data[currentKey] = currentArray;
  }

  return { data, content };
}

/**
 * Standard-compliant Markdown converter with Table of Contents, alert callouts, tables, code fences and anchors
 */
export function parseMarkdownWithToc(markdown: string): { contentHtml: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const idCounts = new Map<string, number>();

  const customMarked = new Marked();

  customMarked.use({
    renderer: {
      heading(token: any) {
        const text = this.parser.parseInline(token.tokens);
        const rawText = text.replace(/<[^>]*>/g, '').replace(/\*\*/g, '').trim();
        let baseId = slugify(rawText) || `seccion-${toc.length + 1}`;
        let uniqueId = baseId;
        if (idCounts.has(baseId)) {
          const count = idCounts.get(baseId)! + 1;
          idCounts.set(baseId, count);
          uniqueId = `${baseId}-${count}`;
        } else {
          idCounts.set(baseId, 1);
        }

        if (token.depth === 2 || token.depth === 3) {
          toc.push({ id: uniqueId, text: rawText, level: token.depth });
        }

        const classes: Record<number, string> = {
          1: 'text-3xl sm:text-4xl font-extrabold tracking-tight mt-12 mb-5 text-foreground',
          2: 'text-2xl sm:text-3xl font-bold tracking-tight mt-10 mb-4 text-foreground group flex items-center scroll-mt-24 pb-2 border-b border-border/50',
          3: 'text-xl sm:text-2xl font-bold tracking-tight mt-8 mb-3 text-foreground group flex items-center scroll-mt-24',
          4: 'text-lg font-bold tracking-tight mt-6 mb-2 text-foreground scroll-mt-24',
        };

        const anchor = (token.depth === 2 || token.depth === 3)
          ? `<a href="#${uniqueId}" class="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-muted-foreground hover:text-primary text-base font-normal" aria-label="Enlace a la sección">#</a>`
          : '';

        return `<h${token.depth} id="${uniqueId}" class="${classes[token.depth] || ''}"><span class="text-foreground">${text}</span>${anchor}</h${token.depth}>\n`;
      },
      code(token: any) {
        const lang = token.lang || 'code';
        const escaped = token.text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        return `<div class="relative my-6 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl">
  <div class="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
    <span class="font-bold uppercase tracking-wider text-primary">${lang}</span>
  </div>
  <pre class="p-5 overflow-x-auto text-xs md:text-sm font-mono leading-relaxed"><code class="language-${lang}">${escaped}</code></pre>
</div>\n`;
      },
      table(token: any) {
        let headerHtml = '';
        for (const cell of token.header) {
          headerHtml += this.tablecell(cell);
        }
        let rowsHtml = '';
        for (const row of token.rows) {
          let rowHtml = '';
          for (const cell of row) {
            rowHtml += this.tablecell(cell);
          }
          rowsHtml += `<tr class="hover:bg-muted/30 transition-colors">${rowHtml}</tr>\n`;
        }
        return `<div class="overflow-x-auto my-8 rounded-2xl border border-border bg-card shadow-sm">
  <table class="min-w-full text-sm border-collapse">
    <thead class="bg-muted/70 border-b border-border text-foreground font-bold text-xs uppercase tracking-wider">
      <tr>${headerHtml}</tr>
    </thead>
    <tbody class="divide-y divide-border">${rowsHtml}</tbody>
  </table>
</div>\n`;
      },
      tablecell(token: any) {
        const align = token.align;
        const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
        const text = this.parser.parseInline(token.tokens);
        if (token.header) {
          return `<th class="px-5 py-3.5 ${alignClass} font-bold text-xs uppercase tracking-wider text-foreground">${text}</th>\n`;
        }
        return `<td class="px-5 py-3.5 ${alignClass} text-sm text-foreground/90 leading-relaxed">${text}</td>\n`;
      },
      blockquote(token: any) {
        const text = this.parser.parse(token.tokens);
        const trimmed = text.trim();
        const alertMatch = trimmed.match(/^<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s*<br\s*\/?>)?([\s\S]*)<\/p>$/i);
        if (alertMatch) {
          const type = alertMatch[1].toUpperCase();
          const bodyText = alertMatch[2].trim();
          const styles: Record<string, { border: string; bg: string; titleColor: string; title: string }> = {
            NOTE: { border: 'border-blue-500', bg: 'bg-blue-500/10', titleColor: 'text-blue-400', title: 'Nota' },
            TIP: { border: 'border-emerald-500', bg: 'bg-emerald-500/10', titleColor: 'text-emerald-400', title: 'Consejo' },
            IMPORTANT: { border: 'border-purple-500', bg: 'bg-purple-500/10', titleColor: 'text-purple-400', title: 'Importante' },
            WARNING: { border: 'border-amber-500', bg: 'bg-amber-500/10', titleColor: 'text-amber-400', title: 'Advertencia' },
            CAUTION: { border: 'border-rose-500', bg: 'bg-rose-500/10', titleColor: 'text-rose-400', title: 'Precaución' },
          };
          const config = styles[type] || styles.NOTE;
          return `<div class="my-6 rounded-2xl border-l-4 ${config.border} ${config.bg} p-5 shadow-sm space-y-2">
  <div class="font-bold text-sm uppercase tracking-wider ${config.titleColor} flex items-center gap-1.5"><span>●</span> ${config.title}</div>
  <div class="text-sm md:text-base text-foreground/90 leading-relaxed">${bodyText}</div>
</div>\n`;
        }
        return `<blockquote class="border-l-4 border-primary bg-primary/5 p-5 rounded-r-2xl my-6 text-foreground/90 italic text-sm md:text-base leading-relaxed space-y-2">${text}</blockquote>\n`;
      },
      list(token: any) {
        const tag = token.ordered ? 'ol' : 'ul';
        let body = '';
        for (const item of token.items) {
          body += this.listitem(item);
        }
        const listClass = token.ordered
          ? 'my-5 space-y-2.5 list-decimal list-outside ml-6 text-foreground/90 text-sm md:text-base leading-relaxed'
          : 'my-5 space-y-2.5 list-disc list-outside ml-6 text-foreground/90 text-sm md:text-base leading-relaxed';
        return `<${tag} class="${listClass}">\n${body}</${tag}>\n`;
      },
      listitem(token: any) {
        const content = (this.parser as any).parse(token.tokens);
        return `<li class="leading-relaxed">${content}</li>\n`;
      },
      paragraph(token: any) {
        const text = this.parser.parseInline(token.tokens);
        return `<p class="my-4 text-foreground/90 leading-relaxed text-sm md:text-base">${text}</p>\n`;
      },
      image(token: any) {
        const caption = token.title || token.text;
        return `<figure class="my-8 rounded-2xl overflow-hidden border border-border shadow-lg bg-card">
  <img src="${token.href}" alt="${token.text || ''}" class="w-full object-cover aspect-[16/9]" loading="lazy" />
  ${caption && caption !== 'Portada' ? `<figcaption class="text-xs text-muted-foreground text-center py-2.5 px-4 bg-muted/40 border-t border-border font-medium">${caption}</figcaption>` : ''}
</figure>\n`;
      },
      link(token: any) {
        const text = this.parser.parseInline(token.tokens);
        const isExternal = token.href.startsWith('http') || token.href.startsWith('//');
        const titleAttr = token.title ? ` title="${token.title}"` : '';
        const extAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${token.href}"${titleAttr}${extAttr} class="text-primary hover:underline font-semibold inline-flex items-center gap-0.5">${text}</a>`;
      },
      codespan(token: any) {
        return `<code class="bg-muted px-1.5 py-0.5 rounded text-xs md:text-sm font-mono text-primary border border-border/70 font-semibold">${token.text}</code>`;
      },
      hr() {
        return `<hr class="my-10 border-border" />\n`;
      }
    }
  });

  const contentHtml = customMarked.parse(markdown) as string;
  return { contentHtml, toc };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const fileNames = await fs.readdir(POSTS_DIRECTORY);
    const mdFiles = fileNames.filter((file) => file.endsWith('.md'));

    const posts: BlogPost[] = await Promise.all(
      mdFiles.map(async (fileName) => {
        const fullPath = path.join(POSTS_DIRECTORY, fileName);
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data, content } = parseFrontMatter(fileContents);

        const slug = data.slug || fileName.replace(/\.md$/, '');
        const title = data.title || 'Sin título';
        const date = data.date || new Date().toISOString();
        const excerpt = data.excerpt || content.slice(0, 160).replace(/[#*`_]/g, '') + '...';
        const coverImage = data.coverImage || '';
        const categories = Array.isArray(data.categories) ? data.categories : [];
        const tags = Array.isArray(data.tags) ? data.tags : [];
        const author = data.author || 'Brenda Developer Hosting';
        const originalUrl = `https://brenda.dev/blog/${slug}`;

        return {
          id: data.id,
          title,
          slug,
          date,
          modified: data.modified,
          excerpt,
          coverImage,
          categories,
          tags,
          author,
          originalUrl,
          readingTime: calculateReadingTime(content),
        };
      })
    );

    // Sort descending by date
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const decodedSlug = decodeURIComponent(slug);
    const fullPath = path.join(POSTS_DIRECTORY, `${decodedSlug}.md`);

    let fileContents: string;
    try {
      fileContents = await fs.readFile(fullPath, 'utf8');
    } catch {
      const fileNames = await fs.readdir(POSTS_DIRECTORY);
      const match = fileNames.find(
        (f) => f.replace(/\.md$/, '') === decodedSlug || f.replace(/\.md$/, '') === slug
      );
      if (!match) return null;
      fileContents = await fs.readFile(path.join(POSTS_DIRECTORY, match), 'utf8');
    }

    const { data, content } = parseFrontMatter(fileContents);
    const coverImage = data.coverImage || '';

    // Deduplicate hero cover image if present in the markdown body
    let cleanContent = content;
    if (coverImage) {
      const escapedImg = coverImage.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      cleanContent = cleanContent.replace(new RegExp(`^!\\[[^\\]]*\\]\\(${escapedImg}\\)\\s*`, 'm'), '');
    }

    const { contentHtml, toc } = parseMarkdownWithToc(cleanContent);

    return {
      id: data.id,
      title: data.title || 'Sin título',
      slug: data.slug || slug,
      date: data.date || new Date().toISOString(),
      modified: data.modified,
      excerpt: data.excerpt || cleanContent.slice(0, 160).replace(/[#*`_]/g, '') + '...',
      coverImage,
      categories: Array.isArray(data.categories) ? data.categories : [],
      tags: Array.isArray(data.tags) ? data.tags : [],
      author: data.author || 'Brenda Developer Hosting',
      originalUrl: `https://brenda.dev/blog/${slug}`,
      readingTime: calculateReadingTime(content),
      contentHtml,
      contentMarkdown: content,
      toc,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return null;
  }
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categorySet = new Set<string>();
  posts.forEach((post) => {
    post.categories.forEach((cat) => {
      if (cat && cat.trim()) categorySet.add(cat.trim());
    });
  });
  return Array.from(categorySet);
}
