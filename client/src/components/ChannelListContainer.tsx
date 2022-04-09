import React from 'react'
import Cookies from 'universal-cookie'
import {ChannelList, useChatContext} from 'stream-chat-react'
import {ChannelSearch, TeamChannelList, TeamChannelPreview} from './index'

const SideBar: React.FC<{ onLogOut: Function }> = ({onLogOut}) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                APP ICON
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner">
                <button onClick={() => onLogOut()}>
                    LOG OUT
                </button>
            </div>
        </div>
    </div>
)

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">
            FleetChat
        </p>
    </div>
)

const ChannelListContainer = () => {
    const cookies = new Cookies()

    const onLogOut = () => {
        cookies.remove('token')
        cookies.remove('userId')
        cookies.remove('username')
        cookies.remove('fullName')
        cookies.remove('avatarUrl')
        cookies.remove('hashedPassword')
        cookies.remove('phoneNumber')
        window.location.reload()
    }
    return (
        <>
            <SideBar onLogOut={onLogOut}/>
            <div className="channel-list__list__wrapper">
                <CompanyHeader/>
                <ChannelSearch/>
                <ChannelList
                    filters={{}}
                    channelRenderFilterFn={(Channel) => {
                        return Channel
                    }}
                    List={(listProps) => (
                        <TeamChannelList
                            type="team"
                            {...listProps}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            type="team"
                            {...previewProps}
                        />
                    )}
                />
                <ChannelList
                    filters={{}}
                    channelRenderFilterFn={(Channel) => {
                        return Channel
                    }}
                    List={(listProps) => (
                        <TeamChannelList
                            type="messaging"
                            {...listProps}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            type="messaging"
                            {...previewProps}
                        />
                    )}
                />
            </div>
        </>
    )
}

export default ChannelListContainer
