import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getPosts } from "../../managers/PostManager"
import { useNavigate } from "react-router-dom"




export const MyPosts = () => {
    const [allPosts, setAllPosts] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getPosts()
                .then((allPostsArray) => {
                    setAllPosts(allPostsArray)
                })
        },
        [])


    const deletePost = (evt) => {

        return fetch(`http://localhost:8088/posts/${evt.target.value}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch(`http://localhost:8088/posts`)
                    .then(response => response.json())
                    .then((postArray) => {
                        setAllPosts(postArray)
                    })

            })
    }


    const toDeleteOrNot = (evt) => {
        if (window.confirm("Are you sure you want to delete?\n Either Ok or Cancel.") == true) {
            deletePost(evt);
        } else {
            navigate(`/my_posts`);
        }
    }

    const localUser = localStorage.getItem("auth_token")
    const userObject = JSON.parse(localUser)

    const myPosts = allPosts.filter(post => userObject === post.user_id)


    if (myPosts.length === 0) {
        return <div>You have no posts created yet!</div>
    }
    else {
        return <section>
            <h2>My Posts</h2>
            <div className="postsSection">
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
                                <button>Edit</button>
                                <button
                                    value={post.id}
                                    onClick={(clickEvent) => toDeleteOrNot(clickEvent)}
                                    className="delete-button">
                                    Delete
                                </button>
                            </li>
                        }
                    )
                }
            </div>
        </section>
    }
}