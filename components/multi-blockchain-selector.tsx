"use client"
import { Button } from "@/components/ui/button"
import { BLOCKCHAIN_CONFIG } from "@/lib/web3-utils"
import { Check } from "lucide-react"

interface MultiBlockchainSelectorProps {
  onSelect: (blockchain: string) => void
  selectedBlockchain?: string
}

export function MultiBlockchainSelector({ onSelect, selectedBlockchain = "ethereum" }: MultiBlockchainSelectorProps) {
  const blockchains = Object.entries(BLOCKCHAIN_CONFIG)

  return (
    <div>
      <label className="text-sm font-medium mb-3 block">Elige tu red blockchain:</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {blockchains.map(([key, config]) => (
          <Button
            key={key}
            variant={selectedBlockchain === key ? "default" : "outline"}
            onClick={() => onSelect(key)}
            className="relative h-auto py-3 flex flex-col items-center gap-1"
          >
            <span className="text-lg">{config.icon}</span>
            <span className="text-xs font-medium">{config.symbol}</span>
            {selectedBlockchain === key && <Check className="absolute top-1 right-1 w-3 h-3" />}
          </Button>
        ))}
      </div>
    </div>
  )
}
