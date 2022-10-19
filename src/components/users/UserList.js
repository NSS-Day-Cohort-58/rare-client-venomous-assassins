import { useEffect, useState } from "react"
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
                <h3>{user.username}</h3>
                <p>{user.first_name} {user.last_name}</p>
                <p>{user.email}</p>
                </section>
            })
        }
        </>
      )
}