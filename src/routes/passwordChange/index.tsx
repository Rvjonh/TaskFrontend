import { useState } from 'react';

import { useIsLogged } from '../../hooks/userIsLogged';
import { PasswordChangeForm } from '../../interfaces/passwordChangeForm';
import { Errors } from '../../interfaces/errorsRequest';

import { ServerMessages } from './../../components/serverMessages';

import TasksBackend from './../../services/tasksBackend';

export default function PasswordChangeRoute() {
    const activeUser = useIsLogged(undefined, '/login');

    const [userForm, setUserForm] = useState<PasswordChangeForm>({
        "old_password": "",
        "new_password1": "",
        "new_password2": ""
    });
    const [messages, setMessages] = useState<Errors>()

    const handleChangeForm = (e: any) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        TasksBackend.changePassword(userForm, activeUser.token).then(res => {
            setMessages(res)
        })
    }

    return (
        <div>
            <h1>Change password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="old_password">
                    <input type="password" name='old_password' value={userForm.old_password} onChange={handleChangeForm} placeholder='yourpassword' />
                </label>
                <label htmlFor="new_password1">
                    <input type="password" name='new_password1' value={userForm.new_password1} onChange={handleChangeForm} placeholder='yourpassword' />
                </label>
                <label htmlFor="new_password2">
                    <input type="password" name='new_password2' value={userForm.new_password2} onChange={handleChangeForm} placeholder='yourpassword' />
                </label>
                <button type="submit">Change password</button>
            </form>
            <ServerMessages messages={messages} />
        </div>
    )
}