'use client'

import { useState } from 'react'
import { topicsData } from '@/lib/topics-data'
import QuizSection from '@/components/QuizSection'

export default function ExamPage() {
  const [examStarted, setExamStarted] = useState(false)
  const [examType, setExamType] = useState<'short' | 'full'>('short')

  const allQuestions = Object.values(topicsData).flatMap(topic => 
    topic.quiz.map(q => ({
      ...q,
      topicTitle: topic.title,
      topicId: topic.id
    }))
  )

  const examQuestions = [...allQuestions]
    .sort(() => Math.random() - 0.5)
    .slice(0, examType === 'short' ? 20 : 40)

  const handleStartExam = () => {
    setExamStarted(true)
  }

  const handleBackToMenu = () => {
    setExamStarted(false)
  }

  if (examStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            模擬試験 ({examType === 'short' ? '短縮版' : 'フル版'})
          </h1>
          <button
            onClick={handleBackToMenu}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            試験を中断
          </button>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            制限時間: {examType === 'short' ? '30分' : '60分'}（参考）
          </p>
          <p className="text-sm text-gray-700">
            問題数: {examQuestions.length}問
          </p>
        </div>

        <QuizSection questions={examQuestions} />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">模擬試験</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">試験形式を選択</h2>
        
        <div className="space-y-4 mb-6">
          <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="examType"
              value="short"
              checked={examType === 'short'}
              onChange={(e) => setExamType(e.target.value as 'short' | 'full')}
              className="mr-3"
            />
            <div>
              <p className="font-semibold">短縮版（20問）</p>
              <p className="text-sm text-gray-600">約30分で完了できる短めの模擬試験です</p>
            </div>
          </label>
          
          <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="examType"
              value="full"
              checked={examType === 'full'}
              onChange={(e) => setExamType(e.target.value as 'full' | 'full')}
              className="mr-3"
            />
            <div>
              <p className="font-semibold">フル版（40問）</p>
              <p className="text-sm text-gray-600">本番に近い形式の模擬試験です</p>
            </div>
          </label>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">試験の注意事項</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>全トピックからランダムに出題されます</li>
            <li>時間制限は参考値です（自動終了はしません）</li>
            <li>すべての問題に回答してから結果を確認してください</li>
            <li>途中で中断すると、進捗は保存されません</li>
          </ul>
        </div>

        <button
          onClick={handleStartExam}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
        >
          試験を開始する
        </button>
      </div>
    </div>
  )
}