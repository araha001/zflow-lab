// Zflow Lab v3 - UI 개선 포함 (중앙 정렬, 큰 입력창, 텍스트명확화)

import React, { useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const languageDetector = (text) => {
  if (/[ぁ-んァ-ン一-龯]/.test(text)) return 'ja'
  if (/[一-鿿]/.test(text)) return 'zh'
  if (/[가-힣]/.test(text)) return 'ko'
  return 'en'
}

const keywordSets = { ... }  // 중략

export default function ZflowLabV3() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [score, setScore] = useState(0)
  const [details, setDetails] = useState([])
  const [mission, setMission] = useState('')
  const [showResult, setShowResult] = useState(false)

  const analyze = () => {
    const lang = languageDetector(input)
    const patterns = keywordSets[lang] || []
    let tempScore = 0
    const matched = patterns.map(p => {
      const hit = input.includes(p.keyword)
      if (hit) tempScore += p.score
      return { name: p.label, value: hit ? p.score : 0 }
    })

    setScore(tempScore)
    setResponse(simulateGptResponse(tempScore))
    setMission(generateZMission(tempScore))
    setDetails(matched)
    setShowResult(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 font-sans bg-white">
      <div className="w-full max-w-3xl space-y-6">
        <h2 className="text-3xl font-bold text-center">🧠 Zflow Resonance Test</h2>
        <p className="text-center text-gray-700">Enter a sentence that might resonate with GPT structurally. You may use any language.</p>
        <input
          type="text"
          className="w-full p-4 text-lg border rounded shadow"
          placeholder="e.g., I didn't mean it, but something reacted."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div className="flex justify-center">
          <button className="bg-black text-white px-6 py-3 rounded shadow hover:bg-gray-800" onClick={analyze}>
            Analyze
          </button>
        </div>

        {showResult && (
          <div className="bg-gray-100 p-6 rounded-lg space-y-4">
            <h3 className="text-xl font-semibold">🧪 Simulated GPT Response</h3>
            <p>{response}</p>

            <h3 className="text-xl font-semibold mt-4">🎯 Your Z-Mission</h3>
            <p>{mission}</p>

            <h3 className="text-xl font-semibold mt-4">📊 Structural Pattern Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={details} layout="vertical">
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" width={120} />
                <Tooltip />
                <Bar dataKey="value" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}
