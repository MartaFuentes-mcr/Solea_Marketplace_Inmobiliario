"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BLOCKCHAIN_CONFIG } from "@/lib/web3-utils"
import { Wallet } from "lucide-react"

export function WalletConnect() {
  const [connected, setConnected] = useState(false)
  const [selectedChain, setSelectedChain] = useState("ethereum")
  const [address, setAddress] = useState("")

  const handleConnectWallet = async () => {
    // Simular conexión de wallet
    if (typeof window !== "undefined" && "ethereum" in window) {
      try {
        setConnected(true)
        setAddress("0x742d35Cc6634C0532925a3b844Bc9e7595f42bE...")
      } catch (error) {
        console.error("Wallet connection failed:", error)
      }
    }
  }

  const blockchains = Object.entries(BLOCKCHAIN_CONFIG)

  return (
    <div className="flex items-center gap-3">
      {connected ? (
        <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium">{address.substring(0, 10)}...</span>
        </div>
      ) : (
        <Button onClick={handleConnectWallet} className="flex items-center gap-2">
          <Wallet className="w-4 h-4" />
          Conectar Wallet
        </Button>
      )}
    </div>
  )
}
