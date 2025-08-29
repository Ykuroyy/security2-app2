'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'ホーム', icon: '🏠' },
    { href: '/practice', label: '練習問題', icon: '✏️' },
    { href: '/exam', label: '模擬試験', icon: '📝' },
    { href: '/progress', label: '学習進捗', icon: '📊' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 text-xl font-bold hover:scale-105 transition-transform">
            <span className="text-2xl">🚀</span>
            <span className="hidden sm:block">基本情報技術者試験 科目B</span>
            <span className="sm:hidden">科目B対策</span>
          </Link>
          
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>

          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-white bg-opacity-20 text-white shadow-sm'
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white border-opacity-20 mt-4">
            <div className="space-y-1 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}