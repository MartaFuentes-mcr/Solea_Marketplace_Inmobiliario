import { type Invoice, generateInvoice, generateInvoiceHTML } from "@/lib/payment-utils"

export async function POST(request: Request) {
  try {
    const { transactionId, items, paymentMethod } = await request.json()

    const invoice = generateInvoice(transactionId, items, paymentMethod)

    // Convertir a PDF o HTML
    const html = generateInvoiceHTML(invoice)

    return Response.json({
      invoice,
      html,
      downloadUrl: `/api/invoices/${invoice.id}/download`,
    })
  } catch (error) {
    console.error("Invoice generation error:", error)
    return Response.json({ error: "Invoice generation failed" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const invoiceId = searchParams.get("id")

    if (!invoiceId) {
      return Response.json({ error: "Invoice ID required" }, { status: 400 })
    }

    // En producción, obtener de la BD
    const invoice: Invoice = {
      id: invoiceId,
      transactionId: "TXN-123",
      amount: 450000,
      currency: "EUR",
      paymentMethod: { id: "pm-1", type: "card", provider: "stripe" },
      status: "paid",
      createdAt: new Date(),
      items: [{ description: "Property purchase", amount: 450000, type: "sale" }],
    }

    return Response.json(invoice)
  } catch (error) {
    console.error("Error fetching invoice:", error)
    return Response.json({ error: "Failed to fetch invoice" }, { status: 500 })
  }
}
