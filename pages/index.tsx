import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Checkbox, TableBody } from '@mui/material'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { modalText } from '../public/datalist'
import { keys } from '../public/publickeys'
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
  height: 400px;
  padding: 0;
  margin: 0;
  font-size: 30px;
  background-color: #fff;
  transform: translate(-50%, -50%);
`
const LogoArea = styled.img`
  position: fixed;
  right: 68%;
  width: 50px;
  height: 50px;
`

const DataTextArea = styled.div`
  height: 400px;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`
const ButtonArea = styled.div`
  height: 50px;
  background-color: #a0a0a0;
`
const TextNormal = styled.div`
  margin: 3px;
  font-size: 25px;
`

const TextPassword = styled.div<{ num: number }>`
  position: absolute;
  top: ${(p) => (p.num === 1 ? 'default' : p.num === 2 ? '47%' : '37%')};
  left: 27%;
  font-size: 18px;
`
const XText = styled.div`
  position: fixed;
  top: 2.65%;
  left: 90%;
  gap: 0;
  margin: 0;
  font-size: 30px;
  color: #868686;

  &:hover {
    cursor: default;
  }
`
const TitleCircle = styled.div`
  position: absolute;
  top: 4.7%;
  left: 89.9%;
  gap: 0;
  width: 25px;
  height: 25px;
  margin: 0%;
  background: #e7e7e7;
  border-radius: 50%;
`

const OKButton = styled.button`
  width: 100px;
  height: 40px;
  margin-top: 5%;
  margin-right: 0%;
  margin-left: 40%;
  font-size: 22px;
  color: white;
  background-color: #08f;
  border: none;
  border-radius: 0;

  &:hover {
    cursor: pointer;
    background-color: #00a6ff;
  }
`
const OKButton2 = styled.button`
  width: 100px;
  height: 40px;
  margin-top: 6%;
  margin-right: 0%;
  margin-left: 40%;
  font-size: 22px;
  color: white;
  background-color: #08f;
  border: none;
  border-radius: 0;

  &:hover {
    cursor: pointer;
    background-color: #00a6ff;
  }
`
const OKButton3 = styled.button`
  width: 100px;
  height: 40px;
  margin-top: 1%;
  margin-right: 0%;
  margin-left: 40%;
  font-size: 22px;
  color: white;
  background-color: #08f;
  border: none;
  border-radius: 0;

  &:hover {
    cursor: pointer;
    background-color: #00a6ff;
  }
`

const Home: NextPage = () => {
  const localStorageKey = 'Feasy'

  // ページ遷移のstate
  const [firstTime, setFirstTime] = useState(false)
  const [passwordPage, setPasswordPage] = useState(true)

  // 親から受け取る情報
  const [href, setHref] = useState('')
  const [dataList, setDataList] = useState<(keyof Base)[]>([])
  const [noChangeDataList, setNoChangeDataList] = useState([])

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
      // noChangeDataの検証
      if (noChangeDataList) {
        const k = Object.keys(noChangeDataList[0])[0]
        const publicKey = keys[k]
        const key = await crypto.subtle.importKey(
          'spki',
          Buffer.from(publicKey, 'base64'),
          { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-256' } },
          false,
          ['verify']
        )

        const func = noChangeDataList.map((d: { [key: string]: string }) => {
          const jsonData = d[Object.keys(d)[0]]
          const data = JSON.parse(jsonData)
          const verify = crypto.subtle.verify(
            { name: 'RSASSA-PKCS1-v1_5' },
            key,
            Buffer.from(data.signature, 'base64'),
            Buffer.from(data.data, 'utf8')
          )
          return verify
        })

        const verifyList = await Promise.all(func)
        noChangeDataList.map((add: { [key: string]: string }, index) => {
          if (verifyList[index]) {
            setAddData((data) => ({ ...data, ...add }))
          }
        })
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
      // setDataList(e.data)
      setDataList(e.data.list)
      setNoChangeDataList(e.data.sig)
    })
  }, [])

  return (
    <Container>
      <ModalArea>
        <TitleCircle>
          <XText onClick={noPost}>×</XText>
        </TitleCircle>

        {firstTime ? (
          <>
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <LogoArea src="Feasy_logo_only.png" />

              <TextNormal>パスワード登録</TextNormal>
              <TextPassword num={1} />
              <TextField
                margin="normal"
                required
                name="password"

                label="Password"
                id="password"
                type={inputPasswordType}
                defaultValue="パスワード"

                autoComplete="new-password"
                onChange={(event) => setInputPassword1(event.target.value)}
              />
              <TextPassword num={2} />
              <TextField
                margin="normal"
                required
                name="password"
                label="Password"
                id="password"
                type={inputPasswordType}
                defaultValue=""
                autoComplete="new-password"
                onChange={(event) => setInputPassword2(event.target.value)}
              />
              <FormControlLabel
                control={<Checkbox />}
                sx={{ marginRight: 4 }}
                label="パスワードを表示する"
                defaultChecked={false}
                onChange={() => displayPassword(inputPasswordType)}
              />
            </Box>

            <OKButton onClick={register}>登録</OKButton>
          </>
        ) : passwordPage ? (
          <>
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <LogoArea src="Feasy_logo_only.png" />
              <TextNormal>パスワード入力</TextNormal>
              <TextPassword num={3} />
              <TextField
                margin="normal"
                required
                type={inputPasswordType}
                name="password"

                label="Password"
                autoFocus={true}
                autoComplete="current-password"

                onChange={(event) => setPasswordForm(event.target.value)}
                sx={{ marginTop: 7 }}
              />
              <FormControlLabel
                control={<Checkbox />}
                sx={{ marginTop: 0, marginRight: 8 }}
                label="パスワードを表示"
                defaultChecked={false}
                onChange={() => displayPassword(inputPasswordType)}
              />
            </Box>

            <OKButton2 onClick={post}>OK</OKButton2>
          </>
        ) : (
          <DataTextArea>
            <TableContainer component={Paper}>
              <Table aria-label="c">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontSize: '0.6em', fontWeight: 'bold' }}>
                      以下の項目を許可しますか？
                    </TableCell>
                    <TableCell style={{ fontSize: '0.6em', fontWeight: 'bold' }}>
                      入力内容
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataList.map((d) =>
                    modalText[d] && mainData[d] ? (
                      <TableRow key={d}>
                        <TableCell style={{ backgroundColor: '#e8eaf6' }}>{modalText[d]}</TableCell>
                        <TableCell>{mainData[d]}</TableCell>
                      </TableRow>
                    ) : (
                      <TableRow key={d}>
                        <TableCell style={{ backgroundColor: '#e8eaf6' }}>{modalText[d]}</TableCell>
                        <TableCell>
                          {' '}
                          <TextField
                            color="primary"
                            margin="normal"
                            required
                            name="password"
                            label={modalText[d]}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event) => {
                              setAddData({ ...addData, [d]: `${event.target.value}` })
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <ButtonArea>
              <OKButton3 onClick={post}>OK</OKButton3>
            </ButtonArea>
          </DataTextArea>
        )}
      </ModalArea>
    </Container>
  )
}
export default Home
