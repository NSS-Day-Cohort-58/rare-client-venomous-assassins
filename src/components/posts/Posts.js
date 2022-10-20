import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { getPosts } from "../../managers/PostManager"


export const Posts = () => {

    const [allPosts, setAllPosts] = useState([])



    useEffect(
        () => {
            getPosts()
                .then((allPostsArray) => {
                    setAllPosts(allPostsArray)
                })
        },
        [])



    return <section>
        <h2>All Posts</h2>
        <div className="postsSection">
            <div>
                {
                    allPosts.map((post) => {
                        return <li className="postBox">
                            <img className="postPic" src={post.image_url} width="600px" alt=""></img>
                            <Link className="postName" to={`/posts/${post.id}`}>{post?.title}</Link>
                            <div className="postInfo">
                                <p>Author: {post.author}</p>
                                <p>Category: {post.category}</p>
                            </div>
                        </li>
                    }
                    )
                }
            </div>
        </div>
    </section >
}