import React from 'react'

const TeamChannelList = ({...listProps}) => {
    const {
        children,
        error = false,
        loading,
        type,
        setIsCreating,
        setCreateType,
        setIsEditing,
        setToggleContainer,
    } = listProps

    if (error) {
        return type === 'team'
            ? (
                <div className="team-channel-list">
                    <p className="team-channel-list__message">
                        Connection error, please try again
                    </p>
                </div>
            )
            : null
    }

    if (loading) {
        return <div className="team-channel-list">
            <p className="team-channel-list__message loading">
                {type === 'team' ? 'Channels' : 'Messages'} are loading...
            </p>
        </div>
    }

    return (
        <div className="team-channel-list">
            <div className="team-channel-list__header">
                <p className="team-channel-list__header__title">
                    {type === 'team' ? 'Channels' : 'Direct Messages'}
                </p>
                <AddChannel
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                    type={type === 'team' ? 'team' : 'messaging'}
                />

            </div>
            {children}
        </div>
    )
}

interface IAddChannel {
    setCreateType: Function
    setIsCreating: Function
    setIsEditing: Function
    setToggleContainer: Function | undefined
    type: string
}

const AddChannel: React.FC<IAddChannel> =
    ({setCreateType, setIsCreating, setIsEditing, type, setToggleContainer}) => {
        return (
            <button
                onClick={() => {
                    setCreateType(type)
                    setIsCreating((prevState: any) => !prevState)
                    setIsEditing(false)
                    if (setToggleContainer) setToggleContainer((prevState: any) => !prevState)
                }}>
                add channel
            </button>
        )
    }

export default TeamChannelList
