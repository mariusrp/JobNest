import { useEffect, useState } from 'react'
import io from 'socket.io-client'

export default function Practice() {
  const [data, setData] = useState<any[]>([])
  const url = 'https://www.vg.no/'

  useEffect(() => {
    const socket = io('http://127.0.0.1:5001')
    socket.on('new summary', (summary) => {
      console.log('Received new summary:', summary) // Log received summary
      setData((prevData) => [...prevData, summary])
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  async function getArticleTitles(url: string) {
    try {
      const response = await fetch(
        `http://127.0.0.1:5001/scrape?url=${encodeURIComponent(url)}`
      )
      if (response.ok) {
        const jsonData = await response.json()
        if (jsonData.summaries) {
          setData(jsonData.summaries) // Set the summaries array to data
        } else {
          console.error('Unexpected format:', jsonData)
        }
      } else {
        console.error('Failed to fetch:', response.statusText)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <h1>Practice</h1>
      <a href="#" onClick={() => getArticleTitles(url)}>
        Try me!
      </a>
      {data.map((summary, index) => (
        <pre key={index}>{JSON.stringify(summary, null, 2)}</pre>
      ))}
    </div>
  )
}
