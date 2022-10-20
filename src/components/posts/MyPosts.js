import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getPosts } from "../../managers/PostManager"



export const MyPosts = () => {
   const [allPosts, setAllPosts] = useState([])

   useEffect(
    () => {
        getPosts()
            .then((allPostsArray) => {
                setAllPosts(allPostsArray)
            })
    },
    [])

    let navigate = useNavigate()
    const localUser = localStorage.getItem("auth_token")
    const userObject = JSON.parse(localUser)

    const myPosts = allPosts.filter(post => userObject === post.user_id)
    

    if (myPosts.length === 0) {
        return <div>You have no posts created yet!</div>
    }
    else {
        return <section>
        <h2>My Posts</h2>
        <div className = "postsSection">
            {
                myPosts.map(
                    (post) => {
                        return <li className="postBox">
                        <img className="postPic" src={post.image_url} width="600px" alt=""></img>
                        <Link className="postName" to={`/posts/${post.id}`}>{post?.title}</Link>
                        <div className="postInfo">
                            <p>Author: {post.user.first_name} {post.user.last_name}</p>
                            <p>Category: {post.category.label}</p>
                        </div>
                        <button id={post.id}
                        onClick = {
                            (evt) => {
                                let postId = evt.target.id
                                navigate(`/edit_post/${postId}`)
                            }
                        }>Edit</button>
                        <button>Delete</button>
                    </li>   
                    }
                )
            }
        </div>
    </section>
    }
}