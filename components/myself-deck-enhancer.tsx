"use client"

import { useEffect } from "react"

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function hashString(input: string) {
  let hash = 2166136261
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function randFrom(rng: () => number, min: number, max: number) {
  return rng() * (max - min) + min
}

function layoutStack(cards: HTMLElement[]) {
  const total = cards.length
  cards.forEach((card, index) => {
    const depth = total - index
    card.style.zIndex = String(10 + index)
    card.style.setProperty("--x", `${Math.round(rand(-6, 6) + (depth - 1) * 2)}px`)
    card.style.setProperty("--y", `${Math.round(rand(-6, 6) + (depth - 1) * 2)}px`)
    card.style.setProperty("--r", `${rand(-6, 6).toFixed(2)}deg`)
  })
}

function layoutEventStack(stack: HTMLElement) {
  const cards = Array.from(stack.querySelectorAll<HTMLElement>("[data-polaroid]"))
  const total = cards.length
  if (total === 0) return

  const seedKey = stack.getAttribute("data-event") ?? stack.id ?? "event-stack"
  const rng = mulberry32(hashString(seedKey) ^ total)

  cards.forEach((card, index) => {
    const isTop = index === 0
    const offset = index * 8

    const rotation = randFrom(rng, -5.5, 5.5)
    const shiftX = isTop ? 0 : randFrom(rng, -12, 12)
    const shiftY = isTop ? 0 : randFrom(rng, -10, 10)

    card.style.zIndex = String(100 - index)
    card.style.setProperty("--x", `${Math.round(shiftX)}px`)
    card.style.setProperty("--y", `${Math.round(offset + shiftY)}px`)
    card.style.setProperty("--r", `${rotation.toFixed(2)}deg`)
    card.style.opacity = isTop ? "1" : "0.7"
  })
}

export function MyselfDeckEnhancer() {
  useEffect(() => {
    const stack = document.getElementById("myselfDeck")
    const hasMyself = Boolean(stack)

    const refreshMyself = () => {
      if (!stack) return
      const cards = Array.from(stack.querySelectorAll<HTMLElement>("[data-polaroid]"))
      layoutStack(cards)
    }

    const refreshEvents = () => {
      const eventStacks = Array.from(document.querySelectorAll<HTMLElement>(".event-stack"))
      eventStacks.forEach(layoutEventStack)
    }

    if (hasMyself) refreshMyself()
    refreshEvents()

    const onShuffleClick = (e: Event) => {
      if (!stack) return
      const target = e.target as HTMLElement | null
      if (!target) return
      if (!target.closest('[data-action="shuffle"]')) return

      const last = stack.lastElementChild
      const first = stack.firstElementChild
      if (!last || !first || last === first) return
      stack.insertBefore(last, first)
      refreshMyself()
    }

    const onCardClick = (e: Event) => {
      if (!stack) return
      const target = e.target as HTMLElement | null
      if (!target) return
      const card = target.closest<HTMLElement>("[data-polaroid]")
      if (!card) return
      e.preventDefault()
      stack.appendChild(card)
      refreshMyself()
    }

    const onEventStackClick = (e: Event) => {
      const eventTarget = e.target as HTMLElement | null
      if (!eventTarget) return

      const clickedStack = eventTarget.closest<HTMLElement>(".event-stack")
      if (!clickedStack) return

      const clickedCard = eventTarget.closest<HTMLElement>("[data-polaroid]")
      if (!clickedCard) return

      const mouseEvent = e as MouseEvent
      if (mouseEvent.metaKey || mouseEvent.ctrlKey || mouseEvent.shiftKey || mouseEvent.altKey) return

      e.preventDefault()

      const first = clickedStack.firstElementChild
      if (first && first instanceof HTMLElement) {
        clickedStack.appendChild(first)
        layoutEventStack(clickedStack)
      }
    }

    document.addEventListener("click", onShuffleClick)
    document.addEventListener("click", onEventStackClick)
    if (stack) stack.addEventListener("click", onCardClick)
    const onResize = () => {
      refreshMyself()
      refreshEvents()
    }

    window.addEventListener("resize", onResize)

    return () => {
      document.removeEventListener("click", onShuffleClick)
      document.removeEventListener("click", onEventStackClick)
      if (stack) stack.removeEventListener("click", onCardClick)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return null
}
