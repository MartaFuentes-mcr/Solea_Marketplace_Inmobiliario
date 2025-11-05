"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PublishPropertyModal } from "@/components/publish-property-modal"
import { BarChart3, Users2, Zap } from "lucide-react"
import { useState } from "react"

export default function SellPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-transparent py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Vende Tu Propiedad Rápido</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Llega a miles de compradores verificados. Vende en cripto o fiat. Proceso 100% blockchain.
            </p>

            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md px-8 h-12"
              onClick={() => setIsModalOpen(true)}
            >
              Publicar Propiedad
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="p-8 border-0 shadow-premium hover:shadow-premium-lg transition-smooth">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-primary/10 rounded-xl mb-4">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Máxima Visibilidad</h3>
                <p className="text-muted-foreground text-sm">
                  Tu propiedad llega a compradores de todo el mundo interesados en activos blockchain
                </p>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-premium hover:shadow-premium-lg transition-smooth">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-accent/10 rounded-xl mb-4">
                  <Zap className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Proceso Rápido</h3>
                <p className="text-muted-foreground text-sm">
                  Cierra la venta en días, no en meses. Pagos instantáneos en blockchain
                </p>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-premium hover:shadow-premium-lg transition-smooth">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-primary/10 rounded-xl mb-4">
                  <Users2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Compradores Verificados</h3>
                <p className="text-muted-foreground text-sm">
                  Todos los compradores están verificados y tienen capacidad de pago probada
                </p>
              </div>
            </Card>
          </div>

          {/* Steps Section */}
          <div className="bg-white dark:bg-slate-900/50 rounded-xl p-8 shadow-premium">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Vender es Fácil en 3 Pasos</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  title: "Crear Anuncio",
                  description: "Sube fotos, detalles y especificaciones de tu propiedad",
                },
                {
                  step: 2,
                  title: "Recibe Ofertas",
                  description: "Compradores verificados te contactan con sus propuestas",
                },
                {
                  step: 3,
                  title: "Cierra el Trato",
                  description: "Firma contrato inteligente y recibe el pago en blockchain",
                },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm text-center">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Card className="p-12 border-0 bg-gradient-to-r from-primary/5 to-accent/5 shadow-premium">
              <h3 className="text-2xl font-bold text-foreground mb-4">¿Listo para Vender?</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Publica tu propiedad hoy y conecta con compradores serios de todo el mundo
              </p>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md px-8 h-12"
                onClick={() => setIsModalOpen(true)}
              >
                Publicar Ahora
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <PublishPropertyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type="sell" />
    </main>
  )
}
