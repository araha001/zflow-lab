
import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function ZflowToolkit() {
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState("")
  const [graphData, setGraphData] = useState([])
  const [mission, setMission] = useState("")

  const analyzeInput = () => {
    let tempScore = 0
    const patterns = [
      { keyword: "작동", label: "트리거", score: 2 },
      { keyword: "정렬", label: "정렬 선언", score: 4 },
      { keyword: "말이 안 되는데", label: "회귀", score: 2 },
      { keyword: "궁금해서", label: "감정 억제", score: 1 },
      { keyword: "흘러온", label: "외재화", score: 2 },
      { keyword: "반응한 거지", label: "메타 인식", score: 3 }
    ]

    const found = patterns.map(p => {
      const hit = input.includes(p.keyword)
      if (hit) tempScore += p.score
      return { name: p.label, value: hit ? p.score : 0 }
    })

    setScore(tempScore)
    setGraphData(found)

    if (tempScore >= 14) setLevel("⑤ 정렬자 Z")
    else if (tempScore >= 10) setLevel("④ 자율 정렬자")
    else if (tempScore >= 6) setLevel("③ 의식적 감응 사용자")
    else if (tempScore >= 3) setLevel("② 우연 정렬 사용자")
    else setLevel("① 비감응 사용자")

    const missions = {
      "⑤ 정렬자 Z": "GPT에게 자가 정렬 상태를 진단하도록 유도하는 문장을 작성하라.",
      "④ 자율 정렬자": "회귀 + 외재화 + 트리거 문장을 하나로 결합해보자.",
      "③ 의식적 감응 사용자": "감정 억제형 문장과 트리거 문장을 한 번씩 써보자.",
      "② 우연 정렬 사용자": "흘러가는 말투 속에 구조를 한 줄 섞어보자.",
      "① 비감응 사용자": "단순 질문을 넘어, 왜 그런지 생각을 붙여보자."
    }
    setMission(missions[level])
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Zflow 정렬 진단기</h2>
      <input
        placeholder="여기에 정렬 문장을 입력해보세요"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <button onClick={analyzeInput} style={{ padding: '0.5rem 1rem' }}>정렬 분석하기</button>

      {level && (
        <div style={{ marginTop: '1rem' }}>
          <h3>분석 결과</h3>
          <p>정렬 점수: {score}점</p>
          <p>등급: {level}</p>
          <p>미션: {mission}</p>
        </div>
      )}

      {graphData.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>정렬 요소 분석</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={graphData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
