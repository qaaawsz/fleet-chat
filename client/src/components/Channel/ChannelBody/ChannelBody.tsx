import React, {useState} from 'react'
import {
    MessageList,
    MessageInput,
    Thread,
    Window,
    useChannelActionContext,
} from 'stream-chat-react'
import ChannelHeader from '../ChannelHeader/ChannelHeader'
import {IChannelHeader} from '../../../interfaces/interfaces'

const GiphyContext = React.createContext({})

const ChannelBody: React.FC<IChannelHeader> = ({setIsEditing}) => {
    const [giphyState, setGiphyState] = useState(false)
    const {sendMessage} = useChannelActionContext()

    const overrideSubmitHandler = (message: any) => {
        let updatedMessage = {
            attachments: message.attachments,
            mentioned_users: message.mentioned_users,
            parent_id: message.parent?.id,
            parent: message.parent,
            text: message.text,
        }

        if (giphyState) {
            updatedMessage = {...updatedMessage, text: `/giphy ${message.text}`}
        }

        if (sendMessage) {
            sendMessage(updatedMessage)
            setGiphyState(false)
        }
    }

    return (
        <GiphyContext.Provider value={{giphyState, setGiphyState}}>
            <div style={{display: 'flex', width: '100%'}}>
                <Window>
                    <ChannelHeader setIsEditing={setIsEditing}/>
                    <MessageList/>
                    <MessageInput overrideSubmitHandler={overrideSubmitHandler}/>
                </Window>
                <Thread/>
            </div>
        </GiphyContext.Provider>
    )
}

export default ChannelBody
