'use client'

import { FormEvent, useState } from 'react'

// Sesta newsletter — slice 08.
// Dusty olive-brown surface. Left: italic display headline.
// Right: explanatory body + email input + Subscribe button.

export default function NewsletterSection() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="sesta-newsletter" id="contact">
      <div className="sesta-newsletter__inner">
        <h2 className="sesta-newsletter__display">
          <em>Subscribe to</em><br />
          <em>our</em> <span className="roman">newsletter</span>
        </h2>

        <div className="sesta-newsletter__right">
          <p className="sesta-newsletter__body">
            By subscribing to the newsletter, you will always be up to date. Find out about new
            products, events, and specials.
          </p>
          <form onSubmit={handleSubmit} className="sesta-newsletter__form">
            <input
              className="sesta-newsletter__input"
              type="email"
              placeholder="E-Mail address"
              aria-label="E-Mail address"
              required
            />
            <button type="submit" className="sesta-newsletter__submit">
              {sent ? 'Thanks' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
