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

  function getText(): string[] {
    if (text.length !== 0) {
      const words = text.split(" ")
      const result = []
      let currentLine = ""

      for (let i = 0; i < words.length; i += 1) {
        if (currentLine.length + words[i].length <= 70) {
          currentLine += currentLine === "" ? words[i] : ` ${words[i]}`
        } else {
          result.push(currentLine)
          currentLine = words[i]
        }
      }

      if (currentLine !== "") {
        result.push(currentLine)
      }

      return result
    }
    return []
  }

  function increaceChar(): void {
    char += 1
    if (char === getText()[line].length) {
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
      if (getText()[line].split("")[char + 1] === " ") {
        cursorRef.current.style.left = `${
          parseFloat(cursorRef.current?.style.left) +
          textNode.current.children[char + 1].getBoundingClientRect().width +
          (24 -
            textNode.current.children[char + 1].getBoundingClientRect().width)
        }px`
      } else if (getText()[line].split("")[char] === " ") {
        cursorRef.current.style.left = `${
          parseFloat(cursorRef.current?.style.left) +
          textNode.current.children[char + 1].getBoundingClientRect().width -
          (24 - textNode.current.children[char].getBoundingClientRect().width)
        }px`
      } else {
        cursorRef.current.style.left = `${
          parseFloat(cursorRef.current?.style.left) +
          textNode.current.children[char + 1].getBoundingClientRect().width
        }px`
      }

      console.log(
        textNode.current.children[char + 1].getBoundingClientRect().width
        // textNode.current.children[char + 1].getBoundingClientRect().width
      )
    }
  }

  useEffect(() => {
    getText()
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
      if (event.key === getText()[line][char]) {
        textNode.current?.children[char + 1].classList.add(`${s.correct}`)
        if (char + 1 !== text.length) {
          pushCursor()
        }
        // TODO: last character  else {
        //   alert("f")
        // }
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
          {text.length > 0 &&
            getText()
              [line].split("")
              .map((ch) => {
                return ch === " " ? (
                  <BiSpaceBar
                    size="1.5rem"
                    key={uuidv4()}
                    className={s.spaceSpan}
                  />
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
