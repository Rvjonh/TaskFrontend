import { useState } from "react";
import { useParams } from "react-router-dom";

import { MyResetPasswordConfirmationForm } from "../../interfaces/passwordResetConfirmation";
import { Errors } from "../../interfaces/errorsRequest";

import { ServerMessages } from "../../components/serverMessages";

import TasksBackend from './../../services/tasksBackend'


export default function PasswordResetConfirmationRoute() {
    const { id, token } = useParams<{ id: string, token: string }>();
    const [userForm, setUserForm] = useState<MyResetPasswordConfirmationForm>({
        "new_password1": "",
        "new_password2": "",
        "uid": id ?? "",
        "token": token ?? ""
    })
    const [messages, setMessages] = useState<Errors>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        TasksBackend.resetPasswordConfirm(userForm)
            .then(res => {
                if ('detail' in res) {
                    setMessages({ 'detail': [res['detail']] })
                } else {
                    setMessages(res)
                }
            })
    }

    return (
        <div>
            <h2>Password change</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="new_password1">
                    new password:
                    <input type="password" name="new_password1" value={userForm.new_password1} onChange={handleChange} placeholder="your new password" />
                </label>
                <label htmlFor="new_password2">
                    new password:
                    <input type="password" name="new_password2" value={userForm.new_password2} onChange={handleChange} placeholder="your new password again" />
                </label>
                <button type="submit">Change Password</button>
            </form>
            <ServerMessages messages={messages} />
        </div>
    )
}