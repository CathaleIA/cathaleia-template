
import {calculateSecretHash} from "@/utils/auth";

import { Amplify } from "aws-amplify"
import config from "@/../config.json";

import { signIn } from "aws-amplify/auth";

Amplify.configure({
    Auth: {
        Cognito :{
            userPoolId : config.amplify.userPoolId,
            userPoolClientId: config.amplify.userPoolClientId,
        }
    }
})

// const username = config.credentials.username;
// const clientId = config.amplify.userPoolClientId;
// const clientSecret = config.amplify.userPoolClientSecret;
// const secretHash = calculateSecretHash(username, clientId, clientSecret);

// console.log(secretHash)

async function logIn(userName : string, password: string) {
    console.log(userName, password)
    const signInResult = await signIn({
        username: userName,
        password: password,
        options: {
            authFlowType:  "USER_SRP_AUTH",
        }
    })
    return signInResult;
}

async function main() {
    console.log(config.credentials.username, config.credentials.password)
    const result = await logIn(
        config.credentials.username,
        config.credentials.password
    )
    return console.log("Login return:" + result)
}

export  async function test(element: HTMLButtonElement) {
    element.addEventListener('click', ()=> main())
}

