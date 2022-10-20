import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useState } from "react"


export const Posts = () => {

    const [allPosts, setAllPosts] = useState([])



    useEffect(
        () => {
            fetch(`http://localhost:8088/posts`)
                .then(response => response.json())
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
                            <img className="postPic" src={post.image_url} alt=""></img>
                            <Link className="postName" to={`/posts/${post.id}`}>{post?.title}</Link>
                            <div className="postInfo">
                                <p>Author: {post.user.first_name} {post.user.last_name}</p>
                                <p>Category: {post.category.label}</p>
                            </div>
                        </li>
                    }
                    )
                }
            </div>
        </div>
    </section >
}