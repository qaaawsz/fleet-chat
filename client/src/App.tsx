import React, {useState} from 'react'
import {Chat} from 'stream-chat-react'
import {ChannelController, Auth} from './components'
import 'stream-chat-react/dist/css/index.css'
import './components/styles.css'
import {validateUser} from './utils/validationHandler'
import SidebarWrapper from './components/Sidebar/SidebarWrapper'

function App() {
    const [createType, setCreateType] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const {authToken, client} = validateUser()

    if (!authToken) return <Auth/>

    return (
        <div className="app__wrapper">
            <Chat client={client} theme="team light">
                <SidebarWrapper
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />
                <ChannelController
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />
            </Chat>
        </div>
    )
}

export default App
