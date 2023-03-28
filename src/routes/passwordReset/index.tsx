import React, { useState } from "react"

import { Errors } from "../../interfaces/errorsRequest"

import { ServerMessages } from './../../components/serverMessages'
import { Spinner } from "../../components/spinner"

import TasksBackend from './../../services/tasksBackend'

export default function PasswordResetRoute() {
    const [email, setEmail] = useState("")
    const [messages, setMessages] = useState<Errors>()
    const [loading, setLoading] = useState<boolean>(false)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSubmitPasswordReset = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        TasksBackend.resetPassword(email).then(res => {
            if ('detail' in res) {
                setMessages({ 'success': [res['detail']] })
            } else {
                setMessages(res)
            }
            setLoading(false)
        })
    }

    return (
        <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-md space-y-8'>

                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Password Reset</h2>
                <p className="text-justify">We will send you an email with a code to change your password</p>
                <p className="text-justify">If you don't recive anything maybe you need to create an account first</p>
                <ServerMessages messages={messages} />
                <form className="mt-8 space-y-6" onSubmit={handleSubmitPasswordReset}>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="resetEmail" className="sr-only">
                                Email:
                            </label>
                            <input type="email"
                                id="email-address"
                                name="resetEmail"
                                autoComplete="email"
                                value={email}
                                onChange={handleChange}
                                required
                                className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-1"
                                placeholder="Email address"
                                disabled={loading}
                            />
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
    )
}