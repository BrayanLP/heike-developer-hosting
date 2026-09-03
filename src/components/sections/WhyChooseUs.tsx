import { Server, Share2, Award, Terminal } from "lucide-react";

const features = [
  {
    title: "CPanel & DirectAdmin",
    description: "Elige entre los mejores paneles de control para gestionar tu cuenta de forma intuitiva.",
    icon: Terminal,
  },
  {
    title: "Migración Gratuita",
    description: "Nos encargamos de mover tus archivos y bases de datos sin costo y sin inactividad.",
    icon: Share2,
  },
  {
    title: "Soporte 24/7",
    description: "Estamos listos para ayudarte en cualquier momento con personal capacitado.",
    icon: Award,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-12 md:py-24 bg-muted/5">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p className="mx-auto max-w-2xl text-sm md:text-lg text-muted-foreground leading-relaxed">
            Soluciones robustas para desarrolladores que buscan estabilidad y velocidad real.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4 px-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-sm transition-transform hover:scale-110">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold">{feature.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
