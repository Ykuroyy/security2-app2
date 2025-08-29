'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            基本情報技術者試験 科目B
          </Link>
          
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-200 transition-colors">
              ホーム
            </Link>
            <Link href="/practice" className="hover:text-blue-200 transition-colors">
              練習問題
            </Link>
            <Link href="/exam" className="hover:text-blue-200 transition-colors">
              模擬試験
            </Link>
            <Link href="/progress" className="hover:text-blue-200 transition-colors">
              学習進捗
            </Link>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link href="/" className="block py-2 hover:text-blue-200 transition-colors">
              ホーム
            </Link>
            <Link href="/practice" className="block py-2 hover:text-blue-200 transition-colors">
              練習問題
            </Link>
            <Link href="/exam" className="block py-2 hover:text-blue-200 transition-colors">
              模擬試験
            </Link>
            <Link href="/progress" className="block py-2 hover:text-blue-200 transition-colors">
              学習進捗
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}