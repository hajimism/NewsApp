import * as React from 'react'
import styles from '../styles/header.module.scss'
import Image from 'next/image'
import Link from 'next/link'

export interface HeaderProps {
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
}

const Header: React.FC<HeaderProps> = ({ onClick }) => (
  <section className={styles.container}>
    <header className={styles.header}>
      <div className={styles.header__icon} onClick={onClick}>
        <Image
          src="/img/menu.png"
          alt="menu icon"
          loading="eager"
          width={35}
          height={35}
          priority
        />
      </div>
      <h1 style={{ letterSpacing: '1px', textAlign: 'left' }}>
        <Link href="/">
          <a>
            <span style={{ fontWeight: 100 }}>Today's News</span>
          </a>
        </Link>
      </h1>
    </header>
  </section>
)

export const getStaticProps = async () => {
  // NewsAPIのトップ記事の情報を取得
  const pageSize = 10 // 取得したい記事の数
  const topRes = await fetch(
    `https://newsapi.org/v2/top-headlines?country=jp&pageSize=${pageSize}&apiKey=あなたのNewsAPIのAPIKey`
  )
  const topJson = await topRes.json()
  const topArticles = topJson?.articles

  return {
    props: {
      topArticles,
    },
    revalidate: 60 * 10,
  }
}
export default Header
