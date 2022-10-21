import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useState } from "react"


export const PostDetails = () => {
    const { postId } = useParams()

    const [post, setPost] = useState({})


    useEffect(
        () => {
            fetch(`http://localhost:8088/posts/${postId}`)
                .then(response => response.json())
                .then((postObject) => {
                    setPost(postObject)
                })
        },
        [postId])

    return <div className="postBox">
        <div className="postTitle">{post?.title}</div>
        <img className="postImage" src={post?.image_url} alt=""></img>
        <div className="author">Author: {post?.user?.first_name} {post?.user?.last_name}</div>
        <div className="postDate">Publication Date: {post?.publication_date} </div>
        <div className="postCategory"> Category: {post?.category?.label}</div>
        <div>Content: {post?.content} </div>
    </div>
}