import React, { useState } from "react"

import { Errors } from "../../interfaces/errorsRequest"

import { ServerMessages } from './../../components/serverMessages'

import TasksBackend from './../../services/tasksBackend'

export default function PasswordResetRoute() {
    const [email, setEmail] = useState("")
    const [messages, setMessages] = useState<Errors>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSubmitPasswordReset = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        TasksBackend.resetPassword(email).then(res => {
            if ('detail' in res) {
                setMessages({ 'success': [res['detail']] })
            } else {
                setMessages(res)
            }
        })
    }

    return (
        <div>
            <h1>Password Reset</h1>
            <p>We will send you an email with a code to change your password</p>
            <p>If you don't recive anything maybe you need to create an account first</p>
            <form onSubmit={handleSubmitPasswordReset}>
                <label htmlFor="resetEmail">
                    Email:
                    <input type="email" name="resetEmail" value={email} onChange={handleChange} placeholder="youremail@email.com" />
                </label>
                <button type="submit">Send Email</button>
            </form>
            <ServerMessages messages={messages} />
        </div>
    )
}