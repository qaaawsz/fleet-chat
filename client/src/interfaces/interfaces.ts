export interface IChannelListContent {
    isCreating: boolean
    setIsCreating: Function
    setCreateType: Function
    setIsEditing: Function
    setToggleContainer?: Function
}

export interface IChannelHeader {
    setIsEditing: Function
}

export interface IAddChannel {
    setCreateType: Function
    setIsCreating: Function
    setIsEditing: Function
    setToggleContainer: Function | undefined
    type: string
}
