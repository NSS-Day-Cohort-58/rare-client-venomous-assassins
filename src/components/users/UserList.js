import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUsers } from "../../managers/UserManager"

export const UserList = () => {
    const [users,setUsers] = useState([])

    useEffect(() => {
        getUsers().then(usersData => setUsers(usersData))
      }, [])


      return (
        <>
        {
            users.map(user => {
                return <section>
                <Link to={`/users/${user.id}`}>{user?.username}</Link>
                <p>{user?.first_name} {user?.last_name}</p>
                <p>{user?.email}</p>
                </section>
            })
        }
        </>
      )
}