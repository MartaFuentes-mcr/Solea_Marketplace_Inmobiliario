"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BLOCKCHAIN_CONFIG } from "@/lib/web3-utils"
import { generateInvoice, generateInvoiceHTML } from "@/lib/payment-utils"

interface PaymentProcessorProps {
  amount: number
  propertyId: number
  onSuccess?: (transactionId: string) => void
}

export function PaymentProcessor({ amount, propertyId, onSuccess }: PaymentProcessorProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">("card")
  const [selectedCrypto, setSelectedCrypto] = useState("ethereum")
  const [email, setEmail] = useState("")
  const [processing, setProcessing] = useState(false)

  const handlePayment = async () => {
    setProcessing(true)
    try {
      // Simular procesamiento de pago
      const transactionId = `TXN-${Date.now()}`

      if (paymentMethod === "card") {
        // Stripe payment
        console.log("Procesando pago con tarjeta...")
      } else {
        // Crypto payment
        console.log(`Procesando pago en ${selectedCrypto}...`)
      }

      // Generar factura
      const invoice = generateInvoice(
        transactionId,
        [
          {
            description: `Pago propiedad #${propertyId}`,
            amount: amount,
            type: "sale",
          },
        ],
        {
          id: `payment-${Date.now()}`,
          type: paymentMethod,
          provider: paymentMethod === "card" ? "stripe" : selectedCrypto,
          walletAddress: paymentMethod === "crypto" ? "0x..." : undefined,
        },
      )

      console.log("Factura generada:", invoice)

      // Descargar factura
      const invoiceHTML = generateInvoiceHTML(invoice)
      const blob = new Blob([invoiceHTML], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `factura-${invoice.id}.html`
      a.click()

      onSuccess?.(transactionId)
    } catch (error) {
      console.error("Error en el pago:", error)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Método de Pago</h3>

      <div className="space-y-4">
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value as "card")}
            />
            <span>Tarjeta de Crédito</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="crypto"
              checked={paymentMethod === "crypto"}
              onChange={(e) => setPaymentMethod(e.target.value as "crypto")}
            />
            <span>Criptomoneda</span>
          </label>
        </div>

        {paymentMethod === "card" && (
          <div className="space-y-3">
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Número de tarjeta" />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="MM/YY" />
              <Input placeholder="CVC" />
            </div>
          </div>
        )}

        {paymentMethod === "crypto" && (
          <div>
            <label className="text-sm font-medium mb-2 block">Selecciona blockchain:</label>
            <select
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
            >
              {Object.entries(BLOCKCHAIN_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.name} ({config.symbol})
                </option>
              ))}
            </select>
            <div className="mt-3 p-3 bg-muted rounded text-sm">
              <p>
                Cantidad: {(amount / 45000).toFixed(4)}{" "}
                {BLOCKCHAIN_CONFIG[selectedCrypto as keyof typeof BLOCKCHAIN_CONFIG].symbol}
              </p>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-border">
          <div className="flex justify-between mb-4">
            <span>Total:</span>
            <span className="font-bold text-lg">{amount}€</span>
          </div>
          <Button onClick={handlePayment} disabled={processing} className="w-full">
            {processing ? "Procesando..." : "Pagar ahora"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
