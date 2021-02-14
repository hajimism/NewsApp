import * as React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ArticleList from '../../components/ArticleList'
import Nav from '../../components/Nav'
import Layout from '../../components/Layout'
import styles from '../../styles/Home.module.scss'

const Topic = ({ topicArticles, title }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

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
        <title>Today's News - {title.toUpperCase()}</title>
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav}>{isNavOpen && <Nav />}</div>
        <div className={styles.blank} />
        <div className={styles.main} style={{ marginRight: '10%' }}>
          <ArticleList title={title} articles={topicArticles} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const topicRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&category=${params.id}&country=jp&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
  )
  const topicJson = await topicRes.json()
  const topicArticles = await topicJson.articles

  const title = params.id

  return {
    props: { topicArticles, title },
    revalidate: 60 * 10,
  }
}

export default Topic
