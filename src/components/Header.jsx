import { useState } from 'react'
import { Menu } from 'lucide-react'

export default function Header({ toggleSidebar }) {
  return (
    <header className="w-full flex items-center justify-between px-4 py-2 bg-gradient-to-r from-green-900 to-green-500 text-white">
      {/* Left side: Burger icon (on mobile) and Logo */}
      <div className="flex items-center space-x-4">
        {/* Burger icon for mobile */}
        <button onClick={toggleSidebar} className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo and version */}
        <div className="flex items-center space-x-2">
          <img
            src="/pharmbot-logo.png" // Replace with your actual path
            alt="Pharmbot Logo"
            className="h-8 w-8"
          />
          <span className="font-light text-xl">PHARM<span className="font-bold">BOTAI</span></span>
        </div>

        {/* Version text */}
        <span className="text-sm ml-2">0.1.0 Medic</span>
      </div>

      {/* Right side: HOME link */}
      <div className="hidden md:block">
        <button className="text-sm font-light">HOME</button>
      </div>
    </header>
  )
}
