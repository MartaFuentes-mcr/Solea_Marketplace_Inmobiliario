"use client"

import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DocumentGeneratorUI } from "@/components/document-generator-ui"
import { FileText, Download } from "lucide-react"

export default function DocumentsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Centro de Documentos</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <FileText className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">Certificados</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Certificados digitales de compraventa registrados en blockchain
            </p>
            <Button variant="outline" size="sm">
              Ver certificados
            </Button>
          </Card>

          <Card className="p-6">
            <FileText className="w-8 h-8 text-accent mb-3" />
            <h3 className="font-semibold mb-2">Facturas</h3>
            <p className="text-sm text-muted-foreground mb-4">Facturas de alquiler mensual con registro blockchain</p>
            <Button variant="outline" size="sm">
              Ver facturas
            </Button>
          </Card>

          <Card className="p-6">
            <FileText className="w-8 h-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">Contratos</h3>
            <p className="text-sm text-muted-foreground mb-4">Contratos inteligentes desplegados en blockchain</p>
            <Button variant="outline" size="sm">
              Ver contratos
            </Button>
          </Card>
        </div>

        <Card className="p-6">
          <DocumentGeneratorUI />
        </Card>

        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Documentos Recientes</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between items-center p-3 border border-border rounded">
                <div>
                  <p className="font-medium">Documento #{i}</p>
                  <p className="text-sm text-muted-foreground">Emitido hace 3 días</p>
                </div>
                <Button size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Descargar
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  )
}
