import axios from 'axios'

// Link to backend server
const URL = 'https://fleetchat-qaaawzs.herokuapp.com/auth'

// Function for user validation. Used for both sign up and login
export const authenticateUser = async (isSignUp: boolean, username: string, password: string, fullName: string, phoneNumber: string, avatarURL: string) => {
    const {data: {token, userId, hashedPassword}} = await axios.post(`${URL}/${isSignUp ? 'signup' : 'login'}`, {
        username, password, fullName, phoneNumber, avatarURL,
    })
    return {token, userId, hashedPassword}
}
