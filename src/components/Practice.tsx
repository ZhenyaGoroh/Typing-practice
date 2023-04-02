import React, { createRef, useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { BiSpaceBar } from "react-icons/bi"
import s from "../stylesheet/Practice.module.scss"
import { useStore } from "../store/store"

function Practice() {
  const text = useStore((state) => state.text)
  const setText = useStore((state) => state.setText)

  const [line, setLine] = useState<number>(0)
  let char = 0
  const incrementChar = () => {
    char += 1
  }
  const parentNode = useRef<HTMLDivElement>(null)
  const spanRefs = useRef<Array<React.RefObject<HTMLSpanElement>>>(
    text.split("").map(() => createRef())
  )

  const print: JSX.Element = text
    .slice(line * 100, 100 + line * 100)
    .split("")
    .map((ch, index) =>
      ch !== " " ? (
        <span key={uuidv4()} ref={spanRefs.current[index]}>
          {ch}
        </span>
      ) : (
        <span key={uuidv4()} ref={spanRefs.current[index]}>
          <BiSpaceBar className={s.space} />
        </span>
      )
    )

  function downHandler(key: string) {
    if (key === text[char]) {
      parentNode.current?.children[char].classList.add(s.correct)
      incrementChar()
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", (event: KeyboardEvent) =>
      downHandler(event.key)
    )
    return () => {
      window.removeEventListener("keydown", (event: KeyboardEvent) =>
        downHandler(event.key)
      )
    }
  })

  return (
    <div className="container">
      <div className={s.practice}>
        <div ref={parentNode} className={s.practice__text}>
          {print}
        </div>
      </div>
    </div>
  )
}

export default Practice
