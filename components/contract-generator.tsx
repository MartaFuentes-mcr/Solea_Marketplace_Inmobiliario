"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import type { PropertyCertificate } from "@/lib/web3-utils"

interface ContractGeneratorProps {
  property: any
  certificate: PropertyCertificate
}

export function ContractGenerator({ property, certificate }: ContractGeneratorProps) {
  const generateSmartContract = () => {
    const contract = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PropertyDeed {
    struct Property {
        uint256 id;
        string address;
        address owner;
        uint256 price;
        uint256 timestamp;
        bytes32 ipfsHash;
    }

    mapping(uint256 => Property) public properties;
    mapping(uint256 => address[]) public previousOwners;

    event PropertyTransferred(uint256 indexed propertyId, address indexed from, address indexed to);
    event PropertyRegistered(uint256 indexed propertyId, address indexed owner);

    function registerProperty(uint256 _id, string memory _address, uint256 _price, bytes32 _ipfsHash) public {
        properties[_id] = Property({
            id: _id,
            address: _address,
            owner: msg.sender,
            price: _price,
            timestamp: block.timestamp,
            ipfsHash: _ipfsHash
        });
        previousOwners[_id].push(msg.sender);
        emit PropertyRegistered(_id, msg.sender);
    }

    function transferProperty(uint256 _id, address _newOwner) public {
        require(properties[_id].owner == msg.sender, "Only owner can transfer");
        previousOwners[_id].push(properties[_id].owner);
        properties[_id].owner = _newOwner;
        emit PropertyTransferred(_id, msg.sender, _newOwner);
    }

    function getPropertyHistory(uint256 _id) public view returns (address[] memory) {
        return previousOwners[_id];
    }
}
    `

    const blob = new Blob([contract], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `property-contract-${certificate.id}.sol`
    a.click()
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Certificado de Propiedad
      </h3>

      <div className="space-y-3 mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Certificado ID</p>
          <p className="font-mono text-sm">{certificate.id}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Dirección de Blockchain</p>
          <p className="font-mono text-sm break-all">{certificate.ownerAddress}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Fecha de emisión</p>
          <p className="text-sm">{certificate.issuedAt.toLocaleDateString("es-ES")}</p>
        </div>
      </div>

      <Button onClick={generateSmartContract} className="w-full bg-transparent" variant="outline">
        Descargar contrato inteligente
      </Button>
    </Card>
  )
}
