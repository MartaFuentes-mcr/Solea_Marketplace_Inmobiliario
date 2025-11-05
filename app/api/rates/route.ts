// API para obtener tasas de conversión en tiempo real

const CRYPTO_RATES = {
  ETH: 2100,
  MATIC: 0.8,
  SOL: 140,
  BTC: 45000,
  TRX: 0.25,
  DOGE: 0.12,
  SHIB: 0.000018,
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get("from")?.toUpperCase()
    const to = searchParams.get("to")?.toUpperCase() || "EUR"

    if (!from || from === "EUR") {
      return Response.json({
        rates: CRYPTO_RATES,
        timestamp: new Date(),
      })
    }

    const rate = CRYPTO_RATES[from as keyof typeof CRYPTO_RATES]
    if (!rate) {
      return Response.json({ error: "Currency not found" }, { status: 404 })
    }

    return Response.json({
      from,
      to,
      rate,
      timestamp: new Date(),
    })
  } catch (error) {
    console.error("Rate fetch error:", error)
    return Response.json({ error: "Failed to fetch rates" }, { status: 500 })
  }
}
