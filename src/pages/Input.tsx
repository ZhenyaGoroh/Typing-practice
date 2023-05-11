import React from "react"
import ReactTextareaAutosize from "react-textarea-autosize"
import { Link } from "react-router-dom"
import s from "../stylesheet/Input.module.scss"
import { useStore } from "../store/store"

function Input() {
  const setText = useStore((state) => state.setText)
  const text = useStore((state) => state.text)

  return (
    <div className={s.input}>
      <div className={s.input__image}>
        <div className={s.input__image__author}>
          Image by{" "}
          <a href="https://www.freepik.com/free-photo/retro-computer-desk-arrangement_37350437.htm#query=old%20computer%203d%20concept&position=0&from_view=search&track=ais">
            Freepik
          </a>
        </div>
      </div>

      <div className={s.input__input}>
        <span className={s.input__label}>Enter your text here</span>
        <ReactTextareaAutosize
          className={s.input__textarea}
          autoFocus
          placeholder="Text..."
          onChange={(el) => setText(el.target.value)}
          value={text}
        />
        {text.length >= 20 ? (
          <Link
            onClick={() => setText(text.trim())}
            to="/practice"
            className={s.input__link}
          >
            Start typing
          </Link>
        ) : (
          <span>Write {20 - text.length} more characters</span>
        )}
      </div>
    </div>
  )
}

export default Input
