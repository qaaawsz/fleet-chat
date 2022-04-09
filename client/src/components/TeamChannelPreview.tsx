import React from 'react'
import {Avatar, useChatContext} from 'stream-chat-react'

const TeamChannelPreview = ({...previewProps}) => {
    const {channel, type} = previewProps
    const {channel: activeChannel, client} = useChatContext()

    // Preview for channel with multiple users
    const ChannelPreview = () => (
        <p className="channel-preview__item">
            # {channel?.data?.name || channel?.data?.id}
        </p>
    )

    //Preview for direct chat
    // Each user has some
    // Data returned by channel.state.members will be of object type with keys and values {key: value key: value}, where keys will be exact users ID's and values would be user's data objects based on id
    // With Object.values we convert values data into array of data that can be mapped and filtered by specific user id to return ALL users EXCEPT ourselves
    const DirectPreview = () => {
        const members: any = Object.values(channel.state.members).filter(({user}: any) => user?.id !== client?.userID)

        return <div className="channel-preview__item single">
            <Avatar image={members[0]?.user?.image} name={members[0]?.user?.fullName} size={24}/>
            <p>
                {members[0]?.user?.fullName}
            </p>
        </div>
    }

    const onChatSelect = () => {

    }

    return (
        <div
            className={channel?.id === activeChannel?.id ? 'channel-preview__wrapper__selected' : 'channel-preview__wrapper'}
            onClick={onChatSelect}>
            {
                type === 'team'
                    ? <ChannelPreview/>
                    : <DirectPreview/>
            }
        </div>
    )
}

export default TeamChannelPreview
