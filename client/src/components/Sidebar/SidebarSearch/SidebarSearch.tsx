import React, {ChangeEvent, useEffect, useState} from 'react'
import {useChatContext} from 'stream-chat-react'
import {ResultsDropdown} from '../../index'

const SidebarSearch: React.FC<{ setToggleContainer: Function | undefined }> = ({setToggleContainer}) => {
    const {client, setActiveChannel} = useChatContext()
    const [querySearch, setQuerySearch] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [teamChannels, setTeamChannels] = useState<any[]>([])
    const [directChannels, setDirectChannels] = useState<any[]>([])

    useEffect(() => {
        if (!querySearch) {
            setTeamChannels([])
            setDirectChannels([])
        }
    }, [querySearch])


    const getChannels = async (text: string) => {
        try {
            const channelsResponse = client.queryChannels({
                type: 'team',
                name: {$autocomplete: text},
                //@ts-ignore
                members: {'$in': [client.userID]}
            })

            const userResponse = client.queryUsers({
                // @ts-ignore
                id: {$ne: client.userID},
                name: {$autocomplete: text}
            })

            const [channels, {users}] = await Promise.all([channelsResponse, userResponse])

            if (channels.length) setTeamChannels(channels)
            if (users.length) setDirectChannels(users)

        } catch (e) {
            console.log(e)
            setQuerySearch('')
        }
    }

    const onSearch = ((e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setQuerySearch(e.target.value)
        getChannels(e.target.value)
        setIsLoading(false)
    })

    const setChannel = (channel: any) => {
        setQuerySearch('')
        setActiveChannel(channel)
    }

    return (
        <div className="channel-search__container">
            <div className="channel-search__input__wrapper">
                <input
                    placeholder="Search for channels"
                    type="text"
                    className="channel-search__input__text"
                    value={querySearch}
                    onChange={(e) => onSearch(e)}
                />
            </div>
            {
                querySearch && (
                    <ResultsDropdown
                        teamChannels={teamChannels}
                        directChannels={directChannels}
                        loading={isLoading}
                        setChannel={setChannel}
                        setQuery={setQuerySearch}
                        setToggleContainer={setToggleContainer}
                    />
                )
            }
        </div>
    )
}

export default SidebarSearch

