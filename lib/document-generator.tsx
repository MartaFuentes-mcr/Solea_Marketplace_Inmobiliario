export interface CertificateData {
  certificateId: string
  propertyAddress: string
  ownerName: string
  ownerWallet: string
  transactionHash: string
  purchasePrice: number
  currency: string
  purchaseDate: Date
  blockchain: string
  metadata: {
    squareFeet: number
    bedrooms: number
    bathrooms: number
    description: string
  }
}

export interface RentalInvoiceData {
  invoiceId: string
  tenantName: string
  tenantEmail: string
  landlordName: string
  propertyAddress: string
  monthlyRent: number
  currency: string
  rentalMonth: string
  dueDate: Date
  blockchain: string
  transactionHash: string
}

export class DocumentGenerator {
  static generatePropertyCertificate(data: CertificateData): string {
    const dateStr = data.purchaseDate.toLocaleDateString("es-ES")

    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Certificado de Propiedad</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
          }
          .certificate {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border: 3px solid #1e40af;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #1e40af;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .title {
            font-size: 32px;
            font-weight: bold;
            color: #1e40af;
            margin: 0;
          }
          .blockchain-badge {
            display: inline-block;
            background: #1e40af;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 12px;
            margin-top: 10px;
          }
          .content {
            margin: 30px 0;
          }
          .section {
            margin: 25px 0;
          }
          .section-title {
            font-size: 14px;
            font-weight: bold;
            color: #374151;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #e5e7eb;
          }
          .field {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #f3f4f6;
          }
          .field-label {
            font-weight: 600;
            color: #6b7280;
          }
          .field-value {
            color: #1f2937;
            word-break: break-word;
            text-align: right;
            flex: 1;
            margin-left: 20px;
          }
          .metadata-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin: 15px 0;
          }
          .metadata-item {
            background: #f9fafb;
            padding: 15px;
            border-radius: 5px;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #1e40af;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="header">
            <h1 class="title">🔐 CERTIFICADO DE PROPIEDAD</h1>
            <div class="blockchain-badge">${data.blockchain.toUpperCase()}</div>
          </div>
          
          <div class="content">
            <div class="section">
              <div class="section-title">Información del Certificado</div>
              <div class="field">
                <span class="field-label">ID del Certificado:</span>
                <span class="field-value">${data.certificateId}</span>
              </div>
              <div class="field">
                <span class="field-label">Fecha de Emisión:</span>
                <span class="field-value">${dateStr}</span>
              </div>
              <div class="field">
                <span class="field-label">Hash de Transacción:</span>
                <span class="field-value" style="font-size: 11px; font-family: monospace;">${data.transactionHash}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Información del Propietario</div>
              <div class="field">
                <span class="field-label">Nombre del Propietario:</span>
                <span class="field-value">${data.ownerName}</span>
              </div>
              <div class="field">
                <span class="field-label">Cartera Blockchain:</span>
                <span class="field-value" style="font-size: 11px; font-family: monospace;">${data.ownerWallet}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Información de la Propiedad</div>
              <div class="field">
                <span class="field-label">Dirección:</span>
                <span class="field-value">${data.propertyAddress}</span>
              </div>
              <div class="field">
                <span class="field-label">Precio de Compra:</span>
                <span class="field-value">${data.purchasePrice.toLocaleString("es-ES")} ${data.currency}</span>
              </div>
              <div class="field">
                <span class="field-label">Descripción:</span>
                <span class="field-value">${data.metadata.description}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Especificaciones</div>
              <div class="metadata-grid">
                <div class="metadata-item">
                  <div style="font-size: 12px; color: #6b7280; margin-bottom: 5px;">Superficie</div>
                  <div style="font-size: 18px; font-weight: bold; color: #1f2937;">${data.metadata.squareFeet} m²</div>
                </div>
                <div class="metadata-item">
                  <div style="font-size: 12px; color: #6b7280; margin-bottom: 5px;">Dormitorios</div>
                  <div style="font-size: 18px; font-weight: bold; color: #1f2937;">${data.metadata.bedrooms}</div>
                </div>
                <div class="metadata-item">
                  <div style="font-size: 12px; color: #6b7280; margin-bottom: 5px;">Baños</div>
                  <div style="font-size: 18px; font-weight: bold; color: #1f2937;">${data.metadata.bathrooms}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="footer">
            <p>Este certificado es un registro verificado en blockchain. Generado automáticamente el ${new Date().toLocaleDateString("es-ES")}</p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  static generateRentalInvoice(data: RentalInvoiceData): string {
    const dueDate = new Date(data.dueDate).toLocaleDateString("es-ES")

    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Factura de Alquiler</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
          }
          .invoice {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border: 2px solid #059669;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #059669;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .company-info h1 {
            margin: 0;
            color: #059669;
            font-size: 28px;
          }
          .invoice-details {
            text-align: right;
          }
          .invoice-number {
            font-size: 24px;
            font-weight: bold;
            color: #059669;
          }
          .section {
            margin: 30px 0;
          }
          .section-title {
            font-size: 13px;
            font-weight: bold;
            color: #374151;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #f3f4f6;
          }
          .parties {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
          }
          .party {
            background: #f9fafb;
            padding: 15px;
            border-radius: 5px;
          }
          .party-label {
            font-weight: 600;
            color: #6b7280;
            font-size: 12px;
            margin-bottom: 8px;
            text-transform: uppercase;
          }
          .party-name {
            font-size: 16px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 5px;
          }
          .party-info {
            font-size: 13px;
            color: #6b7280;
            line-height: 1.6;
          }
          .property-section {
            background: #f0fdf4;
            border-left: 4px solid #059669;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
          }
          .property-address {
            font-size: 16px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 10px;
          }
          .rental-details {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin: 20px 0;
          }
          .detail-box {
            background: #f9fafb;
            padding: 15px;
            border-radius: 5px;
            border-left: 3px solid #059669;
          }
          .detail-label {
            font-size: 11px;
            color: #6b7280;
            text-transform: uppercase;
            margin-bottom: 5px;
            font-weight: 600;
          }
          .detail-value {
            font-size: 18px;
            font-weight: bold;
            color: #059669;
          }
          .amount-section {
            display: flex;
            justify-content: flex-end;
            margin: 30px 0;
          }
          .amount-box {
            background: #ecfdf5;
            border: 2px solid #059669;
            border-radius: 5px;
            padding: 20px 30px;
            min-width: 250px;
          }
          .amount-label {
            font-size: 12px;
            color: #6b7280;
            text-transform: uppercase;
            margin-bottom: 8px;
          }
          .amount-value {
            font-size: 32px;
            font-weight: bold;
            color: #059669;
          }
          .blockchain-info {
            background: #f0f9ff;
            border: 1px solid #e0f2fe;
            border-radius: 5px;
            padding: 12px;
            margin: 20px 0;
            font-size: 12px;
          }
          .blockchain-badge {
            display: inline-block;
            background: #0369a1;
            color: white;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 10px;
            margin-right: 10px;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #059669;
            text-align: center;
            font-size: 11px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="invoice">
          <div class="header">
            <div class="company-info">
              <h1>📋 FACTURA</h1>
            </div>
            <div class="invoice-details">
              <div class="invoice-number">#${data.invoiceId}</div>
              <div style="color: #6b7280; font-size: 12px; margin-top: 5px;">Mes: ${data.rentalMonth}</div>
            </div>
          </div>

          <div class="section">
            <div class="parties">
              <div class="party">
                <div class="party-label">Propietario/Arrendador</div>
                <div class="party-name">${data.landlordName}</div>
              </div>
              <div class="party">
                <div class="party-label">Inquilino</div>
                <div class="party-name">${data.tenantName}</div>
                <div class="party-info">${data.tenantEmail}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Información de la Propiedad</div>
            <div class="property-section">
              <div class="property-address">📍 ${data.propertyAddress}</div>
            </div>
          </div>

          <div class="rental-details">
            <div class="detail-box">
              <div class="detail-label">Renta Mensual</div>
              <div class="detail-value">${data.monthlyRent.toLocaleString("es-ES")} ${data.currency}</div>
            </div>
            <div class="detail-box">
              <div class="detail-label">Mes de Alquiler</div>
              <div class="detail-value">${data.rentalMonth}</div>
            </div>
            <div class="detail-box">
              <div class="detail-label">Fecha de Vencimiento</div>
              <div class="detail-value">${dueDate}</div>
            </div>
          </div>

          <div class="amount-section">
            <div class="amount-box">
              <div class="amount-label">Total a Pagar</div>
              <div class="amount-value">${data.monthlyRent.toLocaleString("es-ES")} ${data.currency}</div>
            </div>
          </div>

          <div class="blockchain-info">
            <span class="blockchain-badge">${data.blockchain.toUpperCase()}</span>
            <span style="color: #0369a1; font-weight: 500;">Transacción verificada en blockchain</span>
            <div style="font-family: monospace; margin-top: 8px; color: #0369a1; font-size: 10px;">Hash: ${data.transactionHash}</div>
          </div>

          <div class="footer">
            <p>Esta factura es un registro verificado en blockchain. Generada el ${new Date().toLocaleDateString("es-ES")}</p>
          </div>
        </div>
      </body>
      </html>
    `
  }
}
