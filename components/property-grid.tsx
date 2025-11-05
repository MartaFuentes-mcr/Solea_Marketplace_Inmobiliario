"use client"

import { PropertyCard } from "./property-card"

const MOCK_PROPERTIES = [
  {
    id: 1,
    title: "Apartamento Moderno Centro",
    location: "Madrid, Centro",
    price: 450000,
    type: "Venta",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 120,
    image: "/modern-apartment-living-room.png",
  },
  {
    id: 2,
    title: "Casa con Jardín",
    location: "Barcelona, Sarriá",
    price: 1200,
    type: "Alquiler",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 250,
    image: "/modern-house-garden.png",
  },
  {
    id: 3,
    title: "Estudio Luminoso",
    location: "Valencia, Ruzafa",
    price: 280000,
    type: "Venta",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 45,
    image: "/bright-studio-apartment.jpg",
  },
  {
    id: 4,
    title: "Piso Céntrico Reformado",
    location: "Madrid, Recoletos",
    price: 900,
    type: "Alquiler",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 85,
    image: "/renovated-city-apartment.jpg",
  },
  {
    id: 5,
    title: "Villa Luxury",
    location: "Málaga, Costa del Sol",
    price: 2500000,
    type: "Venta",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 450,
    image: "/luxury-villa-pool.png",
  },
  {
    id: 6,
    title: "Loft Industrial",
    location: "Barcelona, Poblenou",
    price: 1500,
    type: "Alquiler",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 140,
    image: "/industrial-loft-design.jpg",
  },
]

interface PropertyGridProps {
  filters: any
}

export function PropertyGrid({ filters }: PropertyGridProps) {
  const filteredProperties = MOCK_PROPERTIES.filter((prop) => {
    const matchesCity = !filters.city || prop.location.toLowerCase().includes(filters.city.toLowerCase())
    const matchesType = filters.type === "all" || prop.title.toLowerCase().includes(filters.type.toLowerCase())
    const matchesPrice = prop.price >= filters.minPrice && prop.price <= filters.maxPrice
    return matchesCity && matchesType && matchesPrice
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}
