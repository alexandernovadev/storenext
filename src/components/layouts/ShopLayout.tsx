import Head from 'next/head'
import React from 'react'
import { Navbar, SideMenu } from '../ui'

interface Props {
  title: string
  description: string
  imageFullUlr?: string
  children: JSX.Element | JSX.Element[]
}

export const ShopLayout = ({
  title,
  description,
  imageFullUlr,
  children,
}: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        {imageFullUlr && <meta name="og:image" content={imageFullUlr} />}
      </Head>

      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main
        style={{
          margin: '80px auto',
          maxWidth: '1080px',
          padding: '0px 30px',
        }}
      >
        {children}
      </main>

      {/* <footer>Here footer</footer> */}
    </>
  )
}
