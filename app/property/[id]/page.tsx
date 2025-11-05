"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { PaymentProcessor } from "@/components/payment-processor"
import { RentalPaymentProcessor } from "@/components/rental-payment-processor"
import { ContactFormModal } from "@/components/contact-form-modal"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Share2, Heart, ChevronRight, Wifi, Zap, Wind, Droplets, DoorOpen, Trees } from "lucide-react"

const MOCK_PROPERTY = {
  id: 1,
  title: "Apartamento Moderno Centro",
  location: "Madrid, Centro - Barrio de Salamanca",
  price: 450000,
  monthlyRent: 1500,
  type: "Venta",
  bedrooms: 3,
  bathrooms: 2,
  sqft: 120,
  floor: "4º",
  yearBuilt: 2015,
  images: [
    "/luxury-apartment-living-room.png",
    "/modern-kitchen.png",
    "/bedroom-interior.jpg",
    "/bathroom-tiles.png",
  ],
  description:
    "Hermoso apartamento totalmente reformado en el corazón de Madrid. Incluye todas las comodidades modernas, ubicado en una de las zonas más exclusivas de la capital.",
  features: [
    { name: "Ascensor", icon: DoorOpen },
    { name: "Aire acondicionado", icon: Wind },
    { name: "Calefacción central", icon: Zap },
    { name: "WiFi de fibra", icon: Wifi },
    { name: "Agua caliente", icon: Droplets },
    { name: "Terraza privada", icon: Trees },
  ],
  amenities: ["Piscina comunitaria", "Gimnasio", "Jardín", "Zona infantil", "Portería 24h", "Parking incluido"],
  certificateOfEnergy: "A",
  orientation: "Sur-Oeste",
  conditions: "Excelente",
  owner: {
    name: "Juan García López",
    phone: "+34 912 345 678",
    email: "juan@example.com",
    verified: true,
  },
  blockchain: {
    registeredOn: "Ethereum",
    certificateHash: "0x742d35Cc6634C0532925a3b844Bc9e7595f42bE...",
    verificationDate: "2024-01-15",
  },
}

export default function PropertyDetail({ params }: { params: { id: string } }) {
  const [showPayment, setShowPayment] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const isRental = MOCK_PROPERTY.type === "Alquiler"

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % MOCK_PROPERTY.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + MOCK_PROPERTY.images.length) % MOCK_PROPERTY.images.length)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative bg-muted rounded-lg overflow-hidden h-96 lg:h-[500px]">
            <img
              src={MOCK_PROPERTY.images[currentImageIndex] || "/placeholder.svg"}
              alt={`${MOCK_PROPERTY.title} - ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {MOCK_PROPERTY.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  ›
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {MOCK_PROPERTY.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition ${idx === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2">{MOCK_PROPERTY.title}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <span>{MOCK_PROPERTY.location}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 w-10 p-0 bg-transparent"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button variant="outline" size="sm" className="h-10 w-10 p-0 bg-transparent">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 py-6 border-y border-border">
                <div>
                  <p className="text-muted-foreground text-sm">Dormitorios</p>
                  <p className="text-2xl font-bold">{MOCK_PROPERTY.bedrooms}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Baños</p>
                  <p className="text-2xl font-bold">{MOCK_PROPERTY.bathrooms}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Superficie</p>
                  <p className="text-2xl font-bold">{MOCK_PROPERTY.sqft} m²</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Planta</p>
                  <p className="text-2xl font-bold">{MOCK_PROPERTY.floor}</p>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-3">Descripción</h2>
              <p className="text-muted-foreground mb-6">{MOCK_PROPERTY.description}</p>

              <h3 className="text-lg font-semibold mb-4">Características principales</h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {MOCK_PROPERTY.features.map((feature, idx) => {
                  const IconComponent = feature.icon
                  return (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <IconComponent className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature.name}</span>
                    </div>
                  )
                })}
              </div>

              <h3 className="text-lg font-semibold mb-3">Amenidades</h3>
              <ul className="grid grid-cols-2 gap-2 mb-6">
                {MOCK_PROPERTY.amenities.map((amenity, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    <span className="text-sm">{amenity}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-3">Detalles adicionales</h3>
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-muted-foreground text-sm">Año de construcción</p>
                  <p className="font-semibold">{MOCK_PROPERTY.yearBuilt}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Orientación</p>
                  <p className="font-semibold">{MOCK_PROPERTY.orientation}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Certificado energético</p>
                  <p className="font-semibold text-green-600">{MOCK_PROPERTY.certificateOfEnergy}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Condiciones</p>
                  <p className="font-semibold">{MOCK_PROPERTY.conditions}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">🔗</span> Verificación Blockchain
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">Red:</span>{" "}
                  <span className="font-medium">{MOCK_PROPERTY.blockchain.registeredOn}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Hash del certificado:</span>
                  <br />
                  <span className="font-mono text-xs break-all text-primary">
                    {MOCK_PROPERTY.blockchain.certificateHash}
                  </span>
                </p>
                <p>
                  <span className="text-muted-foreground">Verificado el:</span>{" "}
                  <span className="font-medium">{MOCK_PROPERTY.blockchain.verificationDate}</span>
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Información del propietario</h3>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/50 rounded-full flex items-center justify-center text-white font-bold">
                  {MOCK_PROPERTY.owner.name.charAt(0)}
                </div>
                <div className="flex-1 space-y-2">
                  <p className="font-semibold flex items-center gap-2">
                    {MOCK_PROPERTY.owner.name}
                    {MOCK_PROPERTY.owner.verified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Verificado</span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">{MOCK_PROPERTY.owner.email}</p>
                  <p className="text-sm text-muted-foreground">{MOCK_PROPERTY.owner.phone}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">{isRental ? "Renta Mensual" : "Precio"}</span>
                  <span className="text-3xl font-bold text-primary">
                    {(isRental ? MOCK_PROPERTY.monthlyRent : MOCK_PROPERTY.price).toLocaleString("es-ES")}€
                  </span>
                </div>
                <Button onClick={() => setShowPayment(!showPayment)} className="w-full mb-2">
                  {showPayment ? "Cancelar" : isRental ? "Alquilar ahora" : "Comprar ahora"}
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowContactModal(true)}>
                  Contactar propietario
                </Button>
              </div>

              {showPayment &&
                (isRental ? (
                  <RentalPaymentProcessor
                    propertyId={MOCK_PROPERTY.id}
                    propertyTitle={MOCK_PROPERTY.title}
                    monthlyRent={MOCK_PROPERTY.monthlyRent}
                    securityDeposit={Math.floor(MOCK_PROPERTY.monthlyRent * 2)}
                    durationMonths={12}
                    onSuccess={(txId) => {
                      console.log("Alquiler confirmado:", txId)
                      setShowPayment(false)
                    }}
                  />
                ) : (
                  <PaymentProcessor
                    amount={MOCK_PROPERTY.price}
                    propertyId={MOCK_PROPERTY.id}
                    onSuccess={(txId) => {
                      console.log("Transacción exitosa:", txId)
                      setShowPayment(false)
                    }}
                  />
                ))}
            </Card>
          </div>
        </div>
      </div>

      <ContactFormModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        propertyTitle={MOCK_PROPERTY.title}
        ownerName={MOCK_PROPERTY.owner.name}
        ownerEmail={MOCK_PROPERTY.owner.email}
        onSubmit={(formData) => console.log("Contact form submitted:", formData)}
      />
    </main>
  )
}
