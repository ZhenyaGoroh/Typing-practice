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
        <Route path="/" element={<Input />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/results" element={<Results />} />
        <Route path="/results/*" element={<ResultPage />} />
      </Routes>
    </div>
  )
}

export default App
