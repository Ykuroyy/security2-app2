'use client'

import { useState, useEffect } from 'react'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizSectionProps {
  questions: Question[]
}

export default function QuizSection({ questions }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<boolean[]>(new Array(questions.length).fill(false))
  const [showAnimation, setShowAnimation] = useState(false)

  const handleAnswer = (optionIndex: number) => {
    if (showResult) return
    setSelectedAnswer(optionIndex)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return
    
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer
    if (isCorrect && !answered[currentQuestion]) {
      setScore(score + 1)
      setShowAnimation(true)
      setTimeout(() => setShowAnimation(false), 2000)
    }
    
    const newAnswered = [...answered]
    newAnswered[currentQuestion] = true
    setAnswered(newAnswered)
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswered(new Array(questions.length).fill(false))
  }

  const question = questions[currentQuestion]
  const progressPercent = ((currentQuestion + 1) / questions.length) * 100
  const scorePercent = (score / questions.length) * 100

  const getScoreEmoji = () => {
    if (scorePercent >= 80) return '🏆'
    if (scorePercent >= 60) return '👍'
    if (scorePercent >= 40) return '💪'
    return '📚'
  }

  const getScoreMessage = () => {
    if (scorePercent >= 80) return '素晴らしい！'
    if (scorePercent >= 60) return 'よくできました！'
    if (scorePercent >= 40) return 'もう少し！'
    return '復習しましょう！'
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full opacity-50"></div>
      
      {/* アニメーション */}
      {showAnimation && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-green-500 bg-opacity-20 animate-pulse">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}

      {/* ヘッダー */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📝</span>
            <span className="text-lg font-bold text-gray-800">
              問題 {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xl">{getScoreEmoji()}</span>
            <span className="text-lg font-bold text-blue-600">
              {score} / {questions.length}
            </span>
          </div>
        </div>
        
        {/* プログレスバー */}
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="absolute right-0 top-4 text-sm text-gray-600">
            {Math.round(progressPercent)}% 完了
          </div>
        </div>
      </div>

      {/* 問題文 */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
            <span className="text-2xl mr-2">🤔</span>
            問題
          </h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            {question.question}
          </p>
        </div>
      </div>
      
      {/* 選択肢 */}
      <div className="space-y-4 mb-8">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrect = index === question.correctAnswer
          const isWrong = showResult && isSelected && !isCorrect
          
          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`group w-full text-left p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-102 ${
                isSelected
                  ? showResult
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 shadow-green-100 shadow-lg'
                      : 'border-red-500 bg-red-50 shadow-red-100 shadow-lg'
                    : 'border-blue-500 bg-blue-50 shadow-blue-100 shadow-lg'
                  : showResult && isCorrect
                  ? 'border-green-500 bg-green-50 shadow-green-100 shadow-lg'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
              }`}
              disabled={showResult}
            >
              <div className="flex items-center">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
                  isSelected
                    ? showResult
                      ? isCorrect
                        ? 'bg-green-500'
                        : 'bg-red-500'
                      : 'bg-blue-500'
                    : showResult && isCorrect
                    ? 'bg-green-500'
                    : 'bg-gray-400 group-hover:bg-blue-400'
                }`}>
                  {index + 1}
                </div>
                <span className="flex-1 text-gray-800">{option}</span>
                <div className="flex-shrink-0 ml-4">
                  {showResult && isCorrect && (
                    <span className="text-green-600 font-bold flex items-center">
                      ✓ 正解
                    </span>
                  )}
                  {isWrong && (
                    <span className="text-red-600 font-bold flex items-center">
                      ✗ 不正解
                    </span>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* 解説 */}
      {showResult && (
        <div className={`mb-6 p-6 rounded-xl border-2 ${
          selectedAnswer === question.correctAnswer
            ? 'bg-green-50 border-green-200'
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-2">
              {selectedAnswer === question.correctAnswer ? '🎉' : '💡'}
            </span>
            <p className="text-lg font-bold">
              {selectedAnswer === question.correctAnswer ? '正解です！' : '不正解です'}
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">{question.explanation}</p>
        </div>
      )}

      {/* ボタン */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span>←</span>
          <span>前の問題</span>
        </button>

        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>✓</span>
            <span>回答する</span>
          </button>
        ) : currentQuestion === questions.length - 1 ? (
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>🔄</span>
            <span>もう一度挑戦</span>
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>次の問題</span>
            <span>→</span>
          </button>
        )}
      </div>

      {/* 最終結果 */}
      {currentQuestion === questions.length - 1 && showResult && (
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 text-center">
          <div className="text-4xl mb-3">{getScoreEmoji()}</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{getScoreMessage()}</h3>
          <p className="text-xl text-gray-700 mb-2">
            最終スコア: <span className="font-bold text-blue-600">{score} / {questions.length}</span>
          </p>
          <p className="text-lg text-gray-600">
            正答率: <span className="font-bold">{Math.round((score / questions.length) * 100)}%</span>
          </p>
        </div>
      )}
    </div>
  )
}