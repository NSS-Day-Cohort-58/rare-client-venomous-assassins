import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { getPosts } from "../../managers/PostManager"
import { getCategories } from "../../managers/CategoryManager"
import { getUsers } from "../../managers/UserManager"




export const Posts = () => {

    const [allPosts, setAllPosts] = useState([])
    const [allCategories, setCategories] = useState([])
    const [selectedPosts, setSelectedPosts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [allUsers, setAllUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(0)
    

    useEffect(() => {
        getCategories().then(categoryData => setCategories(categoryData))
        getPosts()
        .then((allPostsArray) => {
            setAllPosts(allPostsArray)
        })
        getUsers()
                .then((allUsersArray) => {
                    setAllUsers(allUsersArray)
                })
    }, [])
    
        
   

    
    //state to hold all posts
    //state to hold filtered posts
    
    useEffect(
        () => {
            let selectedPostsArray = []
            if (selectedCategory !== 0) {
                setSelectedUser(0)
                allPosts.map(
                    (post) => {
                        if (selectedCategory === post.category_id) {
                            selectedPostsArray.push(post)
                        }
                    }
                    )
                    setSelectedPosts(selectedPostsArray)
            } else {
                setSelectedPosts(allPosts)
            }},
        [selectedCategory])

    useEffect(
        () => {
            let selectedPostsArray = []
            if (selectedUser !== 0) {
                setSelectedCategory(0)
                allPosts.map(
                    (post) => {
                        if (selectedUser === post.user_id) {
                            selectedPostsArray.push(post)
                        }
                    }
                    )
                    setSelectedPosts(selectedPostsArray)
            } else {
                setSelectedPosts(allPosts)
            }},
        [selectedUser])

    useEffect(
        () => {
            let selectedPostsArray = []
            if (selectedCategory !== 0) {
                allPosts.map(
                    (post) => {
                        if (selectedCategory === post.category_id) {
                            selectedPostsArray.push(post)
                        }
                    }
                    )
                    setSelectedPosts(selectedPostsArray)
            } else if (selectedUser !== 0) {
                allPosts.map(
                    (post) => {
                        if (selectedUser === post.user_id) {
                            selectedPostsArray.push(post)
                        }
                    }
                    )
                    setSelectedPosts(selectedPostsArray)
            } else {
                    setSelectedPosts(allPosts)
                    
            }},
        [allPosts])
            
    
    let handleCategoryChange = (e) => {
        setSelectedCategory(parseInt(e.target.value))
    }        
    let handleAuthorChange = (e) => {
        setSelectedUser(e.target.value)
    }


//separate module for dropdown function
//export const Categories
//let html = <select id="category">
//html += <option value ="0">Search by Category</option>
//map through categories
//<option selected value="${category.id}">${category.name}</option>

    return <section>
        <h2>All Posts</h2>
        <div className="category">
            {/* Displaying the value of fruit */}
            
            <br />

            <select onChange={handleCategoryChange}> 
                <option value={0}>Search by Category</option>
                        {/* Mapping through each fruit object in our fruits array
                    and returning an option element with the appropriate attributes / values.
                    */}
                {allCategories.map((category) => <option value={category.id}>{category.label}</option>)}
            </select>
        </div>
        <div className="author">
            {/* Displaying the value of fruit */}
            
            <br />

            <select onChange={handleAuthorChange}> 
                <option value={0}>Search by Author</option>
                        {/* Mapping through each fruit object in our fruits array
                    and returning an option element with the appropriate attributes / values.
                    */}
                {allUsers.map((user) => <option value={user.id}>{user.username}</option>)}
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