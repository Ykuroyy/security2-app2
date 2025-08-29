'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { topicsData } from '@/lib/topics-data'
import QuizSection from '@/components/QuizSection'

export default function TopicPage() {
  const params = useParams()
  const router = useRouter()
  const topicId = params.id as string
  const topic = topicsData[topicId]
  const [showQuiz, setShowQuiz] = useState(false)

  if (!topic) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          トピックが見つかりません
        </h1>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ホームに戻る
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.push('/')}
        className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
      >
        ← トピック一覧に戻る
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">{topic.title}</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">概要</h2>
        <p className="text-gray-700 leading-relaxed">{topic.content.overview}</p>
      </div>

      <div className="space-y-6 mb-6">
        {topic.content.details.map((detail, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap text-gray-700 font-sans">
                {detail}
              </pre>
            </div>
          </div>
        ))}
      </div>

      {topic.content.examples && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">実例</h2>
          {topic.content.examples.map((example, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {example.title}
              </h3>
              {example.code && (
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-3">
                  <code className="text-sm">{example.code}</code>
                </pre>
              )}
              <p className="text-gray-700">{example.explanation}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">重要ポイント</h2>
        <ul className="list-disc list-inside space-y-2">
          {topic.content.keyPoints.map((point, index) => (
            <li key={index} className="text-gray-700">{point}</li>
          ))}
        </ul>
      </div>

      <div className="text-center mb-8">
        <button
          onClick={() => setShowQuiz(!showQuiz)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          {showQuiz ? '解説に戻る' : '練習問題に挑戦'}
        </button>
      </div>

      {showQuiz && <QuizSection questions={topic.quiz} />}
    </div>
  )
}