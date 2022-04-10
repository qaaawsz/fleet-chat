import React, {useEffect, useState} from 'react'
import {Avatar, useChatContext} from 'stream-chat-react'

const ListContainer: React.FC<{ children: any }> = ({children}) => {
    return (
        <div className="user-list__container">
            <div className="user-list__header">
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

const UserItem: React.FC<{ user: any, setSelectedUsers: Function }> = ({user, setSelectedUsers}) => {
    const [selected, setSelected] = useState<boolean>(false)
    return (
        <div onClick={() => {
            if (selected) {
                setSelectedUsers((prevUsers: any) =>
                    prevUsers.filter((prevUser: any) => prevUser !== user.id))
            } else {
                setSelectedUsers((prevUsers: any) => [...prevUsers, user.id])
            }
            setSelected(prevState => !prevState)
        }} className="user-item__wrapper">
            <div className="user-item__name-wrapper">
                <Avatar image={user.image} name={user.fullName || user.id} size={32}/>
                <p className="user-item__name">
                    {user.fullName || user.id}
                </p>
            </div>
            {
                selected ? 'Selected' : <div className="user-item__invite-empty"/>
            }
        </div>
    )
}

const UserList: React.FC<{ setSelectedUsers: Function }> = ({setSelectedUsers}) => {
    const {client} = useChatContext()
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [listEmpty, setListEmpty] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        const getUsers = async () => {
            if (loading) return

            setLoading(true)
            try {
                // @ts-ignore
                const response = await client.queryUsers({id: {$ne: client.userID}}, {id: 1}, {limit: 8})
                if (response.users.length) setUsers(response.users)
                else {
                    setListEmpty(true)
                }
            } catch (e) {
                setError(true)
            }
            setLoading(false)
        }

        if (client) getUsers()
    }, [])

    if (error) {
        return (<ListContainer>
                <div className="user-list__message">Error happened, try again</div>
            </ListContainer>
        )}

    if (listEmpty) {
        return (<ListContainer>
                <div className="user-list__message">No users found</div>
            </ListContainer>
        )}


    return (
        <ListContainer>
            <p>{loading}</p>
            {
                loading
                    ? <div className="user-list__message">Loading users</div>
                    : users?.map((user, i) => (<UserItem setSelectedUsers={setSelectedUsers} key={i} user={user}/>))
            }
        </ListContainer>
    )
}

export default UserList
