import { BLOCKCHAIN_CONFIG } from "@/lib/web3-utils"

interface CryptoPaymentRequest {
  amount: number
  blockchain: string
  walletAddress: string
  propertyId: number
}

export async function POST(request: Request) {
  try {
    const body: CryptoPaymentRequest = await request.json()
    const { amount, blockchain, walletAddress, propertyId } = body

    if (!BLOCKCHAIN_CONFIG[blockchain as keyof typeof BLOCKCHAIN_CONFIG]) {
      return Response.json({ error: "Blockchain not supported" }, { status: 400 })
    }

    // Simular generación de transacción blockchain
    const txHash = `0x${Array(64)
      .fill(0)
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("")}`
    const timestamp = Date.now()

    // Guardar en una "BD" temporal (en producción sería Supabase)
    const transaction = {
      id: `TXN-${timestamp}`,
      txHash,
      amount,
      blockchain,
      walletAddress,
      propertyId,
      status: "pending",
      createdAt: new Date(timestamp),
      expiresAt: new Date(timestamp + 15 * 60 * 1000), // 15 minutos
    }

    return Response.json(transaction, { status: 201 })
  } catch (error) {
    console.error("Crypto payment error:", error)
    return Response.json({ error: "Payment processing failed" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const txHash = searchParams.get("tx")
    const blockchain = searchParams.get("blockchain")

    if (!txHash || !blockchain) {
      return Response.json({ error: "Missing parameters" }, { status: 400 })
    }

    // En producción, verificar la transacción en el blockchain correspondiente
    const verified = Math.random() > 0.5 // Simulación

    return Response.json({
      status: verified ? "confirmed" : "pending",
      txHash,
      blockchain,
    })
  } catch (error) {
    console.error("Error verifying crypto payment:", error)
    return Response.json({ error: "Verification failed" }, { status: 500 })
  }
}
