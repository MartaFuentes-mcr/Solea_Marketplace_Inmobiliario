"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchFiltersProps {
  filters: any
  onFiltersChange: (filters: any) => void
}

export function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  return (
    <div className="mb-8 p-6 bg-card border border-border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Input
          placeholder="Ciudad o zona"
          value={filters.city}
          onChange={(e) => onFiltersChange({ ...filters, city: e.target.value })}
        />

        <select
          className="px-3 py-2 border border-border rounded-md bg-background"
          value={filters.type}
          onChange={(e) => onFiltersChange({ ...filters, type: e.target.value })}
        >
          <option value="all">Tipo de propiedad</option>
          <option value="apartamento">Apartamento</option>
          <option value="casa">Casa</option>
          <option value="oficina">Oficina</option>
        </select>

        <Input
          type="number"
          placeholder="Precio mín"
          value={filters.minPrice}
          onChange={(e) => onFiltersChange({ ...filters, minPrice: Number(e.target.value) })}
        />

        <Input
          type="number"
          placeholder="Precio máx"
          value={filters.maxPrice}
          onChange={(e) => onFiltersChange({ ...filters, maxPrice: Number(e.target.value) })}
        />

        <Button className="w-full flex items-center justify-center gap-2">
          <Search className="w-4 h-4" />
          Buscar
        </Button>
      </div>
    </div>
  )
}
