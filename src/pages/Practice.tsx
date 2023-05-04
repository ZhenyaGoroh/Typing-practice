import React, { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { BiSpaceBar } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import s from "../stylesheet/Practice.module.scss"
import { useStore } from "../store/store"
import { useResults } from "../store/results"
import CurrentResult from "../components/CurrentResult"

function Practice() {
  const navigate = useNavigate()

  const text = useStore((state) => state.text)
  const resultStatusStore = useStore((state) => state.resultStatus)
  const toggleResultStatus = useStore((state) => state.toggleResultStatus)

  const { addResult } = useResults()

  let char = 0

  const textNode = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)

  let totalSeconds = 0
  function increaseTotalSeconds() {
    totalSeconds += 1
  }
  let mistakes = 0
  function increaeMistakes() {
    mistakes += 1
  }

  let isActive = false
  function toggleIsActive() {
    isActive = true
  }
  const [line, setLine] = useState<number>(0)

  const [resultStatus, setResultStatus] = useState<boolean>(resultStatusStore)
  const [wpmProp, setWpmProp] = useState(0)
  const [secondsProp, setSecondsProp] = useState(0)
  const [minutesProp, setMinutesProp] = useState(0)
  const [mistakesProp, setMistakesProp] = useState(0)

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
    }
  }

  useEffect(() => {
    let interval: number
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
        textNode.current.children[char + 1].getBoundingClientRect().width
      }px`
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (!isActive) {
        interval = setInterval(() => {
          increaseTotalSeconds()
        }, 1000)
        toggleIsActive()
      }
      if (event.key === getText()[line][char]) {
        textNode.current?.children[char + 1].classList.add(`${s.correct}`)
        if (char + 1 !== text.length) {
          pushCursor()
        }
        // TODO: last character
        else {
          clearInterval(interval)
          setWpmProp(
            totalSeconds < 60
              ? Math.round((text.split(" ").length / totalSeconds) * 60)
              : Math.round(text.split(" ").length / (totalSeconds / 60))
          )
          setSecondsProp(totalSeconds % 60)
          setMinutesProp(Math.floor(totalSeconds / 60))
          setMistakesProp(mistakes)
          addResult({
            id: uuidv4(),
            wpm:
              totalSeconds < 60
                ? Math.round((text.split(" ").length / totalSeconds) * 60)
                : Math.round(text.split(" ").length / (totalSeconds / 60)),
            seconds: totalSeconds % 60,
            minutes: Math.floor(totalSeconds / 60),
            mistakes,
            text,
          })
          setResultStatus(true)
          toggleResultStatus()
        }
        increaceChar()
      } else {
        increaeMistakes()
      }
    }
    if (!resultStatus) {
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  })

  return (
    <div className="container">
      <div className={s.practice}>
        <div ref={textNode} className={s.practice__text}>
          <span ref={cursorRef} className={s.cursor} />
          {resultStatus ? (
            <CurrentResult
              wpm={wpmProp}
              seconds={secondsProp}
              minutes={minutesProp}
              mistakes={mistakesProp}
            />
          ) : (
            text.length > 0 &&
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
              })
          )}
        </div>
      </div>
    </div>
  )
}

export default Practice
