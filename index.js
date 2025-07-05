import "dotenv/config"
import express from "express"
import crypto from "crypto"
import * as service from "./service.js"

const app = express()

app.get("/payment-initiation", async (request, response) => {
    try {
        const authorizationUrl = await service.getAuthorizationUrl()
        response.redirect(authorizationUrl)
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

app.post("/token", async (request, response) => {
    try {
        const accessToken = await service.getFinansystechToken()
        response.json({ access_token: accessToken })
    } catch (error) {
        console.error(error.response?.data || error.message)
    }
})

app.get("/payment", (request, response) => {
    response.json({ clientCode: crypto.randomUUID() })
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
