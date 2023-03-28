import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadUser } from './../../store/loginSlice';

import { UserAccount } from '../../interfaces/userAccount';
import { Errors } from '../../interfaces/errorsRequest';

import { useIsLogged } from '../../hooks/userIsLogged';

import { ServerMessages } from './../../components/serverMessages'
import { Spinner } from '../../components/spinner';

import UserImg from './../../assets/user.png';

import TasksBackend from './../../services/tasksBackend';


export default function LoginRoute() {
    const activeUser = useIsLogged('/', undefined);

    const dispatch = useDispatch();

    const [userForm, setUserForm] = useState<UserAccount>({ email: "", password: "" });
    const [errors, setErrors] = useState<Errors>()
    const [loading, setLoading] = useState<boolean>(false)


    const handleChangeForm = (e: any) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value })
    }

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        TasksBackend.login(userForm).then(res => {
            if ('token' in res) {
                dispatch(loadUser({ 'correo': userForm.email, 'identificador': res.token }));
            } else {
                setErrors(res)
            }
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            setErrors(err)
        })
    }

    return (
        <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>

            <div className='w-full max-w-md space-y-8 p-4 pb-10 square-back'>
                <ServerMessages messages={errors} />
                <div>
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src={UserImg}
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Login in to your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email:
                                </label>
                                <input type="email"
                                    id="email-address"
                                    name="email"
                                    autoComplete="email"
                                    value={userForm.email}
                                    onChange={handleChangeForm}
                                    required
                                    className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
                                    placeholder="Email address"
                                    disabled={loading}
                                />

                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password:
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={userForm.password}
                                    onChange={handleChangeForm}
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
                                    placeholder="Password"
                                    disabled={loading}

                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <Link to='/signup' className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Create an account!
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full flex-col justify-center
                                items-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={loading}
                            >
                                {loading ?
                                    <Spinner size='.5em' color="#ffffff" />
                                    :
                                    "Login"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}