import React from 'react'
import {StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'
import {ChannelContainer, ChannelListContainer, Auth} from './components'
import './components/styles.css'


const cookies = new Cookies()

const apiKey = 'eyx4gt39p3je'

const client = StreamChat.getInstance(apiKey)

const authToken = cookies.get('token')

if (authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarUrl'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }, authToken)
}

function App() {

    if (!authToken) return <Auth/>

    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <ChannelListContainer/>
                <ChannelContainer/>
            </Chat>
        </div>
    )
}

export default App
