import { useState } from 'react';

import { useIsLogged } from '../../hooks/userIsLogged';
import { PasswordChangeForm } from '../../interfaces/passwordChangeForm';
import { Errors } from '../../interfaces/errorsRequest';

import { ServerMessages } from './../../components/serverMessages';
import { Spinner } from "../../components/spinner";

import TasksBackend from './../../services/tasksBackend';

export default function PasswordChangeRoute() {
    const activeUser = useIsLogged(undefined, '/login');

    const [userForm, setUserForm] = useState<PasswordChangeForm>({
        "old_password": "",
        "new_password1": "",
        "new_password2": ""
    });
    const [messages, setMessages] = useState<Errors>()
    const [loading, setLoading] = useState<boolean>(false)

    const handleChangeForm = (e: any) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        TasksBackend.changePassword(userForm, activeUser.token).then(res => {
            setMessages(res)
            setLoading(false)
        })
    }

    return (
        <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-md space-y-8 p-4 pb-10 square-back'>

                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Change password
                </h2>

                <p className="text-justify">Welcome, you can change your password here:</p>

                <ServerMessages messages={messages} />

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="old_password" className="sr-only">
                            Old password:
                        </label>
                        <input
                            id="password1"
                            type="password"
                            name="old_password"
                            value={userForm.old_password}
                            onChange={handleChangeForm}
                            required
                            className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
                            placeholder="Old password"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="new_password1" className="sr-only">
                            New password 1:
                        </label>
                        <input
                            id="password2"
                            type="password"
                            name="new_password1"
                            value={userForm.new_password1}
                            onChange={handleChangeForm}
                            required
                            className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
                            placeholder="New password 1:"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="new_password2" className="sr-only">
                            New password 2:
                        </label>
                        <input
                            id="password3"
                            type="password"
                            name="new_password2"
                            value={userForm.new_password2}
                            onChange={handleChangeForm}
                            required
                            className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
                            placeholder="New password 2:"
                            disabled={loading}
                        />
                    </div>

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

                </form>
            </div>
        </div>
    )
}