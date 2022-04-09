import React, {ChangeEvent, useState} from 'react'

const ChannelSearch = () => {
    const [querySearch, setQuerySearch] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const getChannels = async (text: string) => {
        try {
            //TODO fetch channels
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

    return (
        <div className="channel-search__container">
            <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon">
                    Search icon
                </div>
                <input
                    placeholder="Search for channels"
                    type="text"
                    className="channel-search__input__text"
                    value={querySearch}
                    onChange={(e) => onSearch(e)}
                />
            </div>
        </div>
    )
}

export default ChannelSearch
