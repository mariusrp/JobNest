import React from 'react'
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

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  card: {
    maxWidth: 345,
    margin: 'auto',
    marginBottom: 20,
  },
  media: {
    height: 140,
  },
})

export default function Rss() {
  const classes = useStyles()
  const [news, setNews] = React.useState([])

  const url = 'http://localhost:5109/api/rss/fetch-rss/toppsaker'

  const fetchNews = async () => {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    setNews(data)
  }

  return (
    <Container className={classes.root}>
      <Button variant="contained" color="primary" onClick={fetchNews}>
        Get News
      </Button>
      <Grid container spacing={4}>
        {news.map((item: any, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={item.imageUrl}
                title={item.title}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
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
