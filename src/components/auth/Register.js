import { useState } from "react"
import { useRef } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"

export const Register = ({ setToken }) => {
  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const username = useRef()
  const bio = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const passwordDialog = useRef()
  const navigate = useNavigate()

  const [isStaff, setStaff] = useState(false)
  const [profilePic, setPic] = useState("")

  const handleRegister = (e) => {
    e.preventDefault()

    if (password.current.value === verifyPassword.current.value) {

      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        bio: bio.current.value,
        is_staff: isStaff,
        profile_image_url: profilePic
      }

      if (newUser.profile_image_url === "") {
        newUser.profile_image_url = "https://res.cloudinary.com/dupram4w7/image/upload/v1663620931/Screen_Shot_2022-09-19_at_2_ey3w9e.png"
      }


      registerUser(newUser)
        .then(res => {
          if ("token" in res) {
            setToken(res.token)
            navigate("/")
          }
        })
    } else {
      passwordDialog.current.showModal()
    }
  }

  return (
    <section className="columns is-centered">
      <form className="column is-two-thirds" onSubmit={handleRegister}>
        <h1 className="title">Rare Publishing</h1>
        <p className="subtitle">Create an account</p>
        <div className="field">
          <label className="label">First Name</label>
          <div className="control">
            <input className="input" type="text" ref={firstName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input className="input" type="text" ref={lastName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input className="input" type="text" ref={username} />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="email" ref={email} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="field-body">
            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Password" ref={password} />
              </p>
            </div>

            <div className="field">
              <p className="control is-expanded">
                <input className="input" type="password" placeholder="Verify Password" ref={verifyPassword} />
              </p>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Bio</label>
          <div className="control">
            <textarea className="textarea" placeholder="Tell us about yourself..." ref={bio}></textarea>
          </div>
        </div>

        <div className="field">
          <label className="label">Profile Image URL</label>
          <div className="control">
            <input className="input" type="profile_image_url" value={profilePic}
              onChange={(evt) => {
                setPic(evt.target.value)
              }} />
          </div>
        </div>
        <div className="field">
          <label className="label">Check if Staff
            <input type="checkbox"
              onClick={() => {
                isStaff
                  ? setStaff(false)
                  : setStaff(true)
              }}>
            </input>
          </label>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" type="submit">Submit</button>
          </div>
          <div className="control">
            <Link to="/login" className="button is-link is-light">Cancel</Link>
          </div>
        </div>

      </form>
    </section >
  )
}
