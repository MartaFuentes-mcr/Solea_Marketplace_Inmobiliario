"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { X, Send } from "lucide-react"

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
  propertyTitle?: string
  ownerName?: string
  ownerEmail?: string
  onSubmit?: (formData: any) => void
}

export function ContactFormModal({
  isOpen,
  onClose,
  propertyTitle = "Propiedad",
  ownerName = "Propietario",
  ownerEmail = "contacto@example.com",
  onSubmit,
}: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSent(true)
      onSubmit?.(formData)

      setTimeout(() => {
        setSent(false)
        setFormData({ name: "", email: "", phone: "", message: "" })
        onClose()
      }, 2000)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Contactar Propietario</h2>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-smooth">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-muted p-4 rounded-lg mb-6">
            <p className="text-sm text-muted-foreground mb-1">Propiedad</p>
            <p className="font-semibold text-foreground">{propertyTitle}</p>
            <p className="text-sm text-muted-foreground mt-3">Propietario: {ownerName}</p>
          </div>

          {sent ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Send className="w-6 h-6 text-green-600" />
              </div>
              <p className="font-semibold text-green-600">¡Mensaje enviado!</p>
              <p className="text-sm text-muted-foreground mt-2">El propietario se contactará pronto</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Nombre</label>
                <Input
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Teléfono</label>
                <Input
                  type="tel"
                  placeholder="+34 600 000 000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Mensaje</label>
                <textarea
                  placeholder="¿Tienes alguna pregunta sobre la propiedad?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-24"
                  required
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
                {loading ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </form>
          )}
        </div>
      </Card>
    </div>
  )
}
