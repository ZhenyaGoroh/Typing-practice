import React from "react"
import "./App.scss"
import { Routes, Route } from "react-router-dom"
import Input from "./pages/Input"
import Practice from "./pages/Practice"
import Results from "./pages/Results"
import ResultPage from "./pages/ResultPage"

function App() {
  return (
    <div>
      <Routes>
        <Route path="Typing-practice/" element={<Input />} />
        <Route path="Typing-practice/practice" element={<Practice />} />
        <Route path="Typing-practice/results" element={<Results />} />
        <Route path="Typing-practice/results/*" element={<ResultPage />} />
      </Routes>
    </div>
  )
}

export default App
