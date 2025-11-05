"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContractDeployer } from "@/lib/contract-deployer"
import { Download, ExternalLink } from "lucide-react"

interface SmartContractDeployerProps {
  propertyData: any
  onDeploy?: (contractAddress: string) => void
}

export function SmartContractDeployer({ propertyData, onDeploy }: SmartContractDeployerProps) {
  const [deployedContracts, setDeployedContracts] = useState<any[]>([])
  const [selectedChain, setSelectedChain] = useState("ethereum")
  const [loading, setLoading] = useState(false)

  const handleDeployPropertyNFT = async () => {
    setLoading(true)
    try {
      const code = ContractDeployer.generatePropertyNFTCode(propertyData)
      const deployed = await ContractDeployer.deployContract(selectedChain, code, "PropertyNFT")

      setDeployedContracts([...deployedContracts, deployed])
      onDeploy?.(deployed.address)
    } catch (error) {
      console.error("Deployment error:", error)
    } finally {
      setLoading(false)
    }
  }

  const downloadContract = (contractCode: string) => {
    const blob = new Blob([contractCode], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `contract-${Date.now()}.sol`
    a.click()
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Smart Contracts</h3>

      <Tabs defaultValue="deploy" className="space-y-4">
        <TabsList>
          <TabsTrigger value="deploy">Desplegar</TabsTrigger>
          <TabsTrigger value="deployed">Desplegados ({deployedContracts.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="deploy" className="space-y-4">
          <div className="space-y-3">
            <label className="text-sm font-medium block">Selecciona blockchain:</label>
            <select
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
              value={selectedChain}
              onChange={(e) => setSelectedChain(e.target.value)}
            >
              <option value="ethereum">Ethereum</option>
              <option value="polygon">Polygon</option>
              <option value="solana">Solana</option>
            </select>
          </div>

          <Button onClick={handleDeployPropertyNFT} disabled={loading} className="w-full">
            {loading ? "Desplegando..." : "Desplegar contrato de propiedad"}
          </Button>

          <div className="pt-4">
            <label className="text-sm font-medium mb-2 block">Vista previa del contrato:</label>
            <pre className="bg-muted p-3 rounded text-xs overflow-auto h-48">
              {ContractDeployer.generatePropertyNFTCode(propertyData)}
            </pre>
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadContract(ContractDeployer.generatePropertyNFTCode(propertyData))}
              className="mt-2 gap-2"
            >
              <Download className="w-4 h-4" />
              Descargar contrato
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="deployed" className="space-y-3">
          {deployedContracts.length === 0 ? (
            <p className="text-muted-foreground text-sm">No hay contratos desplegados aún</p>
          ) : (
            deployedContracts.map((contract, idx) => (
              <div key={idx} className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-mono text-sm font-medium">{contract.address}</p>
                    <p className="text-xs text-muted-foreground">Red: {contract.blockchain}</p>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                    <ExternalLink className="w-3 h-3" />
                    Ver en explorer
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Desplegado: {new Date(contract.deploymentDate).toLocaleDateString("es-ES")}
                </p>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </Card>
  )
}
