import React from 'react'
import {IChannelListContent} from '../../../interfaces/interfaces'
import {ChannelList, useChatContext} from 'stream-chat-react'
import {resetCookies} from '../../../utils/cookieHandler'
import SidebarHeader from '../SidebarHeader/SidebarHeader'
import SidebarSearch from '../SidebarSearch/SidebarSearch'
import {customChannelMessagingFilter, customChannelTeamFilter} from '../../../utils/filtersHandler'
import ChannelsList from './ChannelsList/ChannelsList'
import ChannelPreview from './ChannelPreview/ChannelPreview'

const Sidebar: React.FC<IChannelListContent> =
    ({
         isCreating,
         setIsCreating,
         setCreateType,
         setIsEditing,
         setToggleContainer,
     }) => {
        const {client, setActiveChannel} = useChatContext()

        const onLogOut = () => {
            resetCookies()
            window.location.reload()
        }

        // @ts-ignore
        const filters: any = {members: {$in: [client.userID]}}

        return (
            <>
                <div className="channel-list__list__wrapper">
                    <SidebarHeader onLogOut={onLogOut}/>
                    <SidebarSearch setToggleContainer={setToggleContainer}/>
                    <ChannelList
                        filters={filters}
                        channelRenderFilterFn={customChannelTeamFilter}
                        List={(listProps) => (
                            <ChannelsList
                                setIsCreating={setIsCreating}
                                setCreateType={setCreateType}
                                setIsEditing={setIsEditing}
                                type="team"
                                {...listProps}
                            />
                        )}
                        Preview={(previewProps) => (
                            <ChannelPreview
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
                            <ChannelsList
                                isCreating={isCreating}
                                setIsCreating={setIsCreating}
                                setCreateType={setCreateType}
                                setIsEditing={setIsEditing}
                                type="messaging"
                                {...listProps}
                            />
                        )}
                        Preview={(previewProps) => (
                            <ChannelPreview
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

export default Sidebar
