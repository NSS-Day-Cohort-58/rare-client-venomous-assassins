import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getCreatedPosts, getPosts } from "../../managers/PostManager"





export const MyPosts = () => {
    const [allPosts, setAllPosts] = useState([])
    const [myPosts, setMyPosts] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getCreatedPosts()
                .then((posts) => {
                    setMyPosts(posts)
                })
        },
        [])


    const deletePost = (evt) => {

        return fetch(`http://localhost:8000/posts/${evt.target.value}`, {
            method: "DELETE"
        })
            .then(() => {
                fetch(`http://localhost:8000/posts`)
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
                            return <li className="postBox" key={post.id}>
                                <img className="postPic" src={post.image_url} width="600px" alt=""></img>
                                <Link className="postName" to={`/posts/${post.id}`}>{post?.title}</Link>
                                <div className="postInfo">
                                    <p>Author: {post.user.first_name} {post.user.last_name}</p>
                                    <p>Category: {post.category.label}</p>
                                </div>
                                <button id={post.id}
                                    onClick={
                                        (evt) => {
                                            let postId = evt.target.id
                                            navigate(`/edit_post/${postId}`)
                                        }
                                    }>Edit</button>
                                <button value={post.id} className="delete-button" onClick={(clickEvent) => toDeleteOrNot(clickEvent)}
                                >Delete</button>
                            </li>
                        }
                    )
                }
            </div>
        </section>
    }
}