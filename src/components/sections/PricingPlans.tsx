"use client";

import { useState } from "react";
import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EXCHANGE_RATE = 3.5;

const allPlans = [
  { name: "Básico", space: "5 GB", penPrice: 60, featured: true, popular: false, ram: "2 GB", cpu: "2 Core" },
  { name: "Intermedio", space: "7 GB", penPrice: 90, featured: true, popular: false, ram: "2 GB", cpu: "2 Core" },
  { name: "Pro", space: "10 GB", penPrice: 120, featured: true, popular: true, ram: "2 GB", cpu: "2 Core" },
  { name: "Plus", space: "20 GB", penPrice: 180, featured: false, popular: false, ram: "2 GB", cpu: "2 Core" },
  { name: "Business", space: "50 GB", penPrice: 300, featured: false, popular: false, ram: "2 GB", cpu: "2 Core" },
  { name: "Enterprise", space: "100 GB", penPrice: 500, featured: false, popular: false, ram: "2 GB", cpu: "2 Core" },
  { name: "Ultra", space: "150 GB", penPrice: 750, featured: false, popular: false, ram: "3 GB", cpu: "3 Core" },
  { name: "Ultimate", space: "200 GB", penPrice: 900, featured: false, popular: false, ram: "3 GB", cpu: "3 Core" },
];

const featuredPlans = allPlans.filter(p => p.featured);

const commonFeatures = [
  "Transferencia ILIMITADA",
  "Node.JS, Ruby y Python",
  "LiteSpeed + CloudLinux",
  "WordPress 1-Click",
  "SSL Gratis Incluido",
];

export default function PricingPlans() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [currency, setCurrency] = useState<"PEN" | "USD">("PEN");
  const [formData, setFormData] = useState({ name: "", email: "" });

  const formatPrice = (penPrice: number) => {
    if (currency === "USD") {
      return Math.ceil(penPrice / EXCHANGE_RATE).toString();
    }
    return penPrice.toString();
  };

  const getCurrencySymbol = () => (currency === "PEN" ? "S/" : "$");

  const handleOpenModal = (planName: string) => {
    setSelectedPlan(planName);
    setIsOpen(true);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const plan = allPlans.find(p => p.name === selectedPlan);
    const priceDisplay = `${getCurrencySymbol()} ${formatPrice(plan?.penPrice || 0)}`;
    const phoneNumber = "51924081817";
    const message = `Hola PROISO Tech & Software Solutions, mi nombre es ${formData.name}, mi correo es ${formData.email} y deseo contratar el Plan ${selectedPlan} por el precio anual de ${priceDisplay}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
    setIsOpen(false);
  };

  return (
    <section id="planes" className="py-10 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
            Elige el plan perfecto
          </h2>
          <div className="flex justify-center mb-6">
            <Tabs value={currency} onValueChange={(v) => setCurrency(v as "PEN" | "USD")} className="w-[180px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="PEN" className="font-bold">PEN</TabsTrigger>
                <TabsTrigger value="USD" className="font-bold">USD</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-12">
          {featuredPlans.map((plan, index) => (
            <Card key={index} className={`flex flex-col relative overflow-hidden transition-all border-2 ${plan.popular ? 'border-primary shadow-xl scale-105 z-10' : 'border-border shadow-sm'}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="rounded-none rounded-bl-lg px-3 py-1 text-xs font-bold">MÁS POPULAR</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-2 pt-8">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-primary font-bold text-sm">{plan.space} NVMe SSD</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 px-6">
                <div className="flex items-baseline justify-center gap-1 mb-6">
                  <span className="text-lg font-semibold">{getCurrencySymbol()}</span>
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tight">{formatPrice(plan.penPrice)}</span>
                  <span className="text-muted-foreground text-sm font-medium">/año</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm font-bold text-foreground">
                    <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <span>{plan.ram} RAM / {plan.cpu}</span>
                  </li>
                  {commonFeatures.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4 px-6 pb-8">
                <Button 
                  onClick={() => handleOpenModal(plan.name)}
                  className="w-full font-bold text-sm h-11" 
                  variant={plan.popular ? "default" : "outline"}
                >
                  Contratar Ahora
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold">Compara todos los planes</h3>
            <p className="text-muted-foreground text-sm mt-1">Tenemos el espacio justo para cada necesidad.</p>
          </div>
          
          <div className="rounded-lg border bg-card shadow-sm overflow-x-auto">
            <Table className="min-w-[600px]">
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="font-bold">Plan</TableHead>
                  <TableHead className="font-bold">Espacio</TableHead>
                  <TableHead className="font-bold">Recursos</TableHead>
                  <TableHead className="font-bold">Precio Anual</TableHead>
                  <TableHead className="text-right font-bold">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allPlans.map((plan) => (
                  <TableRow key={plan.name} className={plan.popular ? "bg-primary/5" : ""}>
                    <TableCell className="font-bold text-sm">
                      {plan.name} {plan.popular && <Badge variant="outline" className="ml-2 text-[10px] py-0">POPULAR</Badge>}
                    </TableCell>
                    <TableCell className="text-sm">{plan.space}</TableCell>
                    <TableCell className="text-sm">{plan.ram} RAM / {plan.cpu}</TableCell>
                    <TableCell className="font-bold text-primary text-sm">
                      {getCurrencySymbol()} {formatPrice(plan.penPrice)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="sm" 
                        className="text-xs font-bold"
                        variant="outline"
                        onClick={() => handleOpenModal(plan.name)}
                      >
                        Elegir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] w-[95vw] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Detalles de Contratación</DialogTitle>
            <DialogDescription className="text-sm">
              Completa tus datos para activar tu plan por WhatsApp de forma inmediata.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSendWhatsApp} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm">Nombre Completo</Label>
              <Input id="name" placeholder="Ej. Juan Pérez" required className="text-sm" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">Correo Electrónico</Label>
              <Input id="email" type="email" placeholder="correo@ejemplo.com" required className="text-sm" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan" className="text-sm">Plan Seleccionado</Label>
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger id="plan" className="text-sm">
                  <SelectValue placeholder="Selecciona un plan" />
                </SelectTrigger>
                <SelectContent>
                  {allPlans.map((plan) => (
                    <SelectItem key={plan.name} value={plan.name} className="text-sm">
                      Plan {plan.name} - {getCurrencySymbol()} {formatPrice(plan.penPrice)}/año
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12 gap-2 text-sm">
                <MessageCircle className="h-5 w-5" />
                Contratar por WhatsApp
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
