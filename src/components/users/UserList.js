import { useEffect, useState } from "react"
import { Link, useResolvedPath } from "react-router-dom"
import { getUsers } from "../../managers/UserManager"

export const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers().then(usersData => setUsers(usersData))
  }, [])

  const sortedUsers = users.sort((a, b) => a.username.localeCompare(b.username))


  return (
    <>
      {
        sortedUsers.map(user => {
          let staffType = null
          if (user.is_staff === "True") {
            staffType = "Admin"
          } else {
            staffType = "Not Admin"
          }
          return <section>
            <Link to={`/users/${user?.id}`}>{user?.username}</Link>
            <p>{user?.full_name}</p>
            <p>{user?.email}</p>
            <p>{staffType}</p>
          </section>
        })
      }
    </>
  )
}