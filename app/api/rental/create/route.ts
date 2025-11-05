import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { propertyId, tenantAddress, monthlyRent, securityDeposit, durationMonths, blockchain } = await req.json()

    const rentalId = Math.floor(Math.random() * 100000)
    const transactionHash = `0x${Math.random().toString(16).slice(2)}`

    // En producción, aquí se desplegaría el contrato inteligente
    const rentalContract = {
      rentalId,
      propertyId,
      tenant: tenantAddress,
      monthlyRent,
      securityDeposit,
      duration: durationMonths,
      createdAt: new Date(),
      blockchain,
      transactionHash,
      status: "active",
    }

    return NextResponse.json(rentalContract, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error creating rental" }, { status: 500 })
  }
}
