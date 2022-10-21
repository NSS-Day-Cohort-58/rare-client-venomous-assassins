import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUser } from "../../managers/UserManager"

export const UserDetail = () => {
    const { userId } = useParams()

    const [user, setUser] = useState({})


    useEffect(
        () => {
            getUser(userId).then(userData => setUser(userData))
        },
        [userId])

    return <div className="userDiv">
        <div className="user-photo"><img src={user?.profile_image_url} alt="image"></img></div>
        <div className="user-name">Name: {user?.first_name} {user?.last_name}</div>
        <div className="user-username">Username: {user?.username} </div>
        <div className="user-date">Creation Date: {user?.created_on} </div>
        <div className="user-bio">Bio: {user?.bio}</div>
    </div>
}