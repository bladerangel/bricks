import "dotenv/config"
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

export async function getAuthorizationUrl() {
    const access_token = await getBaasToken()

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
                date: new Date().toISOString().split("T")[0],
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
        brandId: "5960a4a9-76cd-4eca-b470-78572eb33a84",
        specVersion: "v4"
    }

    const { data } = await axios.post(
        process.env.OPEN_FINANCE_API_BASE_URL,
        payload,
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    )

    return data.authorization_url
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
