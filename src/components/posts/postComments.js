import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { deleteComment } from "../../managers/CommentManager"

export const Comments = () => {
    const { postId } = useParams()
    const [comments, setComments] = useState([])
    const navigate = useNavigate()
    

    useEffect(
        () => {
            fetch(`http://localhost:8000/comments?post=${postId}`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("auth_token")}`
                }
            })
                .then(response => response.json())
                .then((commentsArray) => {
                    setComments(commentsArray)
                })
        },
        [postId])

    const removeComment = (id) => {
        return fetch(`http://localhost:8000/comments/${id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
            .then(() => {
                window.location.reload()
            })
    }

    return <section>
        <h2>All Comments</h2>
        <div className="commentsSection">
            {
                comments.map((comment) => {
                    
                    return <div className="commentBox">
                        <div className="postInfo">
                            <p>{comment.content}</p>
                            {
                                comment.created
                                ? <button onClick = {
                                    () => {
                                        removeComment(comment.id)
                                    }
                                }>Delete</button>
                                : ""
                            }
                            
                        </div>
                    </div>
                }
                )
            }
        </div>
        <button
            value={postId}
            onClick={(clickEvent) => navigate(`/addComment/${postId}`)}
            className="add-button"
        >Add Comment</button>
    </section >
}

