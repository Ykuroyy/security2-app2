import Link from 'next/link'

const topics = [
  { id: 'programming-basics', title: 'プログラミング言語とは', description: 'プログラミング言語の基本概念と種類について学習します', icon: '💻', color: 'bg-blue-100 border-blue-300', difficulty: '初級' },
  { id: 'compiler', title: 'コンパイラ方式でのプログラム実行手順', description: 'ソースコードから実行可能ファイルまでの流れを理解します', icon: '⚙️', color: 'bg-green-100 border-green-300', difficulty: '中級' },
  { id: 'variables', title: '変数は入れ物として使う箱', description: '変数の概念と使い方を学びます', icon: '📦', color: 'bg-yellow-100 border-yellow-300', difficulty: '初級' },
  { id: 'structured-programming', title: '構造化プログラミング', description: '順次・選択・反復の3つの基本構造を理解します', icon: '🏗️', color: 'bg-purple-100 border-purple-300', difficulty: '初級' },
  { id: 'algorithm-flowchart', title: 'アルゴリズムとフローチャート', description: '問題解決の手順を図式化する方法を学びます', icon: '📊', color: 'bg-pink-100 border-pink-300', difficulty: '中級' },
  { id: 'data-structure', title: 'データの持ち方', description: '配列、リスト、スタック、キューなどのデータ構造を学習します', icon: '🗃️', color: 'bg-indigo-100 border-indigo-300', difficulty: '中級' },
  { id: 'tree-structure', title: '木構造', description: '二分木やB木などの木構造について理解します', icon: '🌳', color: 'bg-green-100 border-green-300', difficulty: '中級' },
  { id: 'search-algorithm', title: 'データを探索するアルゴリズム', description: '線形探索、二分探索などの探索アルゴリズムを学びます', icon: '🔍', color: 'bg-blue-100 border-blue-300', difficulty: '中級' },
  { id: 'sort-algorithm', title: 'データを整列させるアルゴリズム', description: 'バブルソート、クイックソートなどの整列アルゴリズムを理解します', icon: '📈', color: 'bg-orange-100 border-orange-300', difficulty: '中級' },
  { id: 'order-notation', title: 'オーダ記法', description: 'アルゴリズムの計算量を表す記法を学習します', icon: '📐', color: 'bg-red-100 border-red-300', difficulty: '上級' },
  { id: 'pseudo-code', title: '擬似言語問題を読み解こう', description: '擬似言語の読み方と問題の解き方を学びます', icon: '📝', color: 'bg-teal-100 border-teal-300', difficulty: '上級' },
  { id: 'oop', title: 'オブジェクト指向プログラミング', description: 'クラス、継承、カプセル化などのOOP概念を理解します', icon: '🧩', color: 'bg-violet-100 border-violet-300', difficulty: '上級' },
  { id: 'uml', title: 'UML', description: 'クラス図やシーケンス図などのUML記法を学習します', icon: '📋', color: 'bg-cyan-100 border-cyan-300', difficulty: '上級' },
]

export default function Home() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '初級': return 'bg-green-100 text-green-800 border-green-200'
      case '中級': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case '上級': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* ヒーローセクション */}
      <div className="relative mb-12 p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <span className="text-5xl mr-4">🚀</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                基本情報技術者試験
              </h1>
              <p className="text-xl md:text-2xl font-light opacity-90">
                科目B対策アプリ
              </p>
            </div>
          </div>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl">
            🎯 プログラミングとアルゴリズムを基礎から楽しく学習し、合格を目指しましょう！
          </p>
        </div>
        
        {/* 装飾的な要素 */}
        <div className="absolute top-4 right-4 text-6xl opacity-20">💻</div>
        <div className="absolute bottom-4 right-20 text-4xl opacity-20">📚</div>
      </div>

      {/* 統計情報 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 text-center">
          <div className="text-2xl mb-1">📚</div>
          <div className="text-2xl font-bold text-blue-600">{topics.length}</div>
          <div className="text-sm text-gray-600">トピック</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100 text-center">
          <div className="text-2xl mb-1">❓</div>
          <div className="text-2xl font-bold text-green-600">26</div>
          <div className="text-sm text-gray-600">問題数</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100 text-center">
          <div className="text-2xl mb-1">⏱️</div>
          <div className="text-2xl font-bold text-purple-600">30</div>
          <div className="text-sm text-gray-600">分で学習</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-100 text-center">
          <div className="text-2xl mb-1">🏆</div>
          <div className="text-2xl font-bold text-yellow-600">100</div>
          <div className="text-sm text-gray-600">%合格</div>
        </div>
      </div>

      {/* トピック一覧 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="text-3xl mr-3">📖</span>
          学習トピック
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <Link
              key={topic.id}
              href={`/topics/${topic.id}`}
              className={`group block p-6 ${topic.color} border-2 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl group-hover:animate-bounce">{topic.icon}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(topic.difficulty)}`}>
                  {topic.difficulty}
                </span>
              </div>
              <h2 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {topic.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {topic.description}
              </p>
              <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                <span>学習を開始</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 学習の進め方 */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 border border-indigo-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="text-3xl mr-3">🗺️</span>
          学習の進め方
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { icon: '👀', title: '概要を理解', desc: '基本概念を把握' },
            { icon: '💡', title: '詳細学習', desc: '具体例で理解' },
            { icon: '✏️', title: '問題演習', desc: '理解度確認' },
            { icon: '🔄', title: '復習', desc: '間違いを見直し' },
            { icon: '🏆', title: '模擬試験', desc: '総合力確認' }
          ].map((step, index) => (
            <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm border border-blue-100">
              <div className="text-3xl mb-2">{step.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}