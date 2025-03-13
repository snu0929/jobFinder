import React, { useState } from 'react'
import axios from 'axios'
export const Signup = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let user = {
                username,
                email,
                password
            }
            let res = await axios.post("http://localhost:8080/user/register", user)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setUsername(e.target.value)} placeholder='username' />
                <input onChange={(e) => setEmail(e.target.value)} placeholder='email' />
                <input onChange={(e) => setPassword(e.target.value)} placeholder='password' />
                <input type='submit' />
            </form>
        </div>
    )
}
