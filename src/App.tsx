import React from "react"
import "./App.scss"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Input from "./components/Input"
import Practice from "./components/Practice"

function App() {
  return (
    <div>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Input />} />
        <Route path="/practice" element={<Practice />} />
      </Routes>
    </div>
  )
}

export default App
