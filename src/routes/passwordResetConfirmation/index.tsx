import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import { MyResetPasswordConfirmationForm } from "../../interfaces/passwordResetConfirmation";
import { Errors } from "../../interfaces/errorsRequest";

import { ServerMessages } from "../../components/serverMessages";
import { Spinner } from "../../components/spinner";

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
    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        TasksBackend.resetPasswordConfirm(userForm)
            .then(res => {
                if ('detail' in res) {
                    setMessages({ 'detail': [res['detail']] })
                } else {
                    setMessages(res)
                }
                setLoading(false)
            })
    }
    const showLoginButton = () => {
        if (messages) {
            const keys_msjs = Object.keys(messages);
            return keys_msjs.includes('detail') || keys_msjs.includes('token');
        }
        return false;
    }

    return (
        <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-md space-y-8 p-4 pb-10 square-back'>

                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Password change</h2>

                <p className="text-justify">Welcome, you can change your password here:</p>

                <ServerMessages messages={messages} />

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="new_password1" className="sr-only">
                            Password:
                        </label>
                        <input
                            id="password1"
                            type="password"
                            name="new_password1"
                            value={userForm.new_password1}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                            className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
                            placeholder="New Password 1"
                            disabled={showLoginButton()}

                        />
                    </div>

                    <div>
                        <label htmlFor="new_password2" className="sr-only">
                            Password:
                        </label>
                        <input
                            id="password2"
                            type="password"
                            name="new_password2"
                            value={userForm.new_password2}
                            onChange={handleChange}
                            autoComplete="current-password"
                            required
                            className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
                            placeholder="New Password 2"
                            disabled={showLoginButton()}
                        />
                    </div>
                    {showLoginButton() &&
                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <Link to='/password-reset' className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Ask new token for your password?
                                </Link>
                            </div>
                        </div>
                    }
                    <div>
                        {!showLoginButton() ?
                            <button
                                type="submit"
                                className="group relative flex w-full flex-col justify-center
                                items-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={loading}
                            >
                                {loading ?
                                    <Spinner size='.5em' color="#ffffff" />
                                    :
                                    "Change Password"
                                }
                            </button>
                            :
                            <Link to='/login'
                                className="group relative flex w-full flex-col justify-center
                            items-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Log in
                            </Link>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}