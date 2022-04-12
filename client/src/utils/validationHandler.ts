import {StreamChat} from 'stream-chat'
import {getAuthToken, getCookies} from './cookieHandler'

// Validates user and returns user data and token
export const validateUser = () => {
    const client = StreamChat.getInstance('eyx4gt39p3je')

    const authToken = getAuthToken()

    if (authToken) {
        const {id, name, fullName, phoneNumber, image, hashedPassword} = getCookies()
        client.connectUser({
            id,
            name,
            fullName,
            image,
            hashedPassword,
            phoneNumber
        }, authToken)
    }

    return {authToken, client}

}
