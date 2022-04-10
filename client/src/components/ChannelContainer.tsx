import React from 'react'
import {Channel, useChatContext, MessageTeam, Window, ChannelHeader, MessageList, MessageInput} from 'stream-chat-react'
import {ChannelInner, CreateChannel, EditChannel, TeamMessage} from './index'


interface IChannelContainer {
    isCreating: boolean
    setIsCreating: Function
    isEditing: boolean
    setIsEditing: Function
    createType: string
}

const ChannelContainer: React.FC<IChannelContainer> =
    ({
         isCreating,
         setIsCreating,
         isEditing,
         setIsEditing,
         createType,
     }) => {
        //getting current specific channel
        const {channel} = useChatContext()


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

        const EmptyState = () => (
            <div className="channel-empty__container">
                <p className="channel-empty__first">
                    This is the beginning of your chat history
                </p>

                <p className="channel-empty__second">
                    Sent messages, attachments, links, emojis, and more!
                </p>
            </div>
        )

        return (
            <div className="channel__container">
                <Channel
                    EmptyStateIndicator={EmptyState}
                    Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
                >
                    <ChannelInner setIsEditing={setIsEditing}/>
                </Channel>
            </div>
        )
    }

export default ChannelContainer
