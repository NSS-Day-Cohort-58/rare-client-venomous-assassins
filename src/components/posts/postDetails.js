import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export const PostDetails = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const [post, setPost] = useState({})

    const [postTags, setPostTags] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/posts/${postId}`)
                .then(response => response.json())
                .then((postObject) => {
                    setPost(postObject)
                })
            .then(() => 
            fetch(`http://localhost:8088/post_tags?post_id=${postId}`)
                .then(response => response.json())
            )
            .then(postTagsArray => {
                setPostTags(postTagsArray)
            })
        },
        [postId])

    return <div className="postBox">
        <div className="postTitle">{post?.title}</div>
        <img className="postImage" src={post?.image_url} alt=""></img>
        <Link to={`/users/${post?.user?.id}`} className="author">Author: {post?.user?.first_name} {post?.user?.last_name}</Link>
        <div className="postDate">Publication Date: {post?.publication_date} </div>
        <div className="postCategory"> Category: {post?.category?.label}</div>
        <div>Content: {post?.content} </div>
        <div>
            {
                postTags.map(tag => <div className="tag">{tag.tag.label}</div>)
            }
        </div>
        <button
            value={post.id}
            onClick={(clickEvent) => navigate(`/comments/${postId}`)}
            className="comments-button"
        >View All Comments</button>
        <button
            value={postId}
            onClick={(clickEvent) => navigate(`/addComment/${postId}`)}
            className="add-button"
        >Add Comment</button>

    </div>
}

//work on displaying tags selected