import React from "react"
import "./App.scss"
import { Routes, Route } from "react-router-dom"
import Input from "./pages/Input"
import Practice from "./pages/Practice"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Input />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </div>
  )
}

export default App
