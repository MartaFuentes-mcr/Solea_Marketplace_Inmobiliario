import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { rentalId, amount, blockchain, walletAddress } = await req.json()

    const paymentHash = `0x${Math.random().toString(16).slice(2)}`

    const payment = {
      rentalId,
      amount,
      paymentDate: new Date(),
      transactionHash: paymentHash,
      blockchain,
      walletAddress,
      status: "confirmed",
    }

    // En producción, aquí se llamaría al contrato inteligente
    // y se registraría la transacción en blockchain

    return NextResponse.json(payment, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Error processing rental payment" }, { status: 500 })
  }
}
