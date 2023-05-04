import React from "react"
import s from "../stylesheet/Results.module.scss"
import { useResults } from "../store/results"

function Results() {
  const { results } = useResults()
  return (
    <div className={s.wrapper}>
      <div className={s.table}>
        <div className={s.table__titles}>
          <span className={s.titles__title}>Order</span>
          <span className="vrs" />
          <span className={s.titles__title}>WPM</span>
          <span className="vrs" />
          <span className={s.titles__title}>Time</span>
          <span className="vrs" />
          <span className={s.titles__title}>Mistakes</span>
        </div>
      </div>
    </div>
  )
}

export default Results
