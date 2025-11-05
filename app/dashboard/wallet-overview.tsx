"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, Send, Plus } from "lucide-react"

const wallets = [
  {
    name: "Ethereum",
    symbol: "ETH",
    balance: 2.5,
    usdValue: 5250,
    address: "0x742d35Cc6634C0532925a3b844Bc9e759...",
  },
  {
    name: "Polygon",
    symbol: "MATIC",
    balance: 1500,
    usdValue: 1200,
    address: "0x742d35Cc6634C0532925a3b844Bc9e759...",
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    balance: 0.15,
    usdValue: 6750,
    address: "1A1z7agoat5x3jUz2DLQCAtmmzn5sSKHsC",
  },
  {
    name: "Solana",
    symbol: "SOL",
    balance: 50,
    usdValue: 7000,
    address: "solana_address_example...",
  },
]

export function WalletOverview() {
  const totalValue = wallets.reduce((sum, w) => sum + w.usdValue, 0)

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="opacity-90 mb-2">Valor Total en Wallets</p>
            <h1 className="text-4xl font-bold mb-1">${totalValue.toLocaleString("es-ES")}</h1>
            <p className="text-sm opacity-75">Distribuido en 4 blockchains</p>
          </div>
          <Wallet className="w-12 h-12 opacity-30" />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wallets.map((wallet, idx) => (
          <Card key={idx} className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">{wallet.name}</p>
                <h3 className="text-xl font-bold">
                  {wallet.balance} {wallet.symbol}
                </h3>
                <p className="text-sm font-medium text-primary">${wallet.usdValue.toLocaleString("es-ES")}</p>
              </div>
              <div className="text-3xl">
                {wallet.symbol === "ETH" && "⟠"}
                {wallet.symbol === "MATIC" && "◈"}
                {wallet.symbol === "BTC" && "₿"}
                {wallet.symbol === "SOL" && "◎"}
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-mono mb-3">{wallet.address}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 gap-1 bg-transparent">
                <Send className="w-3 h-3" />
                Enviar
              </Button>
              <Button size="sm" className="flex-1 gap-1">
                <Plus className="w-3 h-3" />
                Recibir
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
