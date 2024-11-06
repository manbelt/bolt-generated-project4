"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sun, Menu } from "lucide-react"

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
    <span>{label}</span>
  </Link>
)

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
          <Sun className="mr-2" /> Jávea Directory
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6">
            <NavLink href="/categories" label="Categories" />
            <NavLink href="/events" label="Events" />
            <NavLink href="/map" label="Map" />
            <NavLink href="/guides" label="Local Guides" />
          </nav>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu />
        </Button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 py-4">
          <nav className="flex flex-col space-y-4 px-4">
            <NavLink href="/categories" label="Categories" />
            <NavLink href="/events" label="Events" />
            <NavLink href="/map" label="Map" />
            <NavLink href="/guides" label="Local Guides" />
          </nav>
        </div>
      )}
    </header>
  )
}
