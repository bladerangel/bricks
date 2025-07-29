import axios from "axios"
import qs from "qs"

export async function getBaasToken() {
    const payload = {
        grant_type: process.env.KEYCLOAK_API_BAAS_GRANT_TYPE,
        client_id: process.env.KEYCLOAK_API_BAAS_CLIENT_ID,
        client_secret: process.env.KEYCLOAK_API_BAAS_CLIENT_SECRET
    }

    const { data } = await axios.post(
        process.env.KEYCLOAK_API_BAAS_BASE_URL,
        qs.stringify(payload)
    )

    return data.access_token
}

export async function getAuthorizationUrl(path, payload) {
    const access_token = await getBaasToken()

    const { data } = await axios.post(
        `${process.env.OPEN_FINANCE_API_BASE_URL}${path}`,
        payload,
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    )

    return await redirectUrl(data.authorization_url)
}

export async function redirectUrl(url) {
    const data = await axios.get(url)

    const interactionId = data.request.res.responseUrl.match(
        /interactionId=([^&]+)/
    )?.[1]

    return `${process.env.FRONTEND_BASE_URL}/celcoin/auth?interactionId=${interactionId}`
}

export async function getFinansystechToken() {
    const payload = {
        grant_type: process.env.KEYCLOAK_API_FINANSYSTECH_GRANT_TYPE,
        client_id: process.env.KEYCLOAK_API_FINANSYSTECH_CLIENT_ID,
        client_secret: process.env.KEYCLOAK_API_FINANSYSTECH_CLIENT_SECRET,
        username: process.env.KEYCLOAK_API_FINANSYSTECH_USERNAME,
        password: process.env.KEYCLOAK_API_FINANSYSTECH_PASSWORD
    }

    const { data } = await axios.post(
        process.env.KEYCLOAK_API_FINANSYSTECH_BASE_URL,
        qs.stringify(payload)
    )

    return data.access_token
}
