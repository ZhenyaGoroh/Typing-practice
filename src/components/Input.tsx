import React from "react"
import ReactTextareaAutosize from "react-textarea-autosize"
import { Link } from "react-router-dom"
import s from "../stylesheet/Input.module.scss"
import { useState } from "../store/store"

function Input() {
  const setText = useState((state) => state.setText)
  const text = useState((state) => state.text)

  return (
    <div className="container">
      <div className={s.input}>
        <span className={s.input__label}>Enter your text here</span>
        <ReactTextareaAutosize
          className={s.input__textarea}
          autoFocus
          placeholder="Text..."
          onChange={(el) => setText(el.target.value)}
        />
        {text.length > 0 && (
          <Link to="/practice" className={s.input__link}>
            Start typing
          </Link>
        )}
      </div>
    </div>
  )
}

export default Input
