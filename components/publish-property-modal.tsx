"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X, Upload } from "lucide-react"

interface PublishPropertyModalProps {
  isOpen: boolean
  onClose: () => void
  type?: "buy" | "rent" | "sell"
}

export function PublishPropertyModal({ isOpen, onClose, type = "sell" }: PublishPropertyModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    type: "Apartamento",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    description: "",
    images: [] as string[],
  })
  const [loading, setLoading] = useState(false)
  const [published, setPublished] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setPublished(true)

      setTimeout(() => {
        setPublished(false)
        setFormData({
          title: "",
          location: "",
          price: "",
          type: "Apartamento",
          bedrooms: "",
          bathrooms: "",
          sqft: "",
          description: "",
          images: [],
        })
        onClose()
      }, 2500)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const titles = {
    buy: "Comprar Propiedad",
    rent: "Alquilar Propiedad",
    sell: "Publicar Propiedad",
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-2xl shadow-xl">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{titles[type]}</h2>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-smooth">
                <X className="w-5 h-5" />
              </button>
            </div>

            {published ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <p className="text-2xl font-bold text-green-600 mb-2">¡Publicado exitosamente!</p>
                <p className="text-muted-foreground">Tu propiedad está ahora visible para todos los interesados</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">Título de la Propiedad</label>
                    <Input
                      placeholder="Ej: Apartamento Moderno Centro"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">Ubicación</label>
                    <Input
                      placeholder="Ej: Madrid, Centro"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">Precio ({type === "rent" ? "€/mes" : "€"})</label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">Tipo de Propiedad</label>
                    <select
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option>Apartamento</option>
                      <option>Casa</option>
                      <option>Oficina</option>
                      <option>Estudio</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">Dormitorios</label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">Baños</label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium block mb-2">Superficie (m²)</label>
                    <Input
                      type="number"
                      placeholder="120"
                      value={formData.sqft}
                      onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Descripción</label>
                  <textarea
                    placeholder="Describe la propiedad con detalles..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-24"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2">Imágenes</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-smooth cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Arrastra imágenes aquí</p>
                    <p className="text-xs text-muted-foreground">o haz clic para seleccionar</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={loading} className="flex-1 bg-primary hover:bg-primary/90">
                    {loading ? "Publicando..." : "Publicar Propiedad"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
