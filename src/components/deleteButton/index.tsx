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
}

export default function DeleteButton({ taskID,
    redirect = undefined,
    buttonText = 'Delete',
    buttonTextConfirmation = 'Delete',
    buttonTextCancel = 'Cancel' }: ButtonDeleteArgs) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userActive = useIsLogged();

    const [show, setShow] = useState<boolean>(true);

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
            {show ?
                <button onClick={handleShowConfirmation}>
                    {buttonText}
                </button>
                :
                <div>
                    <button onClick={handleDeletion}>
                        {buttonTextConfirmation}
                    </button>
                    <button onClick={handleShowConfirmation}>
                        {buttonTextCancel}
                    </button>
                </div>
            }
        </div >
    )
}