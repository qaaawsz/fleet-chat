import React, {ChangeEvent, useState} from 'react'
import {useChatContext} from 'stream-chat-react'
import {UserList} from '../../index'

interface IEditChannel {
    setIsEditing: Function
}

const ChannelNameInput: React.FC<{ channelName: string, setChannelName: Function }> =
    ({channelName = '', setChannelName}) => {

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
            setChannelName(e.target.value)
        }
        return (
            <div className="channel-name-input__wrapper">
                <p>Name</p>
                <input type="text" value={channelName} onChange={(e) => handleChange(e)}
                       placeholder="Channel name(no spaces)"/>
                <p>Add Members</p>
            </div>
        )
    }

const EditChannel: React.FC<IEditChannel> = ({setIsEditing}) => {
    const {channel} = useChatContext()
    const [channelName, setChannelName] = useState<string>(channel?.data?.name || '')
    const [selectedUsers, setSelectedUsers] = useState<any[]>([])

    const updateChannel = async (e: any) => {
        e.preventDefault()

        const nameChanged = channelName !== (channel?.data?.name || channel?.data?.id)

        if (nameChanged) {
            await channel?.update({name: channelName}, {text: `Channel name changed to ${channelName}`})
        }

        if (selectedUsers.length) {
            await channel?.addMembers(selectedUsers)
        }

        setChannelName('')
        setIsEditing(false)
        setSelectedUsers([])

    }
    return (
        <div className="edit-channel__container">
            <div className="edit-channel__header">
                <p>Edit Channel </p>
                <button onClick={() => setIsEditing(false)}>close edit</button>
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>
            <UserList setSelectedUsers={setSelectedUsers}/>
            <div onClick={(e) => updateChannel(e)} className="edit-channel__button-wrapper">
                <p>Save changes</p>
            </div>
        </div>
    )
}

export default EditChannel
