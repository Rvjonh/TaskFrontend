import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './../../store/loginSlice';

import { UserAccount } from '../../interfaces/userAccount';
import { Errors } from '../../interfaces/errorsRequest';

import { ServerMessages } from './../../components/serverMessages'

import TasksBackend from './../../services/tasksBackend';



export default function SignUpRoute() {
    const dispatch = useDispatch();

    const [userForm, setUserForm] = useState<UserAccount>({ email: "", password: "" });
    const [errors, setErrors] = useState<Errors>()

    const handleChangeForm = (e: any) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value })
    }

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        TasksBackend.signup(userForm).then(res => {
            if ('token' in res) {
                dispatch(loadUser({ 'correo': userForm.email, 'identificador': res.token }));
            } else {
                setErrors(res)
            }
        }).catch(err => {
            setErrors(err)
        })
    }

    return (
        <div>
            <h1>SignUp</h1>
            <form onSubmit={handleSignUp}>
                <label htmlFor="email">
                    <input type="email" name='email' value={userForm.email} onChange={handleChangeForm} placeholder='youremail@email.com' />
                </label>
                <label htmlFor="password">
                    <input type="password" name='password' value={userForm.password} onChange={handleChangeForm} placeholder='yourpassword' />
                </label>
                <button type="submit">SignUp</button>
            </form>
            <ServerMessages messages={errors} />
        </div>
    )
}