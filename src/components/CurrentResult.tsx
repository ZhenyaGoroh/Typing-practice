import React from "react"
import { Link } from "react-router-dom"
import { useStore } from "../store/store"
import s from "../stylesheet/CurrentResult.module.scss"

interface IProps {
  wpm: number
  seconds: number
  minutes: number
  mistakes: number
}

function CurrentResult({ wpm, seconds, minutes, mistakes }: IProps) {
  const { toggleResultStatus } = useStore()
  return (
    <div className={s.wrapper}>
      <div className={s.result}>
        <div className={s.result__results}>
          <div className={`${s.results__res} ${s.results__wpm}`}>{wpm}</div>
          <span className={s.vr} />
          <div className={`${s.results__res} ${s.results__time}`}>
            {minutes > 9 ? minutes : `0${minutes}`}:
            {seconds > 9 ? seconds : `0${seconds}`}
          </div>
          <span className={s.vr} />
          <div className={`${s.results__res} ${s.results__mistakes}`}>
            {mistakes}
          </div>
        </div>
        <div className={s.result__links}>
          <Link
            to="/"
            className={s.links__link}
            onClick={() => toggleResultStatus()}
          >
            Home
          </Link>
          <Link
            to="/results"
            className={s.links__link}
            onClick={() => toggleResultStatus()}
          >
            Results
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CurrentResult
