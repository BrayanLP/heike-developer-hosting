import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cómo funciona el hosting anual?",
    answer: "Nuestros planes de hosting se pagan una vez al año. Esto te permite ahorrar significativamente comparado con el pago mensual y garantiza que tu sitio web esté activo durante 365 días sin interrupciones por pagos vencidos.",
  },
  {
    question: "¿Incluye SSL gratis?",
    answer: "Sí, todos nuestros planes incluyen certificados SSL gratuitos de Let's Encrypt que se renuevan automáticamente. Esto garantiza que tu sitio web muestre el candado de seguridad.",
  },
  {
    question: "¿Puedo migrar mi página actual?",
    answer: "¡Por supuesto! Ofrecemos migración gratuita para todos los clientes nuevos. Nuestro equipo técnico se encarga de mover tus archivos y bases de datos sin pérdida de información.",
  },
  {
    question: "¿Puedo actualizar mi plan en el futuro?",
    answer: "Sí, puedes escalar tu plan en cualquier momento. Solo pagas la diferencia proporcional del tiempo restante de tu contrato anual.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-headline mb-4">
            Faqs
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground">
            Resolvemos tus dudas principales para que contrates con total tranquilidad.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
              <AccordionTrigger className="text-left font-bold text-sm md:text-xl hover:text-primary transition-colors py-4 md:py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm md:text-lg leading-relaxed pb-4 md:pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
