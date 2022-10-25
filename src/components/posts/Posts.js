import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { getPosts, getPostsByCategory, getPostsByTag, getPostsByUser } from "../../managers/PostManager"
import { getCategories } from "../../managers/CategoryManager"
import { getUsers } from "../../managers/UserManager"
import { getTags } from "../../managers/Tags"




export const Posts = () => {

    const [allPosts, setAllPosts] = useState([])
    const [allTags, setAllTags] = useState([])
    const [allCategories, setCategories] = useState([])
    const [selectedPosts, setSelectedPosts] = useState([])
    const [allUsers, setAllUsers] = useState([])
    
    
    

    useEffect(() => {
        getCategories().then(categoryData => setCategories(categoryData))
        getTags().then(tagData => setAllTags(tagData))
        getPosts()
        .then((allPostsArray) => {
            setAllPosts(allPostsArray)
            setSelectedPosts(allPostsArray)
        })
        getUsers()
                .then((allUsersArray) => {
                    setAllUsers(allUsersArray)
                })
    }, [])
   
    
    let handleCategoryChange = (event) => {
        getPostsByCategory(event.target.value)
            .then(postsByCategoryArray => {
                setSelectedPosts(postsByCategoryArray)
            })
    }        
    let handleAuthorChange = (a) => {
        getPostsByUser(a.target.value)
            .then(postsByUserArray => {
                setSelectedPosts(postsByUserArray)
            })
    }
    let handleTagChange = (a) => {
        getPostsByTag(a.target.value)
            .then(postsByTagArray => {
                setSelectedPosts(postsByTagArray)
            })
    }

    return <section>
        <h2>All Posts</h2>
        <div className="category">
            <select onChange={handleCategoryChange}> 
                <option value={0}>Search by Category</option>
                {allCategories.map((category) => <option value={category.id}>{category.label}</option>)}
            </select>
        </div>
        <div className="author">
            <select onChange={handleAuthorChange}> 
                <option value={0}>Search by Author</option>
                {allUsers.map((user) => <option value={user.id}>{user.username}</option>)}
            </select>
        </div>
        <div className="tag">
            <select onChange={handleTagChange}> 
                <option value={0}>Search by Tag</option>
                {allTags.map((tag) => <option value={tag.id}>{tag.label}</option>)}
            </select>
        </div>
        <div className="postsSection">
            <div>
                {   
                    selectedPosts.map((post) => {
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