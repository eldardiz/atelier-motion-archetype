"use client"

import React, { useEffect, useRef } from "react"
import type { CSSProperties } from "react"

type Tag = "h1" | "h2" | "h3" | "p"

interface Props {
  text: string
  as?: Tag
  className?: string
  style?: CSSProperties
}

export default function WordsPullUp({ text, as: Tag = "h2", className, style }: Props) {
  const containerRef = useRef<HTMLElement>(null)

  const lines = text.split("\n")

  useEffect(() => {
    let st: { kill: () => void } | undefined
    let mounted = true

    async function init() {
      const { default: gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      if (!mounted || !containerRef.current) return
      gsap.registerPlugin(ScrollTrigger)

      const wordEls = containerRef.current.querySelectorAll<HTMLElement>(".wpu-inner")
      gsap.set(wordEls, { y: 30, opacity: 0 })

      st = gsap.to(wordEls, {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      })
    }

    init()
    return () => {
      mounted = false
      st?.kill()
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tagRef = containerRef as React.RefObject<any>

  return (
    <Tag ref={tagRef} className={className} style={style}>
      {lines.map((line, li) => (
        <span key={li}>
          {line.split(" ").map((word, wi, arr) => (
            <span
              key={wi}
              className="wpu-clip"
              style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
            >
              <span className="wpu-inner" style={{ display: "inline-block" }}>
                {word}
              </span>
              {wi < arr.length - 1 ? " " : ""}
            </span>
          ))}
          {li < lines.length - 1 && <br />}
        </span>
      ))}
    </Tag>
  )
}
