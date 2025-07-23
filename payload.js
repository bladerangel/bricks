export const payment = {
    brandId: "b0e14b00-9686-4764-bdac-5fe415b1dc1a",
    specVersion: "v4",
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
    }
}

export const enrollment = {
    brandId: "b0e14b00-9686-4764-bdac-5fe415b1dc1a",
    enrollment: {
        loggedUser: {
            document: {
                identification: "12345678909",
                rel: "CPF"
            }
        },
        permissions: ["PAYMENTS_INITIATE"]
    },
    riskSignals: {
        deviceId: "00aa11bb22cc33dd",
        accountTenure: "2025-05-30",
        userTimeZoneOffset: "-03",
        language: "pt",
        osVersion: "14",
        elapsedTimeSinceBoot: 6356027,
        screenBrightness: 255,
        screenDimensions: {
            height: 2340,
            width: 1080
        },
        isRootedDevice: true,
        integrity: {
            appRecognitionVerdict: "PLAY_RECOGNIZED",
            deviceRecognitionVerdict: '[\\"MEETS_DEVICE_INTEGRITY\\"]'
        },
        geolocation: {
            latitude: -15.738602,
            longitude: -47.926498,
            type: "COARSE"
        },
        antennaInformation:
            "CellIdentityLte:{ mCi=2******60 mPci=274 mTac=5***1 mEarfcn=9510 mBands=[28] mBandwidth=2147483647 mMcc=724 mMnc=10 mAlphaLong=VIVO mAlphaShort=VIVO mAdditionalPlmns={} mCsgInfo=null}, CellIdentityLte:{ mCi=1*****01 mPci=361 mTac=3***6 mEarfcn=9410 mBands=[28] mBandwidth=2147483647 mMcc=724 mMnc=03 mAlphaLong=TIMBRASIL mAlphaShort=TIMBRASIL mAdditionalPlmns={} mCsgInfo=null}",
        isDevModeEnabled: true,
        isEmulated: true,
        isUsbConnected: true,
        isCharging: true,
        isCallingProgress: true,
        isMockGPS: true,
        isMonkeyRunner: true
    }
}
