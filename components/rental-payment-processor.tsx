"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BLOCKCHAIN_CONFIG } from "@/lib/web3-utils"
import { generateInvoice, generateInvoiceHTML } from "@/lib/payment-utils"
import { CheckCircle } from "lucide-react"

interface RentalPaymentProcessorProps {
  propertyId: number
  propertyTitle: string
  monthlyRent: number
  securityDeposit: number
  durationMonths: number
  onSuccess?: (transactionId: string) => void
}

export function RentalPaymentProcessor({
  propertyId,
  propertyTitle,
  monthlyRent,
  securityDeposit,
  durationMonths,
  onSuccess,
}: RentalPaymentProcessorProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">("card")
  const [selectedCrypto, setSelectedCrypto] = useState("ethereum")
  const [email, setEmail] = useState("")
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [txHash, setTxHash] = useState("")

  const totalDeposit = monthlyRent + securityDeposit

  const handleRentalPayment = async () => {
    setProcessing(true)
    try {
      const transactionId = `RENTAL-${Date.now()}`
      const rentalId = Math.floor(Math.random() * 100000)

      // Generar factura de primer pago + depósito
      const invoice = generateInvoice(
        transactionId,
        [
          {
            description: `Primer mes de alquiler: ${propertyTitle}`,
            amount: monthlyRent,
            type: "rent",
          },
          {
            description: "Depósito de seguridad",
            amount: securityDeposit,
            type: "rent",
          },
        ],
        {
          id: `rental-${rentalId}`,
          type: paymentMethod,
          provider: paymentMethod === "card" ? "stripe" : selectedCrypto,
          walletAddress: paymentMethod === "crypto" ? "0x..." : undefined,
        },
      )

      // Simular descarga de factura
      const invoiceHTML = generateInvoiceHTML(invoice)
      const blob = new Blob([invoiceHTML], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `rental-invoice-${rentalId}.html`
      a.click()

      // Registrar en localStorage para demo del dashboard
      const rentals = JSON.parse(localStorage.getItem("activeRentals") || "[]")
      rentals.push({
        id: rentalId,
        propertyId,
        propertyTitle,
        monthlyRent,
        securityDeposit,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + durationMonths * 30 * 24 * 60 * 60 * 1000).toISOString(),
        nextPaymentDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: "active",
        paymentMethod,
        transactionHash: transactionId,
      })
      localStorage.setItem("activeRentals", JSON.stringify(rentals))

      setTxHash(transactionId)
      setSuccess(true)
      onSuccess?.(transactionId)

      setTimeout(() => {
        setSuccess(false)
        setProcessing(false)
      }, 3000)
    } catch (error) {
      console.error("Rental payment error:", error)
      setProcessing(false)
    }
  }

  if (success) {
    return (
      <Card className="p-6 border-green-200 bg-green-50 dark:bg-green-900/20">
        <div className="flex gap-3 items-start">
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900 dark:text-green-300 mb-1">¡Alquiler confirmado!</h3>
            <p className="text-sm text-green-800 dark:text-green-400 mb-2">
              Tu contrato de alquiler ha sido registrado en blockchain
            </p>
            <p className="text-xs font-mono text-green-700 dark:text-green-500 break-all">{txHash}</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Confirmar Alquiler</h3>

      <div className="bg-muted p-4 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span>Renta Mensual:</span>
          <span className="font-medium">{monthlyRent}€</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Depósito de Seguridad:</span>
          <span className="font-medium">{securityDeposit}€</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Duración:</span>
          <span className="font-medium">{durationMonths} meses</span>
        </div>
        <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
          <span>Total a Pagar:</span>
          <span className="text-primary">{totalDeposit}€</span>
        </div>
      </div>

      <div className="space-y-3">
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
          <div className="space-y-3 pt-2 border-t border-border">
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Número de tarjeta" />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="MM/YY" />
              <Input placeholder="CVC" />
            </div>
          </div>
        )}

        {paymentMethod === "crypto" && (
          <div className="space-y-3 pt-2 border-t border-border">
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
            </div>
            <div className="bg-muted p-3 rounded text-sm">
              <p className="text-muted-foreground">
                Cantidad: {(totalDeposit / 45000).toFixed(4)}{" "}
                {BLOCKCHAIN_CONFIG[selectedCrypto as keyof typeof BLOCKCHAIN_CONFIG].symbol}
              </p>
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={handleRentalPayment}
        disabled={processing || (paymentMethod === "card" && !email)}
        className="w-full"
      >
        {processing ? "Procesando..." : `Confirmar Alquiler - ${totalDeposit}€`}
      </Button>
    </Card>
  )
}
