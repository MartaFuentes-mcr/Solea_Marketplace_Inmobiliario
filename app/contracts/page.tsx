"use client"

import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code2, Download } from "lucide-react"

const CONTRACTS = [
  {
    name: "PropertyRegistry.sol",
    description: "Registro centralizado de propiedades en blockchain",
    lines: 120,
    functions: ["registerProperty", "transferProperty", "updateProperty"],
  },
  {
    name: "RentalAgreement.sol",
    description: "Contratos automáticos para alquileres mensuales",
    lines: 95,
    functions: ["createRental", "payRent", "endRental"],
  },
]

export default function ContractsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Smart Contracts</h1>

        <div className="grid grid-cols-1 gap-6">
          {CONTRACTS.map((contract, idx) => (
            <Card key={idx} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <Code2 className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h2 className="text-xl font-bold">{contract.name}</h2>
                    <p className="text-muted-foreground">{contract.description}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Download className="w-4 h-4" />
                  Descargar
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Líneas</p>
                  <p className="font-bold">{contract.lines}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Funciones</p>
                  <p className="font-bold">{contract.functions.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Versión</p>
                  <p className="font-bold">1.0</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Funciones disponibles:</p>
                <div className="flex flex-wrap gap-2">
                  {contract.functions.map((fn, fidx) => (
                    <span key={fidx} className="px-2 py-1 bg-muted rounded text-xs">
                      {fn}()
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
