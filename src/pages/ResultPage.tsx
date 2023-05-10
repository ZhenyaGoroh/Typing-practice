import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import ReactTextareaAutosize from "react-textarea-autosize"
import s from "../stylesheet/ResultPage.module.scss"
import CurrentResult from "../components/CurrentResult"

function ResultPage() {
  const location = useLocation()
  const { wpm, seconds, minutes, mistakes, text } = location.state

  return (
    <div className={s.wrapper}>
      <div className={s.result}>
        <div className={s.result__results}>
          <div className={`${s.results__res} ${s.results__wpm}`}>{wpm}</div>
          <span className="vr" />
          <div className={`${s.results__res} ${s.results__time}`}>
            {minutes > 9 ? minutes : `0${minutes}`}:
            {seconds > 9 ? seconds : `0${seconds}`}
          </div>
          <span className="vr" />
          <div className={`${s.results__res} ${s.results__mistakes}`}>
            {mistakes}
          </div>
        </div>
        <ReactTextareaAutosize
          className={s.result__textarea}
          readOnly
          value={text}
        />
      </div>
    </div>
  )
}

export default ResultPage
