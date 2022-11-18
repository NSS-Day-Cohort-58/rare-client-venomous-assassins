import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createSubscription, deleteSubscripton, getSubscriptions } from "../../managers/SubscriptionManager"
import { getUser } from "../../managers/UserManager"

export const UserDetail = () => {
    const { userId } = useParams()

    const [user, setUser] = useState({})
    const [subscriptions, setSubscriptions] = useState([])


    useEffect(
        () => {
            getUser(userId).then(userData => setUser(userData))
        },
        [userId])

    useEffect(
        () => {
            getSubscriptions().then(subData => setSubscriptions(subData))
        },
        [])


    // const localUser = localStorage.getItem("auth_token")
    // const userObject = JSON.parse(localUser)

    // const foundSubscription = subscriptions.find(sub => {
    //     return sub.follower_id === userObject && sub.author_id === user.id
    // })

    // const makeSubscription = () => {
    //     let timestamp = Date.now()

    //     let newSub = {
    //         author_id: user.id,
    //         follower_id: userObject,
    //         created_on: timestamp
    //     }

    //     createSubscription(newSub).then(window.location.reload())
    // }

    // let notSelf = true

    // if (user.id === userObject) {
    //     notSelf = false
    // }
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
        {/* {
            notSelf
                ? <> {foundSubscription
                    ? <button id={foundSubscription.id} onClick={clickEvent => deleteSubscripton(clickEvent).then(window.location.reload())}>Unsubscribe</button>
                    : <button onClick={() => makeSubscription()}>Subscribe</button>
                } </>
                : null

        } */}
    </div>
}