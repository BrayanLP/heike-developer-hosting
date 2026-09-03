"use client";

import { useState } from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

export default function ComplaintsBook() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Reclamación enviada",
        description: "Su solicitud ha sido registrada correctamente. Le responderemos en un plazo máximo de 15 días hábiles.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col font-body">
      <Header />
      <main className="flex-1 bg-muted/30 py-6 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            <div>
              <h1 className="text-xl font-bold">Libro de Reclamaciones</h1>
              <p className="text-[10px] text-muted-foreground">Conforme a lo establecido en el Código de Protección y Defensa del Consumidor.</p>
            </div>
            <div className="bg-white p-1 rounded-lg shadow-sm border">
               <img 
                src="https://picsum.photos/seed/legal/200/100" 
                alt="Libro de Reclamaciones Virtual" 
                className="h-10 w-auto opacity-80"
              />
            </div>
          </div>

          <Card className="shadow-lg border-none">
            <CardHeader className="bg-primary/5 border-b py-3 px-4">
              <CardTitle className="text-sm">Hoja de Reclamación</CardTitle>
              <CardDescription className="text-[10px]">Rellene todos los campos para proceder con su registro.</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 px-4 pb-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold border-b pb-1">1. Identificación del Consumidor</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="name" className="text-[10px]">Nombre Completo</Label>
                      <Input id="name" required placeholder="Nombres y apellidos" className="h-8 text-[11px]" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="dni" className="text-[10px]">DNI / CE</Label>
                      <Input id="dni" required placeholder="Número de documento" className="h-8 text-[11px]" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-[10px]">Correo Electrónico</Label>
                      <Input id="email" type="email" required placeholder="correo@ejemplo.com" className="h-8 text-[11px]" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="phone" className="text-[10px]">Teléfono</Label>
                      <Input id="phone" required placeholder="999 999 999" className="h-8 text-[11px]" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="address" className="text-[10px]">Domicilio</Label>
                    <Input id="address" required placeholder="Dirección completa" className="h-8 text-[11px]" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold border-b pb-1">2. Bien Contratado</h3>
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="producto" />
                      <label htmlFor="producto" className="text-[10px] font-medium leading-none">Producto</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="servicio" defaultChecked />
                      <label htmlFor="servicio" className="text-[10px] font-medium leading-none">Servicio (Hosting)</label>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="amount" className="text-[10px]">Monto (S/)</Label>
                    <Input id="amount" type="number" placeholder="0.00" className="h-8 text-[11px]" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold border-b pb-1">3. Detalle de Reclamación</h3>
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="queja" />
                      <label htmlFor="queja" className="text-[10px] font-medium leading-none">Queja</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="reclamo" defaultChecked />
                      <label htmlFor="reclamo" className="text-[10px] font-medium leading-none">Reclamo</label>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="detail" className="text-[10px]">Detalle</Label>
                    <Textarea id="detail" required className="min-h-[60px] text-[11px]" placeholder="Describa lo sucedido..." />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="order" className="text-[10px]">Pedido</Label>
                    <Textarea id="order" required className="min-h-[40px] text-[11px]" placeholder="¿Qué solución espera?" />
                  </div>
                </div>

                <div className="bg-muted p-2 rounded text-[8px] text-muted-foreground leading-tight">
                  <p><strong>RECLAMO:</strong> Disconformidad relacionada a los servicios.</p>
                  <p><strong>QUEJA:</strong> Disconformidad no relacionada a los servicios; malestar respecto a la atención.</p>
                </div>

                <Button type="submit" className="w-full h-9 text-xs font-bold" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar Reclamación"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
