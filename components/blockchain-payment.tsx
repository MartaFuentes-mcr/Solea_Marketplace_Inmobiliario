"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MultiBlockchainSelector } from "./multi-blockchain-selector"
import { BLOCKCHAIN_CONFIG } from "@/lib/web3-utils"
import { CheckCircle, AlertCircle, Loader } from "lucide-react"

interface BlockchainPaymentProps {
  amount: number
  propertyId: number
  onSuccess?: (txHash: string, blockchain: string) => void
}

export function BlockchainPayment({ amount, propertyId, onSuccess }: BlockchainPaymentProps) {
  const [selectedBlockchain, setSelectedBlockchain] = useState("ethereum")
  const [walletAddress, setWalletAddress] = useState("")
  const [recipientAddress, setRecipientAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [txHash, setTxHash] = useState("")
  const [status, setStatus] = useState<"pending" | "confirmed" | "failed">("pending")

  const config = BLOCKCHAIN_CONFIG[selectedBlockchain as keyof typeof BLOCKCHAIN_CONFIG]

  const handleTransaction = async () => {
    if (!walletAddress || !recipientAddress) {
      alert("Por favor completa todos los campos")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/payment/blockchain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blockchain: selectedBlockchain,
          toAddress: recipientAddress,
          fromAddress: walletAddress,
          amount: (amount / 45000).toFixed(4),
        }),
      })

      const { txHash: hash } = await response.json()
      setTxHash(hash)
      setStatus("pending")

      // Simular verificación
      setTimeout(async () => {
        const verifyResponse = await fetch(`/api/payment/blockchain?tx=${hash}&blockchain=${selectedBlockchain}`)
        const { status: verifyStatus } = await verifyResponse.json()
        setStatus(verifyStatus as "confirmed" | "pending")
        if (verifyStatus === "confirmed") {
          onSuccess?.(hash, selectedBlockchain)
        }
      }, 3000)
    } catch (error) {
      console.error("Transaction error:", error)
      setStatus("failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Pago Multi-Blockchain</h3>
        <MultiBlockchainSelector selectedBlockchain={selectedBlockchain} onSelect={setSelectedBlockchain} />
      </div>

      {!txHash ? (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Tu dirección de wallet</label>
            <Input
              placeholder={`Ej: 0x742d35Cc6634C0532925a3b844Bc9e...`}
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Dirección receptora</label>
            <Input
              placeholder={`Dirección del vendedor en ${config.name}`}
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Cantidad a enviar:</span>
              <span className="font-bold">
                {(amount / 45000).toFixed(4)} {config.symbol}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Equivalente en EUR:</span>
              <span>≈ {amount}€</span>
            </div>
          </div>

          <Button
            onClick={handleTransaction}
            disabled={loading || !walletAddress || !recipientAddress}
            className="w-full h-11"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Procesando transacción...
              </>
            ) : (
              "Enviar transacción"
            )}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {status === "confirmed" && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-600">Transacción confirmada</p>
                <p className="text-sm text-green-600/70 font-mono break-all mt-1">{txHash}</p>
                <p className="text-sm text-green-600/70 mt-2">Red: {config.name}</p>
              </div>
            </div>
          )}

          {status === "pending" && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg flex gap-3">
              <Loader className="w-6 h-6 text-yellow-600 animate-spin flex-shrink-0" />
              <div>
                <p className="font-medium text-yellow-600">Esperando confirmación</p>
                <p className="text-sm text-yellow-600/70 font-mono break-all mt-1">{txHash}</p>
              </div>
            </div>
          )}

          {status === "failed" && (
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg flex gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-600">Transacción fallida</p>
                <p className="text-sm text-red-600/70 font-mono break-all mt-1">{txHash}</p>
              </div>
            </div>
          )}

          <Button
            onClick={() => {
              setTxHash("")
              setWalletAddress("")
              setRecipientAddress("")
            }}
            variant="outline"
            className="w-full"
          >
            Nueva transacción
          </Button>
        </div>
      )}
    </Card>
  )
}
