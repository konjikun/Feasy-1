import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { modalText } from '../public/datalist'
import type { Base } from '../public/type'

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
const TextMini = styled.div`
  font-size: 15px;
`
const TextTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: white;
  text-align: center;
`
const TextPassword = styled.div<{ num: number }>`
  position: fixed;
  top: ${(p) => (p.num === 1 ? 'default' : p.num === 2 ? '47%' : '37%')};
  left: 27%;
  font-size: 18px;
`
const XText = styled.div`
  position: fixed;
  top: 1.5%;
  left: 89.5%;
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
const InputPassword = styled.input`
  position: fixed;
  top: 45%;
  left: 50%;
  width: 250px;
  height: 40px;
  margin: 10px;
  margin-left: 1px;
  font-size: 20px;
  transform: translate(-50%, -50%);
`
const InputPasswordRegister = styled(InputPassword)<{ num: number }>`
  top: ${(p) => (p.num === 1 ? '38%' : '57%')};
  margin: auto;
`
const CheckBoxPassword = styled.input`
  margin-top: 150px;
  margin-right: 10px;
  margin-left: 175px;
  transform: scale(1.2);
`
const Li = styled.li<{ num: number }>`
  margin: 10px;
  margin-bottom: ${(p) => (p.num === 1 ? '10px' : '0')};
  font-size: 19px;
  line-height: 1.5;
  list-style-type: none !important;
  border-bottom: ${(p) => (p.num === 1 ? 'dashed 1px #3509bb' : 'none')};

  ::before {
    position: relative;
    top: -3px;
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 8px;
    content: '';
    background-color: #6d9eeb;
    border-radius: 50%;
  }
`
const InputData = styled.input`
  width: 250px;
  height: 35px;
  margin: 10px;
  margin-top: 0;
  margin-left: 30px;
  font-size: 19px;
  border: solid;
  border-radius: 5px;
`
const InputDataArea = styled.div`
  border-bottom: dashed 1px #3509bb;
`

const Home: NextPage = () => {
  const localStorageKey = 'Feasy'

  // ページ遷移のstate
  const [firstTime, setFirstTime] = useState(false)
  const [passwordPage, setPasswordPage] = useState(true)

  // 親から受け取る情報
  const [href, setHref] = useState('')
  const [dataList, setDataList] = useState<(keyof Base)[]>([])

  // LocalStorageを復号したデータ、追加するデータ
  const [mainData, setMainData] = useState<Base>({})
  const [addData, setAddData] = useState({})

  // パスワード関係のstate
  const [inputPassword1, setInputPassword1] = useState('')
  const [inputPassword2, setInputPassword2] = useState('')
  const [passwordForm, setPasswordForm] = useState('')
  const [password, setPassword] = useState('')

  const [inputPasswordType, setInputPasswordType] = useState('password')

  // AES暗号
  // 鍵生成
  const getKey = async (
    passphrase: string,
    salt: Uint8Array | null = null
  ): Promise<[CryptoKey, Uint8Array]> => {
    const passphrase2 = new TextEncoder().encode(passphrase)
    const digest = await crypto.subtle.digest({ name: 'SHA-256' }, passphrase2)
    const keyMaterial = await crypto.subtle.importKey('raw', digest, { name: 'PBKDF2' }, false, [
      'deriveKey',
    ])
    if (!salt) salt = crypto.getRandomValues(new Uint8Array(16))
    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    )
    return [key, salt]
  }

  // 初期ベクトル固定部96bitを得る関数
  const getFixedField = () => {
    const value = localStorage.getItem('96bitIVFixedField')
    if (value) return Uint8Array.from(JSON.parse(value))
    const value2 = crypto.getRandomValues(new Uint8Array(12))
    localStorage.setItem('96bitIVFixedField', JSON.stringify(Array.from(value2)))
    return value2
  }

  // 初期ベクトル変動部32bitを得る関数
  const getInvocationField = () => {
    const counter = localStorage.getItem('32bitLastCounter')
    let counter2: Uint32Array | null = null
    if (counter) counter2 = Uint32Array.from(JSON.parse(counter))
    else counter2 = new Uint32Array(1)
    counter2[0]++
    localStorage.setItem('32bitLastCounter', JSON.stringify(Array.from(counter2)))
    return counter2
  }

  // 暗号化関数
  const encrypt = async (input: string, passphrase: string) => {
    const [key, salt] = await getKey(passphrase)
    const fixedPart = getFixedField()
    const invocationPart = getInvocationField()
    const iv = Uint8Array.from([...fixedPart, ...new Uint8Array(invocationPart.buffer)])

    const encryptedData: ArrayBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      new TextEncoder().encode(JSON.stringify(input))
    )
    const encryptedDataString: string = Array.from(new Uint8Array(encryptedData), (char) =>
      String.fromCharCode(char)
    ).join('')
    return JSON.stringify([
      Buffer.from(encryptedDataString).toString('base64'),
      Array.from(invocationPart),
      Array.from(salt),
    ])
  }

  // 復号関数
  const decrypt = async (encryptedResult: string, passphrase: string) => {
    const [encryptedData, invocationPart, salt] = JSON.parse(encryptedResult)
    const [key, _] = await getKey(passphrase, Uint8Array.from(salt))
    const invocationPartTypedArray = new Uint32Array(1)
    invocationPartTypedArray[0] = invocationPart
    const iv = Uint8Array.from([
      ...getFixedField(),
      ...new Uint8Array(invocationPartTypedArray.buffer),
    ])
    const encryptedDataString = Buffer.from(encryptedData, 'base64').toString()
    const encryptedDataBinary = Uint8Array.from(encryptedDataString.split(''), (char) =>
      char.charCodeAt(0)
    )
    const decryptedDataBinary: ArrayBufferLike = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encryptedDataBinary
    )
    const decryptedDataString = new TextDecoder().decode(new Uint8Array(decryptedDataBinary))
    return JSON.parse(decryptedDataString)
  }

  // Local Storageからデータを復号し、返す関数
  const getData = async (password: string) => {
    const localStorageData = localStorage.getItem(localStorageKey)
    if (localStorageData) {
      const decrypted = await decrypt(localStorageData, password).catch(() => {
        alert('パスワードが間違っています')
        setPasswordForm('')
        return false
      })
      if (decrypted) {
        return decrypted
      }
    }
  }

  // checkboxでパスワードを表示する関数
  const displayPassword = (state: string) => {
    if (state === 'password') {
      setInputPasswordType('text')
    } else {
      setInputPasswordType('password')
    }
  }

  // パスワード登録
  const register = async () => {
    if (inputPassword1 && inputPassword1 !== inputPassword2) {
      alert('同じパスワードを入力してください')
      const InputPasswordElement = document.getElementById('input-password-register2')
      if (InputPasswordElement) {
        ;(InputPasswordElement as HTMLInputElement).value = ''
      }
    } else {
      const firstData = await encrypt('{}', inputPassword1)
      localStorage.setItem(localStorageKey, firstData)
      setFirstTime(false)
    }
  }

  // OKボタンをを押した時
  const post = async () => {
    if (passwordPage) {
      if (!passwordForm) return
      const decrypted = await getData(passwordForm)
      if (decrypted) {
        setMainData(JSON.parse(decrypted))
        setPassword(passwordForm)
        setPasswordPage(false)
      }
      return
    } else {
      setMainData({ ...mainData, ...addData })
      const newDecrypted = { ...mainData, ...addData }

      const getObject: Base = newDecrypted
      const postData: Base = {}
      dataList.map((d) => {
        if (getObject[`${d}`]) {
          postData[d] = getObject[`${d}`]
        }
      })

      const encrypted = await encrypt(JSON.stringify(newDecrypted), password)
      localStorage.setItem(localStorageKey, encrypted)

      parent.postMessage({ type: 'storage', val: postData }, href)
    }
  }

  // 閉じるボタンをを押した時
  const noPost = () => {
    parent.postMessage(null, href)
  }

  useEffect(() => {
    // 親サイトにiframeが動作確認用のpostMessage
    parent.postMessage({ type: 'loaded' }, '*')
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
            <MainArea>
              <TextNormal>パスワード登録</TextNormal>
              <TextPassword num={1}>パスワード</TextPassword>
              <InputPasswordRegister
                num={1}
                type={inputPasswordType}
                name="password"
                defaultValue=""
                autoFocus={true}
                autoComplete="new-password"
                onChange={(event) => setInputPassword1(event.target.value)}
              />
              <br />
              <TextPassword num={2}>確認</TextPassword>
              <InputPasswordRegister
                num={2}
                type={inputPasswordType}
                name="password"
                defaultValue=""
                autoComplete="new-password"
                onChange={(event) => setInputPassword2(event.target.value)}
              />
              <TextMini>
                <CheckBoxPassword
                  type="checkbox"
                  defaultChecked={false}
                  onChange={() => displayPassword(inputPasswordType)}
                />
                パスワードを表示します
              </TextMini>
            </MainArea>

            <ButtonArea>
              <NOButton onClick={noPost}>閉じる</NOButton>
              <OKButton onClick={register}>登録</OKButton>
            </ButtonArea>
          </>
        ) : passwordPage ? (
          <>
            <MainArea>
              <TextNormal>パスワード入力</TextNormal>
              <TextPassword num={3}>パスワード</TextPassword>
              <InputPassword
                type={inputPasswordType}
                name="password"
                autoFocus={true}
                onChange={(event) => setPasswordForm(event.target.value)}
              />
              <TextMini>
                <CheckBoxPassword
                  type="checkbox"
                  defaultChecked={false}
                  onChange={() => displayPassword(inputPasswordType)}
                />
                パスワードを表示します
              </TextMini>
            </MainArea>
            <ButtonArea>
              <NOButton onClick={noPost}>閉じる</NOButton>
              <OKButton onClick={post}>OK</OKButton>
            </ButtonArea>
          </>
        ) : (
          <DataTextArea>
            <TextNormal>以下の項目を許可しますか？</TextNormal>
            <TextMini>（初めての項目は記入してください）</TextMini>
            {dataList.map((d) =>
              modalText[d] && mainData[d] ? (
                <Li key={d} num={1}>
                  {modalText[d]}
                </Li>
              ) : (
                <InputDataArea>
                  <Li num={2}>{modalText[d]}</Li>
                  <InputData
                    onChange={(event) => {
                      setAddData({ ...addData, [d]: `${event.target.value}` })
                    }}
                  />
                </InputDataArea>
              )
            )}
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
