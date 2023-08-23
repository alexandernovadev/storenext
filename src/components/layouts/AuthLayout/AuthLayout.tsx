import Head from 'next/head'
import imageBackLogin from '../../../assets/ImageBackLogin.jpg'
import Image from 'next/image'
import {
  ContentContainer,
  ImageContainer,
  MainContainer,
} from './AuthLayout.style'
import { Props } from './AuthLayot.type'

export const AuthLayout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <MainContainer>
        <ImageContainer>
          <Image
            src={imageBackLogin}
            layout="fill"
            objectFit="cover"
            alt="logo"
          />
        </ImageContainer>
        <ContentContainer>{children}</ContentContainer>
      </MainContainer>
    </>
  )
}
