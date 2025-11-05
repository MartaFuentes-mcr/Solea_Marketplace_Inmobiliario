"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { PropertyGrid } from "@/components/property-grid"
import { SearchFilters } from "@/components/search-filters"

export default function Home() {
  const [filters, setFilters] = useState({
    type: "all",
    minPrice: 0,
    maxPrice: 1000000,
    city: "",
    bedrooms: 0,
  })

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <SearchFilters filters={filters} onFiltersChange={setFilters} />
        <PropertyGrid filters={filters} />
      </div>
    </main>
  )
}
