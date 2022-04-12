import React from 'react'
import {Channel, MessageTeam,} from 'stream-chat-react'
import {ChannelBody, CreateChannel, EditChannel} from '../index'
import EmptyChat from './EmptyChat/EmptyChat'


interface IChannelContainer {
    isCreating: boolean
    setIsCreating: Function
    isEditing: boolean
    setIsEditing: Function
    createType: string
}

const ChannelController: React.FC<IChannelContainer> =
    ({
         isCreating,
         setIsCreating,
         isEditing,
         setIsEditing,
         createType,
     }) => {

        if (isCreating) {
            return (
                <div className="channel__container">
                    <CreateChannel createType={createType} setIsCreating={setIsCreating}/>
                </div>
            )
        }

        if (isEditing) {
            return (
                <div className="channel__container">
                    <EditChannel setIsEditing={setIsEditing}/>
                </div>
            )
        }

        return (
            <div className="channel__container">
                <Channel
                    EmptyStateIndicator={EmptyChat}
                    Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
                >
                    <ChannelBody setIsEditing={setIsEditing}/>
                </Channel>
            </div>
        )
    }

export default ChannelController
