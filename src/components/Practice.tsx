import React, { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { BiSpaceBar } from "react-icons/bi"
import s from "../stylesheet/Practice.module.scss"
import { useStore } from "../store/store"

function Practice() {
  const text = useStore((state) => state.text)

  const textNode = useRef<HTMLDivElement>(null)

  let char = 0
  // let line = 0
  const [line, setLine] = useState<number>(0)

  function increaceChar(): void {
    char += 1
    if (char === 10) {
      setLine((prevLine) => {
        char = 10
        return prevLine + 1
      })
    }
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === text.slice(10 * line, 10 * line + 10)[char]) {
        textNode.current?.children[char].classList.add(`${s.correct}`)
        increaceChar()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  })

  return (
    <div className="container">
      <div className={s.practice}>
        <div ref={textNode} className={s.practice__text}>
          {text
            .slice(10 * line, 10 * line + 10)
            .split("")
            .map((ch) => {
              return ch === " " ? (
                <BiSpaceBar className={s.spaceSpan} key={uuidv4()} />
              ) : (
                <span key={uuidv4()}>{ch}</span>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default Practice
