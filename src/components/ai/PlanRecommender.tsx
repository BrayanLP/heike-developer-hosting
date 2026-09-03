"use client";

import { useState } from "react";
import { recommendBrendaHostingPlan, type AiPlanRecommenderOutput } from "@/ai/flows/ai-plan-recommender-flow";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Loader2, CheckCircle, Package, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PlanRecommender() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AiPlanRecommenderOutput | null>(null);

  const handleRecommend = async () => {
    if (!description.trim()) return;
    setLoading(true);
    try {
      const result = await recommendBrendaHostingPlan({ websiteDescription: description });
      setRecommendation(result);
    } catch (error) {
      console.error("Failed to get recommendation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Encuentra tu plan ideal</h2>
          <p className="text-lg text-muted-foreground">
            Describe brevemente tu proyecto y te indicaremos cuál es la mejor opción para ti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <Card className="shadow-xl">
            <CardHeader>
              <CardDescription>
                Ej: "Necesito alojar una aplicación en NodeJS con unos 100 usuarios diarios y poco almacenamiento".
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Describe tu sitio web o aplicación..."
                className="min-h-[150px] resize-none text-base"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleRecommend} 
                disabled={loading || !description.trim()} 
                className="w-full font-bold h-12"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analizando...
                  </>
                ) : (
                  "Ver recomendación"
                )}
              </Button>
            </CardFooter>
          </Card>

          {recommendation ? (
            <Card className="border-2 border-primary shadow-2xl animate-in fade-in slide-in-from-bottom-4">
              <CardHeader className="bg-primary/5 pb-6">
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-primary text-primary-foreground font-bold">RECOMENDADO</Badge>
                  <Package className="h-8 w-8 text-primary opacity-50" />
                </div>
                <CardTitle className="text-3xl font-bold">{recommendation.recommendedPlan}</CardTitle>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl font-extrabold text-primary">{recommendation.price}</span>
                  <span className="text-muted-foreground">/año</span>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    ¿Por qué este plan?
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {recommendation.reasoning}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Incluye:</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <strong>Espacio: {recommendation.space}</strong>
                    </li>
                    {recommendation.features.slice(0, 4).map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full text-lg font-bold py-6 shadow-md" variant="default">
                  Contratar este plan
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="hidden md:flex flex-col items-center justify-center h-full border-2 border-dashed border-muted rounded-xl bg-muted/5 p-8 text-center text-muted-foreground">
              <Search className="h-12 w-12 mb-4 opacity-20" />
              <p>Escribe los detalles de tu proyecto para recibir una sugerencia personalizada.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
