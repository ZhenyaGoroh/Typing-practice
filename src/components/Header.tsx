import React, { useEffect, useRef } from "react"
import s from "../stylesheet/Header.module.scss"

function Header() {
  const separator = useRef<HTMLSpanElement>(null)

  const toggleSeparatorDisplay = () => {
    if (separator.current?.style.display === "block" && separator.current) {
      separator.current.style.display = "none"
      return
    }
    if (separator.current) {
      separator.current.style.display = "block"
    }
  }

  useEffect(() => {
    const cursorBlinking = setInterval(() => {
      toggleSeparatorDisplay()
    }, 500)
  })

  return (
    <div className={s.header}>
      <span className={s.header__logo}>
        <span className={s.header__logo_green}>
          Typin
          <span className={s.header__logo_separator} ref={separator} />
        </span>
        <span>g_practice</span>
      </span>
    </div>
  )
}

export default Header
