import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { removeTask } from "../../store/taskSlice";

import { useIsLogged } from "../../hooks/userIsLogged";

import TasksBackend from './../../services/tasksBackend';

interface ButtonDeleteArgs {
    taskID: string;
    redirect?: string | undefined;
    buttonText?: string;
    buttonTextConfirmation?: string;
    buttonTextCancel?: string;
    title?: string;
    message?: string;
}

export default function DeleteButton({ taskID,
    redirect = undefined,
    buttonText = 'Delete',
    buttonTextConfirmation = 'Delete',
    buttonTextCancel = 'Cancel',
    title = "Delete Task",
    message = "Are you sure you want to delete it?" }: ButtonDeleteArgs) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userActive = useIsLogged();

    const [show, setShow] = useState<boolean>(false);

    const handleShowConfirmation = () => {
        setShow(!show)
    }

    const handleDeletion = () => {
        if (taskID != undefined) {
            TasksBackend.deleteTask(taskID, userActive.token)
                .then(res => {
                    if (res.ok) {
                        if (redirect != undefined) {
                            navigate(redirect)
                        }
                        dispatch(removeTask({ id: Number(taskID) }))
                        handleShowConfirmation()
                    } else {
                        throw { status: res.status, data: res.json() };
                    }
                }).catch(err => {
                    dispatch(removeTask({ id: Number(taskID) }))
                    //err.data.then(console.log); // no found
                })
        }
    }

    return (
        <div>
            <button onClick={handleShowConfirmation} type="submit" className="group relative flex justify-center rounded-md  py-2 px-3 text-sm font-semibold text-white  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 hover:bg-red-500 bg-red-600">
                {buttonText}
            </button>
            {show &&
                /* Modal */
                <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center" >
                    <div className="flex items-end justify-center items-center min-h-screen pt-4 px-4 pb-20 text-center ">

                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">

                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            {title}
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-between">
                                <button onClick={handleShowConfirmation} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                                    {buttonTextCancel}
                                </button>
                                <button onClick={handleDeletion} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm animate-pulse">
                                    {buttonTextConfirmation}
                                </button>
                            </div>
                        </div>
                    </div>
                </div >
            }
        </div >
    )
}