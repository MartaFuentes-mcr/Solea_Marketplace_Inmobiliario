"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Wallet, Copy } from "lucide-react"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const handleConnectWallet = async () => {
    // Simulación de conexión con MetaMask
    try {
      // En producción, usar ethers.js o web3.js
      const mockAddress = "0x" + Math.random().toString(16).slice(2, 42)
      setWalletAddress(mockAddress)
      setConnected(true)
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Conectar Wallet
          </DialogTitle>
          <DialogDescription>
            Conecta tu wallet para acceder a transacciones blockchain y gestionar tus propiedades
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {!connected ? (
            <>
              <div className="space-y-3">
                <Button onClick={handleConnectWallet} className="w-full h-12 bg-gradient-to-r from-primary to-accent">
                  <Wallet className="w-4 h-4 mr-2" />
                  Conectar MetaMask
                </Button>
                <Button variant="outline" className="w-full h-12 bg-transparent">
                  <Wallet className="w-4 h-4 mr-2" />
                  Conectar WalletConnect
                </Button>
                <Button variant="outline" className="w-full h-12 bg-transparent">
                  <Wallet className="w-4 h-4 mr-2" />
                  Conectar Coinbase
                </Button>
              </div>

              <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  No tienes wallet? Descargar{" "}
                  <a href="#" className="font-semibold underline">
                    MetaMask
                  </a>
                </p>
              </Card>
            </>
          ) : (
            <>
              <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200">
                <p className="text-sm font-semibold text-green-900 dark:text-green-100">Wallet Conectado</p>
              </Card>

              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Dirección de Wallet</p>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <code className="text-xs break-all flex-1">{walletAddress}</code>
                  <Button size="sm" variant="ghost" onClick={handleCopyAddress} className="shrink-0">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Card className="p-3 text-center">
                  <p className="text-xs text-muted-foreground">Balance</p>
                  <p className="text-lg font-semibold">2.5 ETH</p>
                </Card>
                <Card className="p-3 text-center">
                  <p className="text-xs text-muted-foreground">Red</p>
                  <p className="text-sm font-semibold">Ethereum</p>
                </Card>
                <Card className="p-3 text-center">
                  <p className="text-xs text-muted-foreground">Estado</p>
                  <p className="text-sm font-semibold text-green-600">Activo</p>
                </Card>
              </div>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  setConnected(false)
                  setWalletAddress("")
                  onClose()
                }}
              >
                Desconectar Wallet
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
