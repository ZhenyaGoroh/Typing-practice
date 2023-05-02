import React, { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { BiSpaceBar } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import s from "../stylesheet/Practice.module.scss"
import { useStore } from "../store/store"

function Practice() {
  const navigate = useNavigate()

  const text = useStore((state) => state.text)

  const textNode = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)

  let char = 0
  // let line = 0
  const [line, setLine] = useState<number>(0)

  function increaceChar(): void {
    char += 1
    if (char === text.split(". ")[line].length) {
      setLine((prevLine) => {
        char = 10
        return prevLine + 1
      })
    }
  }

  function pushCursor() {
    if (
      textNode.current &&
      textNode.current.children[char + 1] &&
      cursorRef.current
    ) {
      if (char + 1 === 2) {
        cursorRef.current.style.left = `${
          parseFloat(cursorRef.current?.style.left) +
          textNode.current.children[char + 1].getBoundingClientRect().width
        }px`
      } else {
        cursorRef.current.style.left = `${
          parseFloat(cursorRef.current?.style.left) +
          textNode.current.children[char + 1].getBoundingClientRect().width
        }px`
      }
    }
  }

  useEffect(() => {
    if (text.length < 1) {
      navigate("/")
    }
    if (
      textNode.current &&
      textNode.current.children[char + 1] &&
      cursorRef.current
    ) {
      cursorRef.current.style.left = `${
        // parseFloat(cursorRef.current?.style.left) +
        textNode.current.children[char + 1].getBoundingClientRect().width
      }px`
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === text.split(". ")[line][char]) {
        textNode.current?.children[char + 1].classList.add(`${s.correct}`)
        if (char + 1 !== text.length) {
          pushCursor()
        }
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
          <span ref={cursorRef} className={s.cursor} />
          {text
            .split(". ")
            [line].split("")
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
