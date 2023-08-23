import styled from "@emotion/styled"

export const MainContainer = styled('main')`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  @media (max-width: 780px) {
    flex-direction: column;
  }
`

export const ImageContainer = styled('div')`
  width: 60vw;
  height: 100vh;
  position: relative;

  @media (max-width: 780px) {
    width: 100vw;
    height: 10vh;
  }
`

export const ContentContainer = styled('div')`
  width: 40vw;
  height: 100vh;
  max-height: 100vh;
  padding-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 780px) {
    width: 100vw;
    height: 90vh;
  }
`