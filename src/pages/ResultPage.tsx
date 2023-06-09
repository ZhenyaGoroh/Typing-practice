import React from "react"
import { Link, useLocation } from "react-router-dom"
import ReactTextareaAutosize from "react-textarea-autosize"
import s from "../stylesheet/ResultPage.module.scss"
import { useStore } from "../store/store"
import { useResults } from "../store/results"

function ResultPage() {
  const location = useLocation()
  const { id, wpm, seconds, minutes, mistakes, text } = location.state
  const { setText } = useStore()
  const { results, removeResult } = useResults()

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
        <div className={s.result__btns}>
          <Link
            onClick={() => {
              setText(text)
              removeResult(id)
              localStorage.setItem("results", JSON.stringify(results))
            }}
            className={s.btns__btn}
            to="/practice"
          >
            Type again
          </Link>
          <Link
            to="/results"
            onClick={() => {
              removeResult(id)
              localStorage.setItem("results", JSON.stringify(results))
            }}
            className={`${s.btns__btn} ${s.btns__btn_remove}`}
            type="button"
          >
            Remove result
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResultPage
