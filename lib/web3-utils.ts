// Web3 utilities para integraciones multi-blockchain

export const BLOCKCHAIN_CONFIG = {
  ethereum: {
    chainId: 1,
    rpcUrl: "https://eth.llamarpc.com",
    name: "Ethereum",
    symbol: "ETH",
    icon: "⟠",
  },
  polygon: {
    chainId: 137,
    rpcUrl: "https://polygon-rpc.com",
    name: "Polygon",
    symbol: "MATIC",
    icon: "◈",
  },
  solana: {
    chainId: "solana",
    rpcUrl: "https://api.mainnet-beta.solana.com",
    name: "Solana",
    symbol: "SOL",
    icon: "◎",
  },
  bitcoin: {
    chainId: "bitcoin",
    rpcUrl: "https://blockstream.info/api",
    name: "Bitcoin",
    symbol: "BTC",
    icon: "₿",
  },
  tron: {
    chainId: "tron",
    rpcUrl: "https://api.trongrid.io",
    name: "TRON",
    symbol: "TRX",
    icon: "⬟",
  },
  dogecoin: {
    chainId: "dogecoin",
    rpcUrl: "https://dogecoin-rpc.com",
    name: "Dogecoin",
    symbol: "DOGE",
    icon: "🐕",
  },
  shiba: {
    chainId: "ethereum",
    rpcUrl: "https://eth.llamarpc.com",
    name: "Shiba Inu",
    symbol: "SHIB",
    icon: "🦴",
  },
}

export interface BlockchainTransaction {
  id: string
  from: string
  to: string
  amount: string
  currency: string
  blockchain: string
  status: "pending" | "confirmed" | "failed"
  timestamp: Date
  hash?: string
}

export interface PropertyCertificate {
  id: string
  propertyId: number
  ownerAddress: string
  transactionHash: string
  certificateType: "sale" | "rental"
  issuedAt: Date
  metadata: {
    address: string
    price: number
    duration?: number
  }
}

export function generatePropertyNFT(property: any): PropertyCertificate {
  return {
    id: `PROP-${Date.now()}`,
    propertyId: property.id,
    ownerAddress: "",
    transactionHash: "",
    certificateType: "sale",
    issuedAt: new Date(),
    metadata: {
      address: property.location,
      price: property.price,
    },
  }
}
