import React, { useContext } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
} from '@mui/material'
import { NewsType } from '../types/NewsType'
import { NewsContext } from '../NewsContext'
import Subheader from '../components/SubHeader'

export default function App() {
  const [news, setNews] = React.useState([])
  const { state } = useContext(NewsContext)

  const { category, district } = state

  const fetchNews = async () => {
    let url = `http://localhost:5109/api/rss/fetch-rss/${category}/toppsaker`
    if (district === 'norge') {
      url = `http://localhost:5109/api/rss/fetch-rss/${category}/toppsaker`
    }
    if (category === 'alle') {
      url = `http://localhost:5109/api/rss/fetch-rss/${district}/toppsaker`
    }
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    setNews(data)
  }

  const truncateText = (text: string, maxWords: number) => {
    const words = text.split(' ')
    return (
      words.slice(0, maxWords).join(' ') +
      (words.length > maxWords ? '...' : '')
    )
  }

  const getMaxWords = (xs: number) => {
    switch (xs) {
      case 12:
        return 30 // Set the maximum word limit for full-width items
      case 6:
        return 20 // Set the maximum word limit for half-width items
      case 4:
        return 10 // Set the maximum word limit for one-third-width items
      default:
        return 10
    }
  }

  const getFontSize = (textLength: number) => {
    if (textLength <= 8) {
      return 40
    } else {
      return 30
    }
  }

  const handleNewsClick = (item: NewsType) => {
    window.open(item.link, '_blank')
  }

  React.useEffect(() => {
    fetchNews()
  }, [category, district])

  const layouts = [
    [12], // one full-width item
    [6, 6], // two half-width items
    [4, 4, 4], // three one-third-width items
  ]

  let layoutIndex = 0
  let layout = layouts[layoutIndex]
  let currentLayoutItem = 0

  return (
    <div>
      <Subheader />
      <Container>
        <Grid container spacing={2}>
          {news.map((item: NewsType, index: number) => {
            const xs = layout[currentLayoutItem]
            const maxWords = getMaxWords(xs)
            const fontSize = getFontSize(item.title.split(' ').length)
            const imageHeight = xs === 12 ? 500 : 400
            currentLayoutItem += 1
            if (currentLayoutItem >= layout.length) {
              currentLayoutItem = 0
              layoutIndex = (layoutIndex + 1) % layouts.length
              layout = layouts[layoutIndex]
            }

            return (
              <Grid item xs={12} md={xs} key={index}>
                <Card
                  sx={{
                    marginX: 'auto',
                    marginY: 2,
                    backgroundColor: 'background.paper',
                    padding: 2,
                    height: '100%',
                    border: 'none',
                    boxShadow: 0,
                    borderRadius: 8,
                    ':hover': {
                      boxShadow: 4,

                      cursor: 'pointer',
                      '& img': {
                        filter: 'brightness(1.1)',
                        transition: 'filter 0.3s ease-in-out',
                      },
                    },
                  }}
                  onClick={() => handleNewsClick(item)}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: imageHeight,
                      borderRadius: 8,
                      objectFit: 'cover',
                    }}
                    image={
                      item.videoUrl
                        ? item.videoUrl.replace('/video/', '/thumbnail/')
                        : item.imageUrl
                    }
                    title={item.title}
                  />
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ mb: 2, fontSize: fontSize }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{ mb: 2, fontSize: 20 }}
                    >
                      {truncateText(item.description, maxWords)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Published on: {item.pubDate}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </div>
  )
}
