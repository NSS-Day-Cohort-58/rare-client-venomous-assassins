import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createSubscription, updateSubscription, getActiveSubscription } from "../../managers/SubscriptionManager"
import { getUser } from "../../managers/UserManager"

export const UserDetail = () => {
    const { userId } = useParams()

    const [user, setUser] = useState({})


    useEffect(
        () => {
            getUser(userId).then(userData => setUser(userData))
        },
        [userId])

    const update = () => {

        let updatedSub = {
            author: user.id
        }

        updateSubscription(user.sub_info.subscription).then(() => window.location.reload(false))
    }


    const makeSubscription = () => {

        let newSub = {
            author: user.id
        }

        createSubscription(newSub).then(() => window.location.reload(false))
    }


    let staffType = null
    if (user.is_staff === "True") {
        staffType = "Admin"
    } else {
        staffType = "Not Admin"
    }

    return <div className="userDiv">
        <div className="user-photo"><img src={user?.profile_image_url} alt="image"></img></div>
        <div className="user-name">Name: {user?.full_name}</div>
        <div className="user-username">Username: {user?.username} </div>
        <div className="user-username">Email: {user?.email} </div>
        <div className="user-username">User Type: {staffType} </div>
        <div className="user-date">Creation Date: {user?.created_on} </div>
        <div className="user-bio">Bio: {user?.bio}</div>
        {
            (user?.sub_info?.subscription === null)
                ? <button onClick={() => makeSubscription()}>Subscribe</button>
                : <button onClick={clickEvent => update()}>Unsubscribe</button>
        }
    </div>
}