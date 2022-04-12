import Cookies from 'universal-cookie'

const cookies = new Cookies()

// Cookies setter dynamic function
export const setCookies =
    (isSignUp: boolean, token: string, username: string, fullName: string, userId: string, phoneNumber?: string, avatarURL?: string, hashedPassword?: string) => {
        cookies.set('token', token)
        cookies.set('username', username)
        cookies.set('fullName', fullName)
        cookies.set('userId', userId)
        if (isSignUp) {
            cookies.set('phoneNumber', phoneNumber)
            cookies.set('avatarUrl', avatarURL)
            cookies.set('hashedPassword', hashedPassword)
        }
    }

export const getCookies = () => {
    return {
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarUrl'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }
}

export const resetCookies = () => {
    cookies.remove('token')
    cookies.remove('userId')
    cookies.remove('username')
    cookies.remove('fullName')
    cookies.remove('avatarUrl')
    cookies.remove('hashedPassword')
    cookies.remove('phoneNumber')
}

export const getAuthToken = () => cookies.get('token')
