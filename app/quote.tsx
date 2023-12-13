'use client'

import { useState } from 'react'

export const Quote = () => {
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(
    null
  )
  const [isLoading, setIsloading] = useState(false)

  const generateQuote = async () => {
    setIsloading(true)
    fetch('/api/quotes')
      .then((res) => res.json())
      .then((data) => setQuote(data))
      .finally(() => setIsloading(false))
  }

  if (!quote)
    return (
      <button onClick={generateQuote}>
        {isLoading ? 'Generating...' : 'Generate Quote'}
      </button>
    )

  return (
    <>
      <div className='quote-card'>
        <span>&ldquo;{quote?.quote}&ldquo;</span>
        <span className='author'> - {quote?.author}</span>
      </div>
      <button onClick={generateQuote}>
        {isLoading ? 'Generating...' : 'Generate Quote'}
      </button>
    </>
  )
}
