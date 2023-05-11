import React from "react"
import { v4 as uuidv4 } from "uuid"
import { Link } from "react-router-dom"
import s from "../stylesheet/Results.module.scss"
import { useResults } from "../store/results"
import Result from "../components/Result"

function Results() {
  const { results } = useResults()

  return (
    <div className={s.wrapper}>
      {results.length > 0 ? (
        <div className={s.table}>
          <div className={s.table__titles}>
            <span className={s.titles__title}>Order</span>
            <span className="vr" />
            <span className={s.titles__title}>WPM</span>
            <span className="vr" />
            <span className={s.titles__title}>Time</span>
            <span className="vr" />
            <span className={s.titles__title}>Mistakes</span>
          </div>
          <div className={s.table__results}>
            {results.map((result, index) => {
              const resultState: {
                id: string
                wpm: number
                seconds: number
                minutes: number
                mistakes: number
                text: string
              } = {
                id: result.id,
                wpm: result.wpm,
                seconds: result.seconds,
                minutes: result.minutes,
                mistakes: result.mistakes,
                text: result.text,
              }
              return (
                <Link
                  className={s.link}
                  key={uuidv4()}
                  to={`/results/${result.text.split(" ")[0]}…`}
                  state={resultState}
                >
                  <Result
                    order={index + 1}
                    wpm={result.wpm}
                    seconds={result.seconds}
                    minutes={result.minutes}
                    mistakes={result.mistakes}
                  />
                </Link>
              )
            })}
          </div>
        </div>
      ) : (
        <div className={s.empty}>
          Looks like you haven&apos;t typed anything yet.
        </div>
      )}
      <Link to="/" className={s.table__link}>
        Home
      </Link>
    </div>
  )
}

export default Results
