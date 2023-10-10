import React, { useContext } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  Grid,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { NewsType } from '../types/NewsType'
import { NewsContext } from '../NewsContext'

const useStyles = makeStyles({
  root: {
    marginTop: 60,
  },
  card: {
    maxWidth: 500,
    margin: 'auto',
    marginBottom: 20,
  },
  media: {
    height: 220,
  },
})

export default function App() {
  const classes = useStyles()
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

  const truncate = (str: string, n: number) => {
    if (str.length <= n) {
      return str
    }
    return str.slice(0, n) + '...'
  }

  React.useEffect(() => {
    fetchNews()
  }, [category, district])

  return (
    <Container className={classes.root}>
      <Grid container spacing={4}>
        {news.map((item: NewsType, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={
                  item.videoUrl
                    ? item.videoUrl.replace('/video/', '/thumbnail/')
                    : item.imageUrl
                }
                title={item.title}
              />

              <CardContent>
                <Typography variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="fade-out"
                >
                  {item.description.length > 100
                    ? truncate(item.description, 250)
                    : ''}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Published on: {item.pubDate}
                </Typography>
              </CardContent>
              <Button
                size="small"
                color="primary"
                href={item.link}
                target="_blank"
              >
                Read More
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
