import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getPosts } from "../../managers/PostManager"
import { getSubscriptions } from "../../managers/SubscriptionManager"

export const HomePosts = () => {
    const [posts,setPosts] = useState([])
    const [filteredPosts,setFilteredPosts] = useState([])
    const [subscriptions, setSubscriptions] = useState([])
    const [doneLoading, setLoading] = useState(false)
    const localUser = localStorage.getItem("auth_token")
    const userObject = localUser


    useEffect(
        () => {
            getPosts()
                .then((allPostsArray) => {
                    setPosts(allPostsArray)
                    getSubscriptions()
                        .then((subscriptionsArray) => {
                            setSubscriptions(subscriptionsArray)
                            setLoading(true)
                        })
                })
        },
        [])

        useEffect(
            () => {
                let filteredArray = posts.filter(p => {
                    for (const sub of subscriptions) {
                        if(sub.author_id === p.user_id && sub.follower_id === userObject){
                            return p
                        }
                    }
                })
                setFilteredPosts(filteredArray)
            },
            [doneLoading]
        )


    if(doneLoading && filteredPosts.length > 0){
        return (
            <> 
            <h3>Posts from author subscriptions:</h3>                  
            {   
            filteredPosts.map((post) => {
                return <li className="postBox">
                    <img className="postPic" src={post.image_url} width="600px" alt=""></img>
                    <Link className="postName" to={`/posts/${post.id}`}>{post?.title}</Link>
                    <div className="postInfo">
                        <p>Author: {post.user.first_name} {post.user.last_name}</p>
                        <p>Category: {post.category.label}</p>
                    </div>
                    </li>
                }
                )
            }
            </>
        )
    } else if(doneLoading && filteredPosts.length === 0) {
        return <div>You are not subscribed to any authors that have published articles!</div>
    } else {
        return <div>Loading!</div>
    }


}