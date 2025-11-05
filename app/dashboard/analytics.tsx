"use client"

import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const monthlyData = [
  { month: "Ene", ventas: 2, alquileres: 5, transacciones: 7, volumen: 1200000 },
  { month: "Feb", ventas: 3, alquileres: 6, transacciones: 9, volumen: 1450000 },
  { month: "Mar", ventas: 5, alquileres: 8, transacciones: 13, volumen: 2100000 },
  { month: "Abr", ventas: 4, alquileres: 7, transacciones: 11, volumen: 1800000 },
  { month: "May", ventas: 6, alquileres: 10, transacciones: 16, volumen: 2600000 },
  { month: "Jun", ventas: 8, alquileres: 12, transacciones: 20, volumen: 3200000 },
]

const blockchainData = [
  { name: "Ethereum", value: 35, color: "#627eea" },
  { name: "Polygon", value: 28, color: "#8247e5" },
  { name: "Solana", value: 18, color: "#14f195" },
  { name: "Bitcoin", value: 12, color: "#f7931a" },
  { name: "TRON", value: 7, color: "#eb0029" },
]

const paymentMethods = [
  { name: "VISA/MC", value: 42, color: "#1434cb" },
  { name: "ETH", value: 28, color: "#627eea" },
  { name: "BTC", value: 18, color: "#f7931a" },
  { name: "MATIC", value: 12, color: "#8247e5" },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Análisis de Transacciones</h2>
        <Card className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="transacciones" stroke="#0ea5e9" strokeWidth={2} />
              <Line type="monotone" dataKey="ventas" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="alquileres" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Volumen de Transacciones</h2>
        <Card className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `€${(value / 1000000).toFixed(1)}M`} />
              <Legend />
              <Bar dataKey="volumen" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-bold mb-4">Blockchains Utilizadas</h2>
          <Card className="p-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={blockchainData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {blockchainData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {blockchainData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">Métodos de Pago</h2>
          <Card className="p-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={paymentMethods}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {paymentMethods.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {paymentMethods.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
