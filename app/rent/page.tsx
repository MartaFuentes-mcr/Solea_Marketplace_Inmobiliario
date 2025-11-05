"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PropertyGrid } from "@/components/property-grid"
import { SearchFilters } from "@/components/search-filters"
import { PublishPropertyModal } from "@/components/publish-property-modal"
import { Calendar, Zap, Clock } from "lucide-react"
import { useState } from "react"

export default function RentPage() {
  const [filters, setFilters] = useState({
    type: "all",
    minPrice: 0,
    maxPrice: 1000000,
    city: "",
    bedrooms: 0,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent/5 via-primary/5 to-transparent py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Alquila Tu Hogar Ideal</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Miles de propiedades disponibles. Alquila con contratos inteligentes verificados en blockchain.
            </p>

            {/* Quick Search */}
            <div className="flex flex-col md:flex-row gap-3">
              <Input placeholder="¿Dónde quieres vivir?" className="flex-1 bg-white shadow-sm" />
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                onClick={() => setIsModalOpen(true)}
              >
                Explorar
              </Button>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 border-0 shadow-premium hover:shadow-premium-lg transition-smooth">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground mb-1">Pagos Automáticos</h3>
                  <p className="text-sm text-muted-foreground">
                    Renta mensual transferida automáticamente al propietario
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-premium hover:shadow-premium-lg transition-smooth">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground mb-1">Sin Comisiones Ocultas</h3>
                  <p className="text-sm text-muted-foreground">Transparencia total con blockchain</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-premium hover:shadow-premium-lg transition-smooth">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground mb-1">Contratos Inteligentes</h3>
                  <p className="text-sm text-muted-foreground">Acuerdos vinculantes verificados automáticamente</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Filters & Properties */}
      <section className="container mx-auto px-4 py-12">
        <SearchFilters filters={filters} onFiltersChange={setFilters} />
        <div className="mt-8">
          <PropertyGrid filters={filters} />
        </div>
      </section>

      {/* Modal Component */}
      <PublishPropertyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type="rent" />
    </main>
  )
}
