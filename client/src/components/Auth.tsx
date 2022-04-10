import React, {ChangeEvent, FormEvent, useState} from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

const Auth = () => {

    const formInitialState = {
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        avatarURL: ''
    }

    const [isSignUp, setIsSignUp] = useState<boolean>(true)
    const [form, setForm] = useState(formInitialState)
    const cookies = new Cookies()

    // We override only selected input values, others are stored because of destructuring
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }

    const onSwitchMode = () => {
        setIsSignUp(prevState => !prevState)
    }

    const onHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {fullName, username, password, phoneNumber, avatarURL} = form

        const URL = 'http://localhost:5000/auth'

        const {data: {token, userId, hashedPassword}} = await axios.post(`${URL}/${isSignUp ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        })

        console.log(token, userId, hashedPassword)

        cookies.set('token', token)
        cookies.set('username', username)
        cookies.set('fullName', fullName)
        cookies.set('userId', userId)

        if (isSignUp) {
            cookies.set('phoneNumber', phoneNumber)
            cookies.set('avatarUrl', avatarURL)
            cookies.set('hashedPassword', hashedPassword)
        }

        window.location.reload()
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignUp ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={(e) => onHandleSubmit(e)}>
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">
                                    Full Name
                                </label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={(e) => handleChange(e)}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">
                                Username
                            </label>
                            <input
                                name="username"
                                type="text"
                                placeholder="Username"
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </div>
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phone">
                                    Phone number
                                </label>
                                <input
                                    name="phone"
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={(e) => handleChange(e)}
                                    required
                                />
                            </div>
                        )}
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">
                                    Avatar
                                </label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={(e) => handleChange(e)}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </div>
                        {isSignUp && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmpassword">
                                    Confirm Password
                                </label>
                                <input
                                    name="confirmpassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={(e) => handleChange(e)}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>
                                {isSignUp ? 'Sign Up' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {
                                isSignUp
                                    ? 'Already have an account?'
                                    : 'Don\'t have an account?'
                            }
                            <span onClick={onSwitchMode}>
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                {/*TODO create assets folder and add there bg image for auth page*/}
                {/*<img src={signinImage} alt='Sign in image'/>*/}
            </div>
        </div>
    )
}

export default Auth
