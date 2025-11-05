"use client"

import { Button } from "@/components/ui/button"
import { Wallet, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { WalletModal } from "./wallet-modal"
import { AuthModal } from "./auth-modal"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [walletModalOpen, setWalletModalOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  return (
    <>
      <header className="border-b border-border bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="hidden sm:inline text-xl font-semibold text-foreground">Solea</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/buy"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
            >
              Comprar
            </Link>
            <Link
              href="/rent"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
            >
              Alquilar
            </Link>
            <Link
              href="/sell"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
            >
              Vender
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
            >
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setWalletModalOpen(true)}
              className="flex items-center gap-2 border-primary/20 hover:border-primary/40 transition-smooth bg-transparent"
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">Wallet</span>
            </Button>
            <Button
              size="sm"
              onClick={() => setAuthModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-smooth"
            >
              Iniciar sesión
            </Button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-smooth"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white dark:bg-slate-950">
            <nav className="flex flex-col gap-1 p-4">
              <Link href="/buy" className="px-4 py-2 text-sm hover:bg-muted rounded-lg transition-smooth">
                Comprar
              </Link>
              <Link href="/rent" className="px-4 py-2 text-sm hover:bg-muted rounded-lg transition-smooth">
                Alquilar
              </Link>
              <Link href="/sell" className="px-4 py-2 text-sm hover:bg-muted rounded-lg transition-smooth">
                Vender
              </Link>
              <Link href="/dashboard" className="px-4 py-2 text-sm hover:bg-muted rounded-lg transition-smooth">
                Dashboard
              </Link>
            </nav>
          </div>
        )}
      </header>

      <WalletModal isOpen={walletModalOpen} onClose={() => setWalletModalOpen(false)} />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  )
}
