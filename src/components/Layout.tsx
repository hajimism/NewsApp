import * as React from 'react'
import Header, { HeaderProps } from './Header'

const Layout: React.FC<HeaderProps> = ({ children, onClick }) => {
  return (
    <>
      <Header onClick={onClick} />
      <main className="main-container">{children}</main>
    </>
  )
}

export default Layout
