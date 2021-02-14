import Link from 'next/link'
import styles from '../styles/nav.module.scss'
import Image from 'next/image'

const topics = [
  {
    icon: '01',
    path: '/',
    title: 'Top stories',
  },
  {
    icon: '03',
    path: '/topics/business',
    title: 'Business',
  },
  {
    icon: '04',
    path: '/topics/technology',
    title: 'Technology',
  },
  {
    icon: '05',
    path: '/topics/entertainment',
    title: 'Entertainment',
  },
  {
    icon: '06',
    path: '/topics/sports',
    title: 'Sports',
  },
]

const Nav: React.FC = () => {
  return (
    <nav className={styles.container}>
      <ul className={styles.contents}>
        {topics.map(({ path, icon, title }, index) => {
          return (
            <li key={index.toString()}>
              <Link href={`${path}`}>
                <a>
                  <span>
                    <Image
                      src={`/img/nav${icon}.png`}
                      alt={`${title} icon`}
                      loading="eager"
                      width={33}
                      height={33}
                      priority
                    />
                  </span>
                  <span>{title}</span>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Nav
