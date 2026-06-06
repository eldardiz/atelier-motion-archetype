"use client"

import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"

interface Props {
  text: string
  className?: string
  style?: CSSProperties
}

export default function AnimatedParagraph({ text, className, style }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    let st: { kill: () => void } | undefined
    let mounted = true

    async function init() {
      const { default: gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      if (!mounted || !ref.current) return
      gsap.registerPlugin(ScrollTrigger)

      const chars = ref.current.querySelectorAll<HTMLElement>(".ap-char")
      gsap.set(chars, { opacity: 0.15 })

      st = ScrollTrigger.create({
        trigger: ref.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        onUpdate(self) {
          const total = chars.length
          chars.forEach((char, i) => {
            const threshold = i / total
            const progress = Math.max(0, Math.min(1, (self.progress - threshold * 0.7) / 0.3))
            char.style.opacity = String(0.15 + progress * 0.85)
          })
        },
      })
    }

    init()
    return () => {
      mounted = false
      st?.kill()
    }
  }, [])

  return (
    <p ref={ref} className={className} style={style}>
      {[...text].map((char, i) => (
        <span
          key={i}
          className="ap-char"
          style={{ display: "inline", whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </span>
      ))}
    </p>
  )
}
