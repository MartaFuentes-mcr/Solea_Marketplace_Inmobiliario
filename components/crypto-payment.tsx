"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BLOCKCHAIN_CONFIG } from "@/lib/web3-utils"
import { CheckCircle } from "lucide-react"

interface CryptoPaymentProps {
  amount: number
  propertyId: number
  onSuccess?: (txHash: string) => void
}

export function CryptoPayment({ amount, propertyId, onSuccess }: CryptoPaymentProps) {
  const [selectedBlockchain, setSelectedBlockchain] = useState("ethereum")
  const [walletAddress, setWalletAddress] = useState("")
  const [showPasteHelper, setShowPasteHelper] = useState(false)
  const [loading, setLoading] = useState(false)
  const [txHash, setTxHash] = useState("")

  const isValidWalletAddress = (address: string, blockchain: string) => {
    const trimmed = address.trim()

    if (blockchain === "bitcoin" || blockchain === "dogecoin") {
      return /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/.test(trimmed)
    } else if (blockchain === "solana") {
      return /^[1-9A-HJ-NP-Za-km-z]{44}$/.test(trimmed)
    } else if (blockchain === "tron") {
      return /^T[a-zA-Z0-9]{33}$/.test(trimmed)
    } else {
      // EVM addresses (Ethereum, Polygon, Shiba)
      return /^0x[a-fA-F0-9]{40}$/.test(trimmed)
    }
  }

  const handlePasteWallet = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setWalletAddress(text.trim())
      setShowPasteHelper(false)
    } catch (error) {
      console.error("Error pasting from clipboard:", error)
    }
  }

  const handleCryptoPayment = async () => {
    if (!isValidWalletAddress(walletAddress, selectedBlockchain)) {
      alert("Dirección de wallet inválida para " + selectedBlockchain)
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/payment/crypto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount / 45000,
          blockchain: selectedBlockchain,
          walletAddress: walletAddress.trim(),
          propertyId,
        }),
      })

      const { txHash: hash } = await response.json()
      setTxHash(hash)
      onSuccess?.(hash)
    } catch (error) {
      console.error("Crypto payment error:", error)
      alert("Error procesando el pago. Intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const config = BLOCKCHAIN_CONFIG[selectedBlockchain as keyof typeof BLOCKCHAIN_CONFIG]
  const cryptoAmount = (amount / 45000).toFixed(4)
  const isAddressValid = walletAddress.length > 0 && isValidWalletAddress(walletAddress, selectedBlockchain)

  return (
    <Card className="p-4 space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Red Blockchain</label>
        <select
          className="w-full px-3 py-2 border border-border rounded-md bg-background"
          value={selectedBlockchain}
          onChange={(e) => {
            setSelectedBlockchain(e.target.value)
            setWalletAddress("") // Reset address when switching chains
          }}
        >
          {Object.entries(BLOCKCHAIN_CONFIG).map(([key, cfg]) => (
            <option key={key} value={key}>
              {cfg.icon} {cfg.name} ({cfg.symbol})
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium">Dirección de Wallet</label>
          <button onClick={handlePasteWallet} className="text-xs text-primary hover:underline">
            Pegar desde portapapeles
          </button>
        </div>
        <Input
          placeholder={
            selectedBlockchain === "bitcoin" || selectedBlockchain === "dogecoin"
              ? "1A1z7agoat..."
              : selectedBlockchain === "solana"
                ? "11111111111111111111111111111111..."
                : selectedBlockchain === "tron"
                  ? "TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx..."
                  : "0x742d35Cc6634C0532925a3b844Bc9e..."
          }
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className={isAddressValid ? "border-green-500 bg-green-50/50 dark:bg-green-900/10" : ""}
        />
        {walletAddress.length > 0 && (
          <p className={`text-xs mt-1 ${isAddressValid ? "text-green-600" : "text-red-500"}`}>
            {isAddressValid ? "✓ Dirección válida" : "✗ Dirección inválida para " + selectedBlockchain}
          </p>
        )}
      </div>

      {!txHash ? (
        <div className="bg-muted p-3 rounded text-sm">
          <p className="font-medium mb-1">Cantidad a pagar:</p>
          <p className="text-lg font-bold text-primary">
            {cryptoAmount} {config.symbol}
          </p>
          <p className="text-xs text-muted-foreground mt-2">≈ {amount}€</p>
        </div>
      ) : (
        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded flex gap-2">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-green-600">Transacción iniciada</p>
            <p className="text-xs font-mono text-green-600/70 break-all">{txHash}</p>
          </div>
        </div>
      )}

      <Button onClick={handleCryptoPayment} disabled={loading || !isAddressValid || txHash !== ""} className="w-full">
        {loading ? "Procesando..." : txHash ? "Pagado" : "Enviar transacción"}
      </Button>
    </Card>
  )
}
