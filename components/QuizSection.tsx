'use client'

import { useState } from 'react'

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

  const handleAnswer = (optionIndex: number) => {
    if (showResult) return
    setSelectedAnswer(optionIndex)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return
    
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer
    if (isCorrect && !answered[currentQuestion]) {
      setScore(score + 1)
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            問題 {currentQuestion + 1} / {questions.length}
          </span>
          <span className="text-sm font-semibold text-blue-600">
            スコア: {score} / {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {question.question}
        </h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswer === index
                  ? showResult
                    ? index === question.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-blue-500 bg-blue-50'
                  : showResult && index === question.correctAnswer
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              disabled={showResult}
            >
              <div className="flex items-center">
                <span className="mr-3 font-semibold">{index + 1}.</span>
                <span>{option}</span>
                {showResult && index === question.correctAnswer && (
                  <span className="ml-auto text-green-600 font-semibold">正解</span>
                )}
                {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                  <span className="ml-auto text-red-600 font-semibold">不正解</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {showResult && (
        <div className={`p-4 rounded-lg mb-4 ${
          selectedAnswer === question.correctAnswer
            ? 'bg-green-100 border border-green-300'
            : 'bg-yellow-100 border border-yellow-300'
        }`}>
          <p className="font-semibold mb-2">
            {selectedAnswer === question.correctAnswer ? '正解です！' : '不正解です'}
          </p>
          <p className="text-gray-700">{question.explanation}</p>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          前の問題
        </button>

        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            回答する
          </button>
        ) : currentQuestion === questions.length - 1 ? (
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            もう一度挑戦
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            次の問題
          </button>
        )}
      </div>

      {currentQuestion === questions.length - 1 && showResult && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
          <p className="text-lg font-semibold text-gray-800">
            最終スコア: {score} / {questions.length}
          </p>
          <p className="text-gray-600 mt-1">
            正答率: {Math.round((score / questions.length) * 100)}%
          </p>
        </div>
      )}
    </div>
  )
}