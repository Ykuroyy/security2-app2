import Link from 'next/link'

const topics = [
  { id: 'programming-basics', title: 'プログラミング言語とは', description: 'プログラミング言語の基本概念と種類について学習します' },
  { id: 'compiler', title: 'コンパイラ方式でのプログラム実行手順', description: 'ソースコードから実行可能ファイルまでの流れを理解します' },
  { id: 'variables', title: '変数は入れ物として使う箱', description: '変数の概念と使い方を学びます' },
  { id: 'structured-programming', title: '構造化プログラミング', description: '順次・選択・反復の3つの基本構造を理解します' },
  { id: 'algorithm-flowchart', title: 'アルゴリズムとフローチャート', description: '問題解決の手順を図式化する方法を学びます' },
  { id: 'data-structure', title: 'データの持ち方', description: '配列、リスト、スタック、キューなどのデータ構造を学習します' },
  { id: 'tree-structure', title: '木構造', description: '二分木やB木などの木構造について理解します' },
  { id: 'search-algorithm', title: 'データを探索するアルゴリズム', description: '線形探索、二分探索などの探索アルゴリズムを学びます' },
  { id: 'sort-algorithm', title: 'データを整列させるアルゴリズム', description: 'バブルソート、クイックソートなどの整列アルゴリズムを理解します' },
  { id: 'order-notation', title: 'オーダ記法', description: 'アルゴリズムの計算量を表す記法を学習します' },
  { id: 'pseudo-code', title: '擬似言語問題を読み解こう', description: '擬似言語の読み方と問題の解き方を学びます' },
  { id: 'oop', title: 'オブジェクト指向プログラミング', description: 'クラス、継承、カプセル化などのOOP概念を理解します' },
  { id: 'uml', title: 'UML', description: 'クラス図やシーケンス図などのUML記法を学習します' },
]

export default function Home() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          基本情報技術者試験 科目B対策
        </h1>
        <p className="text-lg text-gray-600">
          プログラミングとアルゴリズムを基礎から学習し、科目B合格を目指しましょう
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/topics/${topic.id}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {topic.title}
            </h2>
            <p className="text-gray-600 text-sm">
              {topic.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">学習の進め方</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>各トピックの解説を読んで基本概念を理解する</li>
          <li>具体例とコードサンプルで実践的な知識を身につける</li>
          <li>練習問題で理解度を確認する</li>
          <li>間違えた問題は解説を読んで復習する</li>
          <li>全トピックを学習したら、総合問題に挑戦する</li>
        </ol>
      </div>
    </div>
  )
}