import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './../../store/loginSlice';
import { Link } from 'react-router-dom';

import { UserAccount } from '../../interfaces/userAccount';
import { Errors } from '../../interfaces/errorsRequest';

import { useIsLogged } from '../../hooks/userIsLogged';
import { ServerMessages } from './../../components/serverMessages'
import { Spinner } from '../../components/spinner';

import TasksBackend from './../../services/tasksBackend';

import TaskImg from './../../assets/task.png';

export default function SignUpRoute() {
    const activeUser = useIsLogged('/', undefined);

    const dispatch = useDispatch();

    const [userForm, setUserForm] = useState<UserAccount>({ email: "", password: "" });
    const [errors, setErrors] = useState<Errors>()
    const [loading, setLoading] = useState<boolean>(false)

    const handleChangeForm = (e: any) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value })
    }

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        TasksBackend.signup(userForm).then(res => {
            if ('token' in res) {
                dispatch(loadUser({ 'correo': userForm.email, 'identificador': res.token }));
            } else {
                setErrors(res)
            }
            setLoading(false)
        }).catch(err => {
            setErrors(err)
            setLoading(false)
        })
    }

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <ServerMessages messages={errors} />
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src={TaskImg}
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            start your 14-day free trial
                        </a>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
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
                                Password
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

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link to='/login' className="font-medium text-indigo-600 hover:text-indigo-500">
                                I have an account
                            </Link>
                        </div>
                        <div className="text-sm">
                            <Link to='/password-reset' className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={loading}
                        >
                            {loading ?
                                <Spinner size='.5em' color="#ffffff" />
                                :
                                "Sign in"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}