import React, {useState} from 'react'
import Sidebar from './Sidebar/Sidebar'

interface IChannelListContainer {
    isCreating: boolean
    setCreateType: Function
    setIsCreating: Function
    setIsEditing: Function
}

const SidebarWrapper: React.FC<IChannelListContainer> =
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
                    <Sidebar
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
                    <Sidebar
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

export default SidebarWrapper
