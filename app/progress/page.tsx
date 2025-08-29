'use client'

import { useState, useEffect } from 'react'
import { topicsData } from '@/lib/topics-data'

interface Progress {
  [topicId: string]: {
    completed: boolean
    quizScore: number
    totalQuestions: number
    lastAccessed: string
  }
}

export default function ProgressPage() {
  const [progress, setProgress] = useState<Progress>({})

  useEffect(() => {
    const savedProgress = localStorage.getItem('learningProgress')
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  const topics = Object.values(topicsData)
  const completedTopics = Object.values(progress).filter(p => p.completed).length
  const totalScore = Object.values(progress).reduce((sum, p) => sum + p.quizScore, 0)
  const totalQuestions = Object.values(progress).reduce((sum, p) => sum + p.totalQuestions, 0)
  const overallProgress = (completedTopics / topics.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">学習進捗</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">完了したトピック</h3>
          <p className="text-2xl font-bold text-blue-600">
            {completedTopics} / {topics.length}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">全体の進捗率</h3>
          <p className="text-2xl font-bold text-green-600">
            {overallProgress.toFixed(1)}%
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">問題正答率</h3>
          <p className="text-2xl font-bold text-purple-600">
            {totalQuestions > 0 ? ((totalScore / totalQuestions) * 100).toFixed(1) : 0}%
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">トピック別進捗</h2>
        
        <div className="space-y-4">
          {topics.map(topic => {
            const topicProgress = progress[topic.id]
            const isCompleted = topicProgress?.completed || false
            const score = topicProgress?.quizScore || 0
            const total = topicProgress?.totalQuestions || topic.quiz.length
            const percentage = total > 0 ? (score / total) * 100 : 0
            
            return (
              <div key={topic.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-800">{topic.title}</h3>
                  <span className={`px-2 py-1 rounded text-sm ${
                    isCompleted 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {isCompleted ? '完了' : '未完了'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">
                    {score} / {total} 問正解
                  </span>
                </div>
                
                {topicProgress?.lastAccessed && (
                  <p className="text-xs text-gray-500 mt-2">
                    最終学習: {new Date(topicProgress.lastAccessed).toLocaleDateString('ja-JP')}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-2">学習のヒント</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>まだ学習していないトピックから始めましょう</li>
          <li>正答率が低いトピックは復習することをお勧めします</li>
          <li>すべてのトピックを学習したら、模擬試験に挑戦してみましょう</li>
        </ul>
      </div>
    </div>
  )
}