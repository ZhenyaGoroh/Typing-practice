import React, { ReactNode, createRef, useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { BiSpaceBar } from "react-icons/bi"
import s from "../stylesheet/Practice.module.scss"
import { useStore } from "../store/store"

function Practice() {
  const text = useStore((state) => state.text)

  const textNode = useRef<HTMLDivElement>(null)

  let char: number = 0
  let line: number = 0

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === text[char]) {
        console.log("h")
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
            .map((char, index) => (
              <span key={index}>{char}</span>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Practice
