import { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import axios from 'axios'
import Login from './Login'

export default function Profile(props) {
  // state is information from the server
  const [message, setMessage] = useState('')

  // hit the auth locked route on the backend
  useEffect(() => {
    const getPrivateMessage = async () => {
      try {
        // get the jwt from local storage
        const token = localStorage.getItem('jwtToken')

        // make up the auth headers
        const authHeaders = {
          Authorization: token
        }

        // hit the auth locked endpoint
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, { headers: authHeaders})
        // set state with the data from the server
        setMessage(response.data.msg)
      } catch (err) {
        console.log(err)
        // log the user out if an error occurs
        props.handleLogout()
      }
    }
    getPrivateMessage()
  }, [props])

  // redirect if there is no user in state
  if(!props.currentUser) return <Redirect to='/login' component={ Login } currentUser={ props.currentUser } />

  return (
    <div>
      <h4>greetings {props.currentUser.name} 👋</h4>
      <h5>your email is {props.currentUser.email}</h5>

      <div>
        <p>you have a secret message from the authorized user area:</p>

        <p>{message}</p>
      </div>
    </div>
  )
}