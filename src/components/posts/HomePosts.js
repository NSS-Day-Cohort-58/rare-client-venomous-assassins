import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getPosts, getSubscribedPosts } from "../../managers/PostManager"
import { getSubscriptions } from "../../managers/SubscriptionManager"

export const HomePosts = () => {

    const [doneLoading, setLoading] = useState(false)
    const auth_token = localStorage.getItem("auth_token")
    const [subscribedPosts, setSubscribedPosts] = useState([])

    useEffect(
        () => {
            getSubscribedPosts()
                .then((posts) => {
                    setSubscribedPosts(posts)
                    setLoading(true)
                })
        }, [])

    if(doneLoading && subscribedPosts.length > 0){
        return (
            <> 
            <h3>Posts from author subscriptions:</h3>                  
            {   
            subscribedPosts.map((post) => {
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
    } else if(doneLoading && subscribedPosts.length === 0) {
        return <div>You are not subscribed to any authors that have published articles!</div>
    } else {
        return <div>Loading!</div>
    }


}