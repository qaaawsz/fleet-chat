import {Avatar, useChannelStateContext, useChatContext} from 'stream-chat-react'
import React from 'react'
import {getWatcherText} from '../../../utils/chatHandler'
import {IChannelHeader} from '../../../interfaces/interfaces'

const ChannelHeader: React.FC<IChannelHeader> = ({setIsEditing}) => {
    const {channel, watcher_count} = useChannelStateContext()
    const {client} = useChatContext()
    const members = Object.values(channel.state.members).filter(({user}) => user?.id !== client.userID)
    const additionalMembers = members.length - 3

    // Return Header for private chats in case it's a private one
    if (channel.type === 'messaging') {
        return (
            <div className="team-channel-header__name-wrapper">
                {members.map(({user}, i) => (
                    <div key={i} className="team-channel-header__name-multi">
                        <Avatar image={user?.image} name={`${user?.fullName || user?.id || user?.name}`} size={50}/>
                        <p className="team-channel-header__name user">{`${user?.fullName || user?.id}`}</p>
                    </div>
                ))}
            </div>
        )
    }

    // Return complex header in case it's a channel
    return (
        <div className="team-channel-header__container">
            <div className="team-channel-header__channel-wrapper">
                <div style={{display: 'flex', width: 300, textOverflow: 'ellipsis', overflow: 'hidden'}}>
                    {members.map(({user}, i) => (
                        <div key={i} className="team-channel-header__name-multi">
                            <p className="team-channel-header__name user">{`${user?.fullName || user?.id}`}</p>
                        </div>
                    ))}
                    {additionalMembers > 0 &&
                        <p className="team-channel-header__name user">and {additionalMembers} more</p>}
                </div>

                <p className="team-channel-header__name"># {channel?.data?.name}</p>
                <span style={{display: 'flex'}} onClick={() => setIsEditing(true)}>CHANGE</span>
                {channel.type === 'team' &&
                    <p className="team-channel-header__right-text">{getWatcherText(watcher_count)}</p>
                }
            </div>
        </div>
    )
}

export default ChannelHeader
