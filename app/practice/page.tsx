'use client'

import { useState } from 'react'
import { topicsData } from '@/lib/topics-data'
import QuizSection from '@/components/QuizSection'

export default function PracticePage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all')

  const allQuestions = Object.values(topicsData).flatMap(topic => 
    topic.quiz.map(q => ({
      ...q,
      topicTitle: topic.title,
      topicId: topic.id
    }))
  )

  const filteredQuestions = selectedTopic
    ? allQuestions.filter(q => q.topicId === selectedTopic)
    : allQuestions

  const shuffledQuestions = [...filteredQuestions].sort(() => Math.random() - 0.5)

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">練習問題</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">問題を選択</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            トピックを選択
          </label>
          <select
            value={selectedTopic || ''}
            onChange={(e) => setSelectedTopic(e.target.value || null)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">すべてのトピック</option>
            {Object.values(topicsData).map(topic => (
              <option key={topic.id} value={topic.id}>
                {topic.title}
              </option>
            ))}
          </select>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          選択可能な問題数: {filteredQuestions.length}問
        </div>

        {filteredQuestions.length > 0 && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              ランダムに問題が出題されます。各問題に回答して、理解度を確認しましょう。
            </p>
          </div>
        )}
      </div>

      {filteredQuestions.length > 0 ? (
        <QuizSection questions={shuffledQuestions.slice(0, 10)} />
      ) : (
        <div className="text-center py-8 bg-gray-100 rounded-lg">
          <p className="text-gray-600">選択された条件に該当する問題がありません</p>
        </div>
      )}
    </div>
  )
}