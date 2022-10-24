import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { getPosts } from "../../managers/PostManager"
import { getCategories } from "../../managers/CategoryManager"


export const Posts = () => {

    const [allPosts, setAllPosts] = useState([])
    const [allCategories, setCategories] = useState([])
    const [selectedPosts, setSelectedPosts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])

    useEffect(() => {
        getCategories().then(categoryData => setCategories(categoryData))
    }, [])

    useEffect(
        () => {
            getPosts()
                .then((allPostsArray) => {
                    setAllPosts(allPostsArray)
                })
        },
        [])
    //state to hold all posts
    //state to hold filtered posts
    useEffect(
        () => {
            selectedPosts
            ?
            setAllPosts(selectedPosts)
            :
            setAllPosts(allPosts)
        },
    [selectedPosts])

    useEffect(
        () => {
            let selectedPostsArray = []
            allPosts.map(
                (post) => {
                    if (selectedCategory === post.category_id) {
                        selectedPostsArray.push(post)
                    }
                }
            )
            setSelectedPosts(selectedPostsArray)
        },
    [selectedCategory])
    
    document.addEventListener(
        "change",
        (changeEvent) => {
            if (changeEvent.target.id === "category") {
                setSelectedCategory(parseInt(changeEvent.target.value))
            }
        }
    )


//separate module for dropdown function
//export const Categories
//let html = <select id="category">
//html += <option value ="0">Search by Category</option>
//map through categories
//<option selected value="${category.id}">${category.name}</option>

    return <section>
        <h2>All Posts</h2>
        <div className="searchByCategory">
            {   <>
                    <h2>Search By Category</h2>
                    <select id="category">
                        <option value="0">Select Category</option>
                        {
                            allCategories.map(
                                (category) => {
                                    return <option selected value={category.id}>{category.label}</option>
                                }
                            )
                        }
                    </select>
            
                </>
            }
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