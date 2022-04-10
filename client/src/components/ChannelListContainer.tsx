import React, {useState} from 'react'
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

const customChannelTeamFilter = (channels: any[]) =>
    channels.filter((channel) => channel.type === 'team')

const customChannelMessagingFilter = (channels: any[]) =>
    channels.filter((channel) => channel.type === 'messaging')

interface IChannelListContent {
    isCreating: boolean
    setIsCreating: Function
    setCreateType: Function
    setIsEditing: Function
    setToggleContainer?: Function
}

const ChannelListContent: React.FC<IChannelListContent> =
    ({
         isCreating,
         setIsCreating,
         setCreateType,
         setIsEditing,
         setToggleContainer,
     }) => {
        const {client, setActiveChannel} = useChatContext()
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

        // @ts-ignore
        const filters: any = {members: {$in: [client.userID]}}

        return (
            <>
                <SideBar onLogOut={onLogOut}/>
                <div className="channel-list__list__wrapper">
                    <CompanyHeader/>
                    <ChannelSearch setToggleContainer={setToggleContainer}/>
                    <ChannelList
                        filters={filters}
                        channelRenderFilterFn={customChannelTeamFilter}
                        List={(listProps) => (
                            <TeamChannelList
                                setIsCreating={setIsCreating}
                                setCreateType={setCreateType}
                                setIsEditing={setIsEditing}
                                type="team"
                                {...listProps}
                            />
                        )}
                        Preview={(previewProps) => (
                            <TeamChannelPreview
                                setIsCreating={setIsCreating}
                                setIsEditing={setIsEditing}
                                setToggleContainer={setToggleContainer}
                                setActiveChannel={setActiveChannel}
                                type="team"
                                {...previewProps}
                            />
                        )}
                    />
                    <ChannelList
                        filters={filters}
                        channelRenderFilterFn={customChannelMessagingFilter}
                        List={(listProps) => (
                            <TeamChannelList
                                isCreating={isCreating}
                                setIsCreating={setIsCreating}
                                setCreateType={setCreateType}
                                setIsEditing={setIsEditing}
                                type="messaging"
                                {...listProps}
                            />
                        )}
                        Preview={(previewProps) => (
                            <TeamChannelPreview
                                setIsCreating={setIsCreating}
                                setIsEditing={setIsEditing}
                                setToggleContainer={setToggleContainer}
                                setActiveChannel={setActiveChannel}
                                type="messaging"
                                {...previewProps}
                            />
                        )}
                    />
                </div>
            </>
        )
    }

interface IChannelListContainer {
    isCreating: boolean
    setCreateType: Function
    setIsCreating: Function
    setIsEditing: Function
}

const ChannelListContainer: React.FC<IChannelListContainer> =
    ({
         setCreateType,
         setIsCreating,
         setIsEditing,
         isCreating
     }) => {
        const [toggleContainer, setToggleContainer] = useState<boolean>(false)

        return (
            <>
                <div className="channel-list__container">
                    <ChannelListContent
                        setCreateType={setCreateType}
                        setIsCreating={setIsCreating}
                        isCreating={isCreating}
                        setIsEditing={setIsEditing}
                    />
                </div>
                {/*second ChannelListContent is only for moblies*/}
                <div className="channel-list__container-responsive"
                     style={{left: toggleContainer ? '0%' : '-89%', background: '#005fff'}}>
                    <div onClick={() => setToggleContainer(prevState => !prevState)}
                         className="channel-list__container-toggle">
                    </div>
                    <ChannelListContent
                        setCreateType={setCreateType}
                        setIsCreating={setIsCreating}
                        isCreating={isCreating}
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                    />
                </div>
            </>
        )
    }

export default ChannelListContainer
