import * as React from 'react'
import moment from 'moment'
import { NewsProps } from './interface'
import styles from '../styles/articleList.module.scss'

export interface ArticleListProps {
  articles: NewsProps[]
  title?: string
}

const ArticleList: React.FC<ArticleListProps> = ({ articles, title }) => {
  return (
    <section className={styles.article}>
      <div className={styles.article__heading}>
        <h1>{title}</h1>
      </div>
      {articles.map((article, index) => {
        const time = moment(article.publishedAt || moment.now())
          .fromNow()
          .slice(0, 1)
        return (
          <a
            href={article.url}
            key={index.toString()}
            target="_blank"
            rel="noopener"
          >
            <article className={styles.article__main}>
              <div className={styles.article__titleWrap}>
                <p>{article.title}</p>
                <p className={styles.article__time}>
                  {time}
                  時間前
                </p>
              </div>
              {article.urlToImage && (
                <img
                  key={index.toString()}
                  src={article.urlToImage}
                  className={styles.article__img}
                  alt={`${article.title} image`}
                />
              )}
            </article>
          </a>
        )
      })}
    </section>
  )
}

export default ArticleList
