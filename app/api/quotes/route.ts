export const GET = async () => {
  const result = await fetch(
    'https://api.api-ninjas.com/v1/quotes?category=happiness',
    {
      headers: {
        'X-Api-Key': process.env.API_NINJA || '',
      },
    }
  )

  if (!result.ok || result.status !== 200) {
    return Response.error()
  }

  const quote = await result.json()

  if (quote?.length > 0) return Response.json(quote[0])

  return Response.json({})
}
