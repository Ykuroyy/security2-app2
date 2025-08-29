import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '基本情報技術者試験 科目B対策アプリ',
  description: 'プログラミングとアルゴリズムを基礎から学習できる対策アプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          
          {/* フッター */}
          <footer className="bg-gray-800 text-white py-8 mt-16">
            <div className="container mx-auto px-4 text-center">
              <div className="flex justify-center items-center mb-4">
                <span className="text-2xl mr-2">🚀</span>
                <h3 className="text-xl font-bold">基本情報技術者試験 科目B対策</h3>
              </div>
              <p className="text-gray-400 mb-4">
                プログラミングとアルゴリズムを楽しく学習して合格を目指しましょう！
              </p>
              <div className="flex justify-center space-x-6 text-sm text-gray-400">
                <span>© 2024 基本情報技術者試験対策アプリ</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}