"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, Copy } from "lucide-react"

const transactions = [
  {
    id: "TXN-2024-001",
    type: "sale",
    property: "Apartamento Centro Madrid",
    amount: 450000,
    blockchain: "Ethereum",
    status: "confirmed",
    hash: "0x742d35Cc6634C0532925a3b844Bc9e7595f42bE",
    date: "2024-05-15",
  },
  {
    id: "TXN-2024-002",
    type: "rental",
    property: "Casa Sarriá Barcelona",
    amount: 1200,
    blockchain: "Polygon",
    status: "confirmed",
    hash: "0x1234567890123456789012345678901234567890",
    date: "2024-05-14",
  },
  {
    id: "TXN-2024-003",
    type: "sale",
    property: "Estudio Valencia",
    amount: 280000,
    blockchain: "Solana",
    status: "pending",
    hash: "5CJ5kLy3x3c7x3y7z3w3v3u3t3s3r3q3p3o3n3m3l",
    date: "2024-05-13",
  },
]

export function TransactionsDashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Transacciones Recientes</h2>

      <div className="space-y-3">
        {transactions.map((tx) => (
          <Card key={tx.id} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${tx.type === "sale" ? "bg-green-100" : "bg-blue-100"}`}>
                  {tx.type === "sale" ? (
                    <ArrowUpRight className={`w-5 h-5 ${tx.type === "sale" ? "text-green-600" : "text-blue-600"}`} />
                  ) : (
                    <ArrowDownLeft className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{tx.property}</p>
                  <p className="text-xs text-muted-foreground">{tx.id}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Cantidad</p>
                <p className="font-bold">
                  {tx.amount.toLocaleString("es-ES")} {tx.type === "sale" ? "€" : "€"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Blockchain</p>
                <p className="font-medium">{tx.blockchain}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Estado</p>
                <Badge variant={tx.status === "confirmed" ? "default" : "secondary"}>
                  {tx.status === "confirmed" ? "✓ Confirmada" : "⏳ Pendiente"}
                </Badge>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>{new Date(tx.date).toLocaleDateString("es-ES")}</p>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => navigator.clipboard.writeText(tx.hash)}
                className="gap-2"
              >
                <Copy className="w-4 h-4" />
                Hash
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
