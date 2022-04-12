import React from 'react'
import {IAddChannel} from '../../../../interfaces/interfaces'
import {AddButton} from '../../../styled/buttons'

const AddChannel: React.FC<IAddChannel> =
    ({setCreateType, setIsCreating, setIsEditing, type, setToggleContainer}) => {
        return (
            <AddButton
                onClick={() => {
                    setCreateType(type)
                    setIsCreating((prevState: any) => !prevState)
                    setIsEditing(false)
                    if (setToggleContainer) setToggleContainer((prevState: any) => !prevState)
                }}>
                add channel
            </AddButton>
        )
    }

export default AddChannel
