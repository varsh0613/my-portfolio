"use client"

import { useEffect, useRef } from "react"

const INTERACTIVE_SELECTOR =
  "a,button,[role='button'],input,textarea,select,label,summary,[data-cursor='hover'],[data-cursor='button']"

export function DotCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches

    if (!isFinePointer) return

    const cursorEl = cursorRef.current
    if (!cursorEl) return

    document.body.classList.add("has-dot-cursor")

    let rafId = 0
    let latestX = 0
    let latestY = 0

    const commit = () => {
      rafId = 0
      cursorEl.style.transform = `translate3d(${latestX}px, ${latestY}px, 0) translate(-50%, -50%)`
    }

    const onPointerMove = (e: PointerEvent) => {
      latestX = e.clientX
      latestY = e.clientY
      if (!rafId) rafId = window.requestAnimationFrame(commit)
    }

    const isInteractive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false
      return Boolean(target.closest(INTERACTIVE_SELECTOR))
    }

    const onPointerOver = (e: PointerEvent) => {
      if (isInteractive(e.target)) cursorEl.classList.add("h")
    }

    const onPointerOut = (e: PointerEvent) => {
      if (isInteractive(e.target)) cursorEl.classList.remove("h")
    }

    const onPointerDown = () => {
      cursorEl.classList.add("grab")
      window.setTimeout(() => cursorEl.classList.remove("grab"), 140)
    }

    const onVisibilityChange = () => {
      if (document.hidden) cursorEl.classList.add("hidden")
      else cursorEl.classList.remove("hidden")
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerdown", onPointerDown, { passive: true })
    document.addEventListener("pointerover", onPointerOver, { passive: true })
    document.addEventListener("pointerout", onPointerOut, { passive: true })
    document.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      document.body.classList.remove("has-dot-cursor")
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("pointerover", onPointerOver)
      document.removeEventListener("pointerout", onPointerOut)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return <div id="dotCursor" ref={cursorRef} aria-hidden="true" />
}
