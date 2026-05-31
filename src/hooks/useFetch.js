import { useEffect, useState } from 'react'

export function useFetch(fetcher) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    Promise.resolve(fetcher())
      .then((result) => {
        if (active) setData(result)
      })
      .catch((fetchError) => {
        if (active) setError(fetchError)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [fetcher])

  return { data, error, loading }
}
