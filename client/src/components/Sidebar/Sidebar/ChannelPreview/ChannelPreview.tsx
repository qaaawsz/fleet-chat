import React from 'react'
import {Avatar, useChatContext} from 'stream-chat-react'

const TeamChannelPreview = ({...previewProps}) => {
    const {channel, type, setIsCreating, setIsEditing, setToggleContainer, setActiveChannel} = previewProps
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

        const userName = members[0]?.user?.fullName.length > 0 ? members[0]?.user?.fullName : members[0]?.user?.name

        return <div className="channel-preview__item single">
            <Avatar image={members[0]?.user?.image} name={userName} size={36}/>
            <p>
                {members[0]?.user?.fullName}
            </p>
        </div>
    }

    const onChatSelect = () => {
        setIsCreating(false)
        setIsEditing(false)
        setActiveChannel(channel)
        if (setToggleContainer) setToggleContainer((prev: any) => !prev)
    }

    return (
        <div
            className={channel?.id === activeChannel?.id ? 'channel-preview__wrapper__selected' : 'channel-preview__wrapper'}
            onClick={onChatSelect}>
            {type === 'team' ? <ChannelPreview/> : <DirectPreview/>}
        </div>
    )
}

export default TeamChannelPreview
