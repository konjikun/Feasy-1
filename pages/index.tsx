import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #000000a8;
`
const ModalArea = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 550px;
  padding: 0;
  margin: 10px;
  font-size: 30px;
  background-color: #ececec;
  transform: translate(-50%, -50%);
`
const TitleArea = styled.div`
  padding: 14px;
  margin-top: 0;
  background-color: #6d9eeb;
`
const MainArea = styled.div`
  height: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
`
const DataTextArea = styled.div`
  height: 400px;
  overflow-x: hidden;
  overflow-y: scroll;
`
const ButtonArea = styled.div`
  height: 100px;
  background-color: #a0a0a0;
`
const TextNormal = styled.div`
  margin: 10px;
  font-size: 25px;
`
const TextTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: white;
  text-align: center;
`
const XText = styled.div`
  position: fixed;
  top: 2%;
  left: 90%;
  margin: 10px;
  font-size: 30px;
  color: #3c78d8;

  &:hover {
    cursor: default;
  }
`
const TitleCircle = styled.div`
  position: fixed;
  top: 5.7%;
  left: 91.2%;
  width: 25px;
  height: 25px;
  background: #c9daf8;
  border-radius: 50%;
`
const NOButton = styled.button`
  width: 125px;
  height: 50px;
  margin: 25px;
  margin-left: 115px;
  font-size: 30px;
  border: solid;
  border-radius: 7px;
`
const OKButton = styled.button`
  width: 125px;
  height: 50px;
  margin-left: 50px;
  font-size: 30px;
  color: white;
  background-color: #08f;
  border: none;
  border-radius: 7px;

  &:hover {
    cursor: pointer;
    background-color: #00a6ff;
  }
`

type Base = {
  lastname_furigana?: string
  firstname_furigana?: string
  lastname_kanji?: string
  firstname_kanji?: string
}

const Home: NextPage = () => {
  const localStorageKey = 'Feasy'

  const [firstTime, setFirstTime] = useState(false)
  const [passwordPage, setPasswordPage] = useState(true)

  // 親から受け取る情報
  const [href, setHref] = useState('')
  const [dataList, setDataList] = useState<(keyof Base)[]>([])

  const post = () => {
    if (passwordPage) {
      setPasswordPage(false)
    }
    // parent.postMessage(data, href)
  }

  const noPost = () => {
    parent.postMessage(null, href)
  }

  useEffect(() => {
    // 親サイトにiframeが動作確認用のpostMessage
    parent.postMessage('loaded', '*')
  }, [])

  useEffect(() => {
    if (!localStorage.getItem(localStorageKey)) {
      setFirstTime(true)
    }
    window.addEventListener('message', (e) => {
      setHref(e.origin)
      setDataList(e.data)
    })
  }, [])

  return (
    <Container>
      <ModalArea>
        <TitleArea>
          <TextTitle>Feasyで入力</TextTitle>
          <TitleCircle>
            <XText onClick={noPost}>×</XText>
          </TitleCircle>
        </TitleArea>
        {firstTime ? (
          <>
            <MainArea />
            <ButtonArea>
              <NOButton onClick={noPost}>閉じる</NOButton>
              <OKButton onClick={post}>OK</OKButton>
            </ButtonArea>
          </>
        ) : passwordPage ? (
          <>
            <MainArea />
            <ButtonArea>
              <NOButton onClick={noPost}>閉じる</NOButton>
              <OKButton onClick={post}>OK</OKButton>
            </ButtonArea>
          </>
        ) : (
          <DataTextArea>
            <ButtonArea>
              <NOButton onClick={noPost}>閉じる</NOButton>
              <OKButton onClick={post}>OK</OKButton>
            </ButtonArea>
          </DataTextArea>
        )}
      </ModalArea>
    </Container>
  )
}

export default Home
