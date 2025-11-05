"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface StripePaymentProps {
  amount: number
  propertyId: number
  onSuccess?: (paymentIntentId: string) => void
}

export function StripePayment({ amount, propertyId, onSuccess }: StripePaymentProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/payment/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "EUR",
          propertyId,
          email,
        }),
      })

      const { clientSecret, id } = await response.json()

      // En producción, usar stripe.js para completar el pago
      console.log("Payment Intent created:", id)

      onSuccess?.(id)
    } catch (error) {
      console.error("Payment error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-4">
      <div className="space-y-3">
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="MM/YY" />
          <Input placeholder="CVC" />
        </div>
        <Button onClick={handlePayment} disabled={loading} className="w-full">
          {loading ? "Procesando..." : `Pagar ${amount}€`}
        </Button>
      </div>
    </Card>
  )
}
