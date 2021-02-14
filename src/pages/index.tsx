import * as React from 'react'
import Head from 'next/head'
import ArticleList from '../components/ArticleList'
import Nav from '../components/Nav'
import Layout from '../components/Layout'
import PickUp from '../components/PickUp'
import WeatherWidget from '../components/WeatherWidget'
import styles from '../styles/Home.module.scss'

export default function Home({
  topArticles,
  weatherNews,
  pickupArticles,
  covidArticles,
}) {
  const [isNavOpen, setIsNavOpen] = React.useState(false)

  const handleNav = React.useCallback(() => {
    const width = screen.width
    if (width <= 768) {
      setIsNavOpen(!isNavOpen)
    }
  }, [isNavOpen])

  React.useEffect(() => {
    const width = screen.width
    if (width >= 1024) {
      setIsNavOpen(true)
    }
  }, [])

  return (
    <Layout onClick={handleNav}>
      <Head>
        <title>Today's News</title>
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav}>{isNavOpen && <Nav />}</div>
        <div className={styles.blank} />
        <div className={styles.main}>
          <ArticleList title="Top" articles={topArticles} />
          <ArticleList title="Covid-19" articles={covidArticles} />
        </div>
        <div className={styles.aside}>
          <WeatherWidget weatherNews={weatherNews} />
          <PickUp articles={pickupArticles} />
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  // NewsAPIのトップ記事の情報を取得
  const pageSize = 10 //取得する記事の数
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
  )
  const topJson = await topRes.json()
  const topArticles = topJson?.articles

  // OpenWeatherMapの天気の情報を取得
  const lat = 35.4122 // 取得したい地域の緯度と経度(今回は東京)
  const lon = 139.413
  const exclude = 'hourly,minutely' // 取得しない情報(1時間ごとの天気情報と1分間ごとの天気情報)
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=${exclude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
  )
  const weatherJson = await weatherRes.json()
  const weatherNews = weatherJson

  // NewsAPIのピックアップ記事の情報を取得
  const keyword = 'japan' // キーワードで検索(ソフトウェア)
  const sortBy = 'popularity' // 表示順位(人気順)
  const pickupPageSize = 5 // ページサイズ(5)
  const pickupRes = await fetch(
    `https://newsapi.org/v2/everything?q=${keyword}&language=jp&sortBy=${sortBy}&pageSize=${pickupPageSize}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
  )
  const pickupJson = await pickupRes.json()
  const pickupArticles = pickupJson?.articles

  // コロナに関する記事の情報を取得
  const covidRes = await fetch(
    `https://newsapi.org/v2/everything?q=covid19&language=jp&sortBy=${sortBy}&pageSize=5&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
  )
  const covidJson = await covidRes.json()
  const covidArticles = covidJson?.articles

  return {
    props: {
      topArticles,
      weatherNews,
      pickupArticles,
      covidArticles,
    },
    revalidate: 60,
  }
}
