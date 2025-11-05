// Payment utilities para fiat y crypto

export interface PaymentMethod {
  id: string
  type: "card" | "crypto" | "bank"
  provider: string
  last4?: string
  walletAddress?: string
}

export interface Invoice {
  id: string
  transactionId: string
  amount: number
  currency: string
  paymentMethod: PaymentMethod
  status: "pending" | "paid" | "failed"
  createdAt: Date
  items: InvoiceItem[]
}

export interface InvoiceItem {
  description: string
  amount: number
  type: "rent" | "sale" | "service"
}

export function generateInvoice(transactionId: string, items: InvoiceItem[], paymentMethod: PaymentMethod): Invoice {
  const total = items.reduce((sum, item) => sum + item.amount, 0)

  return {
    id: `INV-${Date.now()}`,
    transactionId,
    amount: total,
    currency: paymentMethod.type === "crypto" ? "USD" : "EUR",
    paymentMethod,
    status: "pending",
    createdAt: new Date(),
    items,
  }
}

export function generateInvoiceHTML(invoice: Invoice): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial; }
          .header { text-align: center; margin-bottom: 30px; }
          .details { margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
          .total { font-weight: bold; font-size: 18px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Factura</h1>
          <p>ID: ${invoice.id}</p>
        </div>
        
        <div class="details">
          <p><strong>Método de pago:</strong> ${invoice.paymentMethod.type}</p>
          <p><strong>Estado:</strong> ${invoice.status}</p>
          <p><strong>Fecha:</strong> ${invoice.createdAt.toLocaleDateString("es-ES")}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.items
              .map(
                (item) => `
              <tr>
                <td>${item.description}</td>
                <td>${item.amount}</td>
                <td>${item.type}</td>
              </tr>
            `,
              )
              .join("")}
            <tr>
              <td colspan="2" class="total">Total:</td>
              <td class="total">${invoice.amount} ${invoice.currency}</td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `
}
