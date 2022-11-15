import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { deleteComment } from "../../managers/CommentManager"

export const Comments = () => {
    const { postId } = useParams()
    const [comments, setComments] = useState([])
    const navigate = useNavigate()
    const localUser = localStorage.getItem("auth_token")
    const userObject = JSON.parse(localUser)

    useEffect(
        () => {
            fetch(`http://localhost:8000/comments/${postId}`)
                .then(response => response.json())
                .then((commentsArray) => {
                    setComments(commentsArray)
                })
        },
        [postId])

    const removeComment = (id) => {
        return fetch(`http://localhost:8000/comments/${id}`, {
            method: "DELETE"
        })
        .then(()=>{
            window.location.reload()
        })
    }

    return <section>
        <h2>All Comments</h2>
        <div className="commentsSection">
            {
                comments.map((comment) => {
                    let author = false
                    if(comment.author_id === userObject){
                        author = true
                    }
                    return <li className="commentBox">
                        <div className="postInfo">
                            <p>{comment?.content}</p>
                            {
                                author
                                ? <button onClick={()=> removeComment(comment.id)}>&#128465;</button>
                                : ""
                            }
                        </div>
                    </li>
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

