"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DocumentGenerator, type CertificateData, type RentalInvoiceData } from "@/lib/document-generator"
import { Download, Eye } from "lucide-react"

interface DocumentGeneratorUIProps {
  propertyData?: any
  rentalData?: any
}

export function DocumentGeneratorUI({ propertyData, rentalData }: DocumentGeneratorUIProps) {
  const [generatedDocs, setGeneratedDocs] = useState<any[]>([])

  const handleGenerateCertificate = () => {
    const certData: CertificateData = {
      certificateId: `CERT-${Date.now()}`,
      propertyAddress: propertyData?.location || "Madrid, Centro",
      ownerName: "Juan García López",
      ownerWallet: "0x742d35Cc6634C0532925a3b844Bc9e759",
      transactionHash: "0x" + Math.random().toString(16).slice(2, 66),
      purchasePrice: propertyData?.price || 450000,
      currency: "EUR",
      purchaseDate: new Date(),
      blockchain: "Ethereum",
      metadata: {
        squareFeet: propertyData?.sqft || 120,
        bedrooms: propertyData?.bedrooms || 3,
        bathrooms: propertyData?.bathrooms || 2,
        description: "Apartamento moderno totalmente reformado",
      },
    }

    const html = DocumentGenerator.generatePropertyCertificate(certData)
    downloadDocument(html, `certificado-${certData.certificateId}.html`)
    setGeneratedDocs([...generatedDocs, { type: "certificate", id: certData.certificateId, html }])
  }

  const handleGenerateInvoice = () => {
    const invoiceData: RentalInvoiceData = {
      invoiceId: `INV-${Date.now()}`,
      tenantName: "María Rodríguez",
      tenantEmail: "maria@example.com",
      landlordName: "Juan García",
      propertyAddress: propertyData?.location || "Madrid, Centro",
      monthlyRent: propertyData?.price || 1200,
      currency: "EUR",
      rentalMonth: new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long" }),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      blockchain: "Polygon",
      transactionHash: "0x" + Math.random().toString(16).slice(2, 66),
    }

    const html = DocumentGenerator.generateRentalInvoice(invoiceData)
    downloadDocument(html, `factura-${invoiceData.invoiceId}.html`)
    setGeneratedDocs([...generatedDocs, { type: "invoice", id: invoiceData.invoiceId, html }])
  }

  const downloadDocument = (html: string, filename: string) => {
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Generador de Documentos</h3>

      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">Generar Documento</TabsTrigger>
          <TabsTrigger value="history">Historial ({generatedDocs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={handleGenerateCertificate}
              className="h-24 flex flex-col items-center justify-center gap-2"
            >
              <span>📜</span>
              <span>Certificado de Propiedad</span>
            </Button>
            <Button
              onClick={handleGenerateInvoice}
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2 bg-transparent"
            >
              <span>📋</span>
              <span>Factura de Alquiler</span>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-3">
          {generatedDocs.length === 0 ? (
            <p className="text-muted-foreground text-sm">No hay documentos generados</p>
          ) : (
            generatedDocs.map((doc, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 border border-border rounded">
                <div>
                  <p className="font-medium capitalize">{doc.type === "certificate" ? "Certificado" : "Factura"}</p>
                  <p className="text-sm text-muted-foreground">{doc.id}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`data:text/html;base64,${btoa(doc.html)}`, "_blank")}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" onClick={() => downloadDocument(doc.html, `${doc.type}-${doc.id}.html`)}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </Card>
  )
}
