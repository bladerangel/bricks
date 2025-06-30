require("dotenv").config()
const express = require("express")
const app = express()
const axios = require("axios")
const qs = require("qs")

app.get("/payment-initiation", async (request, response) => {
    try {
        const payload = {
            data: {
                loggedUser: {
                    document: {
                        identification: "12345678909",
                        rel: "CPF"
                    }
                },
                creditor: {
                    name: "Joao Silva",
                    cpfCnpj: "99991111140",
                    personType: "PESSOA_NATURAL"
                },
                payment: {
                    amount: "10.32",
                    currency: "BRL",
                    date: "2025-06-30",
                    details: {
                        creditorAccount: {
                            number: "12345678",
                            accountType: "CACC",
                            ispb: "99999004",
                            issuer: "0001"
                        },
                        localInstrument: "DICT",
                        proxy: "cliente-a00001@pix.bcb.gov.br"
                    },
                    type: "PIX"
                }
            },
            brandId: "3a40d894-f3c2-47e3-97c2-d9a04cdac63c",
            specVersion: "v4"
        }

        const { data } = await axios.post(
            process.env.OPEN_FINANCE_API_BASE_URL,
            payload
        )

        const { request: authorizationRequest } = await axios.get(
            data.authorization_url
        )

        const responseUrl = authorizationRequest.res.responseUrl

        const interactionId = responseUrl.match(/interactionId=([^&]+)/)?.[1]

        const redirectUrl = `${process.env.FRONTEND_BASE_URL}/bricks/auth?interactionId=${interactionId}`
        response.redirect(redirectUrl)
    } catch (error) {
        console.error(error.response?.data || error.message)
    }
})

app.get("/login", (request, response) => {
    const redirect_uri = request.query.redirect_uri
    const code = Math.floor(Math.random() * 90000) + 10000
    const state = request.query.state

    const redirectUrl = `${redirect_uri}?code=${code}&state=${state}`
    response.redirect(redirectUrl)
})

app.get("/account/documentNumber", (request, response) => {
    response.json({
        version: "1.0.0",
        status: "SUCCESS",
        body: {
            accounts: [
                {
                    statusAccount: "ATIVO",
                    account: "87683664000180",
                    type: "NATURAL_PERSON",
                    createDate: "2022-08-01T10:00:01",
                    lastUpdate: "2022-08-01T10:00:01",
                    clientCode: "123456",
                    branch: "123456",
                    onBoardingId: "39c8e322-9192-498d-947e-2daa4dfc749e"
                }
            ],
            totalItems: 1
        }
    })
})

app.post("/token", async (request, response) => {
    try {
        const payload = {
            grant_type: process.env.KEYCLOAK_API_GRANT_TYPE,
            client_id: process.env.KEYCLOAK_API_CLIENT_ID,
            client_secret: process.env.KEYCLOAK_API_CLIENT_SECRET,
            username: process.env.KEYCLOAK_API_USERNAME,
            password: process.env.KEYCLOAK_API_PASSWORD
        }

        const { data } = await axios.post(
            process.env.KEYCLOAK_API_BASE_URL,
            qs.stringify(payload)
        )
        response.json(data)
    } catch (error) {
        console.error(error.response?.data || error.message)
    }
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
