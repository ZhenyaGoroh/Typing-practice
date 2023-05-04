import React from "react"
import s from "../stylesheet/Result.module.scss"

interface IProps {
  order: number
  wpm: number
  seconds: number
  minutes: number
  mistakes: number
}

function Result({ order, wpm, seconds, minutes, mistakes }: IProps) {
  return (
    <div className={s.result}>
      <span className={s.result__result}>{order}</span>
      <span className="vr" />
      <span className={s.result__result}>{wpm}</span>
      <span className="vr" />
      <span className={s.result__result}>
        {minutes > 9 ? minutes : `0${minutes}`}:
        {seconds > 9 ? seconds : `0${seconds}`}
      </span>
      <span className="vr" />
      <span className={s.result__result}>{mistakes}</span>
    </div>
  )
}

export default Result
