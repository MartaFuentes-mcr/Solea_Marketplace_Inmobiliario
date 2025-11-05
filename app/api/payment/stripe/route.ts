import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")

export async function POST(request: Request) {
  try {
    const { amount, currency, propertyId, email } = await request.json()

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency.toLowerCase(),
      metadata: {
        propertyId,
        email,
      },
    })

    return Response.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    })
  } catch (error) {
    console.error("Stripe error:", error)
    return Response.json({ error: "Payment intent creation failed" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const intent_id = searchParams.get("intent_id")

    if (!intent_id) {
      return Response.json({ error: "Intent ID required" }, { status: 400 })
    }

    const intent = await stripe.paymentIntents.retrieve(intent_id)

    return Response.json({
      status: intent.status,
      amount: intent.amount / 100,
      currency: intent.currency,
    })
  } catch (error) {
    console.error("Stripe error:", error)
    return Response.json({ error: "Failed to retrieve payment status" }, { status: 500 })
  }
}
