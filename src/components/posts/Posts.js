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

//separate module for dropdown function
//export const Categories
//let html = <select id="category">
//html += <option value ="0">Search by Category</option>
//map through categories
//<option selected value="${category.id}">${category.name}</option>

    return <section>
        <h2>All Posts</h2>
        <div>
            <
        </div>
        <div className="postsSection">
            <div>
                {
                    allPosts.map((post) => {
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
            </div>
        </div>
    </section >
}