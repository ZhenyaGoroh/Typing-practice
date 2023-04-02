import React, { useEffect, useState } from "react"
import s from "../stylesheet/Practice.module.scss"
import { useStore } from "../store/store"

function Practice() {
  const text = useStore((state) => state.text)
  const setText = useStore((state) => state.setText)

  const [line, setLine] = useState<number>(0)
  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.key === text[0]) {
        setText(text.slice(1))
      }
    })
  })

  return (
    <div className="container">
      <div className={s.practice}>
        <div className={s.practice__text}>{text}</div>
      </div>
    </div>
  )
}

export default Practice
