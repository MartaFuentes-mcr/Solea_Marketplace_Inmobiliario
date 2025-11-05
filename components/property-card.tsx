"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Share2, MapPin, Home, Zap } from "lucide-react"
import Link from "next/link"
import { ContactFormModal } from "./contact-form-modal"

interface PropertyCardProps {
  property: {
    id: number
    title: string
    location: string
    price: number
    type: string
    bedrooms: number
    bathrooms: number
    sqft: number
    image: string
    owner?: {
      name: string
      email: string
    }
  }
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const isRent = property.type === "Alquiler"

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    // Aquí iría la lógica para guardar en base de datos
    console.log("Propiedad favoriteada:", property.id)
  }

  const handleShare = async () => {
    const shareData = {
      title: property.title,
      text: `Mira esta propiedad: ${property.title} en ${property.location}`,
      url: `/property/${property.id}`,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log("Share cancelled")
      }
    } else {
      // Fallback: copiar al portapapeles
      const text = `${shareData.title}\n${property.location}\n${window.location.origin}/property/${property.id}`
      await navigator.clipboard.writeText(text)
      alert("Enlace copiado al portapapeles")
    }
  }

  return (
    <>
      <Card className="overflow-hidden hover:shadow-premium-lg transition-smooth border-0 bg-white dark:bg-slate-950">
        <div className="relative h-48 bg-muted overflow-hidden group">
          <img
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500"
          />
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-lg text-xs font-semibold shadow-md">
            {property.type}
          </div>
          <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-smooth">
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full h-9 w-9 p-0 shadow-md"
              onClick={handleFavorite}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </Button>
            <Button size="sm" variant="secondary" className="rounded-full h-9 w-9 p-0 shadow-md" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-base mb-1 text-foreground">{property.title}</h3>

          <div className="flex items-center gap-1 text-muted-foreground mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{property.location}</span>
          </div>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-primary">
              {isRent ? property.price : Math.round(property.price / 1000)}
            </span>
            <span className="text-muted-foreground text-sm font-medium">{isRent ? "/mes" : "K€"}</span>
          </div>

          <div className="flex gap-4 mb-4 text-sm text-muted-foreground border-t border-b border-border py-3">
            <div className="flex items-center gap-1">
              <Home className="w-4 h-4" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs">{property.sqft}m²</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href={`/property/${property.id}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-primary/20 hover:border-primary/40 transition-smooth bg-transparent"
              >
                Ver detalles
              </Button>
            </Link>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth shadow-md"
              onClick={() => setIsContactModalOpen(true)}
            >
              Contactar
            </Button>
          </div>
        </div>
      </Card>

      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        propertyTitle={property.title}
        ownerName={property.owner?.name || "Propietario"}
        ownerEmail={property.owner?.email || "contacto@example.com"}
        onSubmit={(formData) => console.log("Contacto enviado:", formData)}
      />
    </>
  )
}
