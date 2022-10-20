import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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

    const localUser = localStorage.getItem("auth_token")
    const userObject = JSON.parse(localUser)

    
    return <section>
        <h2>My Posts</h2>
        <div className = "postsSection">
            {
                allPosts.map(
                    (post) => {
                        if (userObject === post.user_id) {
                            return <li className="postBox">
                                <img className="postPic" src={post.image_url} width="600px" alt=""></img>
                                <Link className="postName" to={`/posts/${post.id}`}>{post?.title}</Link>
                                <div className="postInfo">
                                    <p>Author: {post.author}</p>
                                    <p>Category: {post.category}</p>
                                </div>
                            </li>

                        }
                        else {
                            <div>You have not created any posts yet!</div>
                        }
                    }
                )
            }
        </div>
    </section>
    
    
}