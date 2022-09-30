import Cors from 'cors'
import crypto from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})
/* eslint-disable */
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
/* eslint-disable */

const PrivateKey =
  'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDRsrldZelhYXxIoKGgLaATPajz8jU4Sw/Wwcbq3AQSJ8bDi7u8RmwUkJif1vpZ1ibOl2nViTg4ZMRXo/PbbqWxB1oO9CTN5vXR8B6yYR9/oLhn9/cYq5oZTBVYCG/bcp+rl7gGNpU0zV5iduNd/wA0dytYIueLNOSNUtT5+c/uPIY+s1FGseHPij+htfk2ACXiqvhb6vOKj0KlAR/8OQ1nqmZBBCbgZrHYheTRzNgM8AttefW5iChEXGCAXBRBcK5GtMD9CIXyHW6DvZ9tT9xmnysdGB7MLp716eJR8ZPZB1f2p4RsvF4vQjLU3CkZT66la1+krCeOVVlzOV6awQrnAgMBAAECggEAKEPRJAX1kiVN4AQ4BLG+EvO8BVt0rKJ9IBeFQoOMpI/Osq2aFsTO7AP3ynlVCPr96J1aTQ5UJT/0E3//yxqr5horSMPIbWDzwqQAwO+1RKRvxEbww2Pv6vuY/ZZhJBoWXrR7OXYxoDnu7ak2b04PlANt5zaMj0ZQvHIzQuyc6HmNa8yaAFj1xPCB+EIHRhIPy1IumDEE2gDitHIh+BgAGuN5AJxuUiF74hSOrbGZ2OnfrgSKl2fZKr6+D5rCwdhjUllXusJ0B2cTf79ctEoO2Sf4jSKxXyo8MjtP7xUYExMf39E9uUoPmPQ1/HKlIiycZ7JYQb2FEnQGPI7qT6pCAQKBgQD6vH0SF68fiY7Qvnf3+iQu/wMfOUJdLuGXKc9PMUTWxvPiU6zxTSnFct4+25P31Ks1a9JYM8mTUysqVXkDoGoPt2tgWtfEeHaGjGn86XXktF6Bbj818asA6SJDDXHvk3ggAH12uF9I0zFXQwMYn62iD1VCcxTA7VNISzL0ClAFxwKBgQDWGbAGnCdAm3WD3cpNO/6sPfCOjJ1BV9GKf32GX1arvxLgSLGOI29qSk31qWZ0RI/Zls6pfEFrEEdUJX/nhfIrxJKSMA+UhPsmUmgM4HqydrYhhe6V0K0MoGaUzZdreEVvPEkGfgK9vaLc27jO8/uWq5gmOXLOn9i3JVD6IqhR4QKBgQDfB4Cc8lJE1EAj7/iYrHk5EH7/bBha+NOTeY483A9mmIvhexqvfTq1tkp4USraXOJ531G4QUCBeo4/1s2Q60TMfBPYHpYk3h5X6lhwrl2+tK4HpUA2xKOeaMGgMTpyp5NHrAft7WxcQ/d0rlf3tDlnmQn21JTWU4QsHy/QoceyiwKBgCUjP41l+MkULkY5aqYLChoGhHu1mHGFMiu8AaIVV4tjEXsmIOZu7xyY1v0N7V+tpOYxaperng1cPYMzHgSjD2bYKjSBcbJpfsce9D2HksDyJpWaDdCe6eWOzTxyjRlvO1wYMPKXWRJgmqeE1YHQgIuaKEI5JNkCkSzzpCA/csMBAoGANbXOly7LJYd/UJ0K5uWh1rg5nC5piY1yPUs06ITr0RQB0QtfnM0m2/DfJdQNU9tWec02ySO5iupmebslRINl3canvz33rEza7LSVKIEdQwYvqs3vzDXUvgxjQCf3rIf4kopdSZUGOILnxbyiTFOSCDrOGdpau6j2GCVNs6DGwsE='

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors)

  const signature = crypto.sign('sha256', Buffer.from(req.body.data, 'utf8'), {
    key: crypto.createPrivateKey({
      key: Buffer.from(PrivateKey, 'base64'),
      format: 'der',
      type: 'pkcs8',
    }),
    padding: crypto.constants.RSA_PKCS1_PADDING,
    dsaEncoding: 'ieee-p1363',
  })
  console.log('SIGNATURE', signature.toString('base64'))

  const signatureBase64 = signature.toString('base64')

  res.json({ signature: signatureBase64 })
}
