import axios from 'axios'
import React, { useState } from 'react'

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const loginData = {
                email,
                password
            }
            const res = await axios.post("http://localhost:8080/user/login", loginData)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Box>
            <form onSubmit={handleLogin}>
                <input placeholder='email' onChange={(e) => setEmail(e.target.value)} value={email} />
                <input placeholder='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                <input type='submit' />
            </form>
        </Box>
    )
}
