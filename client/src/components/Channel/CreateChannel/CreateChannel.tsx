import React, {ChangeEvent, useState} from 'react'
import {useChatContext} from 'stream-chat-react'
import {UserList} from '../../index'

interface ICreateChannel {
    createType: string
    setIsCreating: Function
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

const CreateChannel: React.FC<ICreateChannel> = ({createType, setIsCreating}) => {
    const [channelName, setChannelName] = useState('')
    const {client, setActiveChannel} = useChatContext()

    const [selectedUsers, setSelectedUsers] = useState<any[]>([client.userID || ''])

    const onCreateChannel = async (e: any) => {
        e.preventDefault()
        try {
            const newChannel = await client.channel(createType, channelName, {
                name: channelName, members: selectedUsers
            })

            await newChannel.watch()

            setChannelName('')
            setIsCreating(false)
            setSelectedUsers([client.userID])
            setActiveChannel(newChannel)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>
                    {createType === 'team'
                        ? 'Create new channel'
                        : 'Start private chat'
                    }
                </p>
                <button onClick={() => setIsCreating(false)}>
                    close chat creating
                </button>
            </div>
            {
                createType === 'team' &&
                <ChannelNameInput
                    channelName={channelName}
                    setChannelName={setChannelName}
                />
            }
            <UserList setSelectedUsers={setSelectedUsers}/>
            <div className="create-channel__button-wrapper" onClick={(e) => onCreateChannel(e)}>
                <p>{createType === 'team' ? 'Create Channel' : 'Create message group'}</p>
            </div>
        </div>
    )
}

export default CreateChannel
