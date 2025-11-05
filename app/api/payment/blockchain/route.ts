import { BlockchainAdapterFactory } from "@/lib/blockchain-adapters"

export async function POST(request: Request) {
  try {
    const { blockchain, toAddress, amount, fromAddress } = await request.json()

    const adapter = BlockchainAdapterFactory.getAdapter(blockchain)
    const txHash = await adapter.sendTransaction(toAddress, amount)

    const transaction = {
      id: `TXN-${Date.now()}`,
      blockchain,
      txHash,
      fromAddress,
      toAddress,
      amount,
      status: "pending",
      createdAt: new Date(),
      confirmations: 0,
    }

    return Response.json(transaction, { status: 201 })
  } catch (error) {
    console.error("Blockchain transaction error:", error)
    return Response.json({ error: "Transaction failed" }, { status: 500 })
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

    const adapter = BlockchainAdapterFactory.getAdapter(blockchain)
    const verified = await adapter.verifyTransaction(txHash)

    return Response.json({
      status: verified ? "confirmed" : "pending",
      txHash,
      blockchain,
      confirmations: verified ? 6 : 0,
    })
  } catch (error) {
    console.error("Error verifying transaction:", error)
    return Response.json({ error: "Verification failed" }, { status: 500 })
  }
}
