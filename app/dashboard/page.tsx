"use client"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AnalyticsDashboard } from "./analytics"
import { TransactionsDashboard } from "./transactions"
import { WalletOverview } from "./wallet-overview"
import { Home, TrendingUp, Settings, Calendar } from "lucide-react"
import { useState, useEffect } from "react"

const stats = [
  {
    title: "Propiedades Activas",
    value: "24",
    change: "+3 este mes",
    icon: Home,
    color: "text-blue-600",
  },
  {
    title: "Volumen Total",
    value: "€12.4M",
    change: "+18% vs mes anterior",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "Alquileres Activos",
    value: "8",
    change: "+2 nuevos",
    icon: Calendar,
    color: "text-orange-600",
  },
  {
    title: "Ingresos Mensuales",
    value: "€4,200",
    change: "+12% en 30 días",
    icon: TrendingUp,
    color: "text-purple-600",
  },
]

export default function EnhancedDashboard() {
  const [activeRentals, setActiveRentals] = useState([])

  useEffect(() => {
    const rentals = JSON.parse(localStorage.getItem("activeRentals") || "[]")
    setActiveRentals(rentals)
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Bienvenido a tu panel de control inmobiliario blockchain</p>
          </div>
          <Button className="gap-2">
            <Settings className="w-4 h-4" />
            Configuración
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <Card key={idx} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Icon className={`w-8 h-8 ${stat.color} opacity-50`} />
                </div>
                <h3 className="text-sm text-muted-foreground mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </Card>
            )
          })}
        </div>

        {/* Tabbed Content */}
        <Tabs defaultValue="rentals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="rentals">Alquileres</TabsTrigger>
            <TabsTrigger value="wallets">Wallets</TabsTrigger>
            <TabsTrigger value="transactions">Transacciones</TabsTrigger>
            <TabsTrigger value="analytics">Análisis</TabsTrigger>
          </TabsList>

          <TabsContent value="rentals" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Mis Alquileres Activos</h2>
              {activeRentals.length > 0 ? (
                <div className="space-y-4">
                  {activeRentals.map((rental) => (
                    <Card key={rental.id} className="p-4 border border-border/50">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Propiedad</p>
                          <p className="font-semibold">{rental.propertyTitle}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Renta Mensual</p>
                          <p className="font-semibold text-primary">{rental.monthlyRent}€</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Próximo Pago</p>
                          <p className="font-semibold">{new Date(rental.nextPaymentDue).toLocaleDateString("es-ES")}</p>
                        </div>
                        <div className="flex items-end">
                          <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            ✓ Activo
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No tienes alquileres activos</p>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="wallets" className="space-y-6">
            <WalletOverview />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <TransactionsDashboard />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Mis Propiedades</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">Propiedad #{i}</h3>
                      <p className="text-sm text-muted-foreground mb-3">Madrid, Centro</p>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">€450,000</span>
                        <span className="text-green-600">✓ Activa</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
