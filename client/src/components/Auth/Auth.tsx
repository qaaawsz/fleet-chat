import React, {ChangeEvent, FormEvent, useState} from 'react'
import {authenticateUser} from '../../api/apiHandler'
import {setCookies} from '../../utils/cookieHandler'

const formInitialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: ''
}

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState<boolean>(true)
    const [form, setForm] = useState(formInitialState)

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const {fullName, username, password, phoneNumber, avatarURL} = form

        const {
            token,
            userId,
            hashedPassword
        } = await authenticateUser(isSignUp, username, password, form.fullName, phoneNumber, avatarURL)

        setCookies(isSignUp, token, username, fullName, userId, phoneNumber, avatarURL, hashedPassword)

        window.location.reload()
    }

    const inputCreator = (name: string, placeholder: string) => {
        return (
            <div className="auth__form-container_fields-content_input">
                <label htmlFor={name}>
                    {placeholder}
                </label>
                <input
                    name={name}
                    type="text"
                    placeholder={placeholder}
                    onChange={(e) => onHandleChange(e)}
                    required
                />
            </div>
        )
    }

    const text = isSignUp ? 'Sign Up' : 'Sign In'

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{text}</p>
                    <form onSubmit={(e) => onHandleSubmit(e)}>
                        {isSignUp && inputCreator('fullName', 'Full Name')}
                        {inputCreator('username', 'Username')}
                        {isSignUp && inputCreator('phone', 'Phone Number')}
                        {isSignUp && inputCreator('avatarURL', 'Avatar URL')}
                        {inputCreator('password', 'Password')}
                        {isSignUp && inputCreator('confirm', 'Confirm Password')}
                        <div className="auth__form-container_fields-content_button">
                            <button>{text}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>{isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
                            <span onClick={() => setIsSignUp(prevState => !prevState)}>
                                {text}
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
