import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from 'react-router-dom';

import { useIsLogged } from "../../hooks/userIsLogged";

import { addTask } from './../../store/historySlice';

import { TaskCreation } from "../../interfaces/tasks";
import { Errors } from '../../interfaces/errorsRequest';

import { ServerMessages } from './../../components/serverMessages'

import TasksBackend from "../../services/tasksBackend";


export default function TaskRoute() {
    const navigate = useNavigate();
    const taskId = useParams<{ id: string }>().id;
    const dispatch = useDispatch();
    const userActive = useIsLogged(undefined, '/');

    const [serverMessages, setServerMessages] = useState<Errors>()

    const [taskForm, setTaskForm] = useState<TaskCreation>({
        "title": "",
        "description": ""
    })

    useEffect(() => {
        if (taskId != undefined) {
            TasksBackend.getTask(taskId, userActive.token)
                .then(res => {
                    if (!res.ok) {
                        throw { status: res.status, data: res.json() };
                    }
                    return res.json()
                })
                .then(res => {
                    setTaskForm(res)
                })
                .catch((err) => {
                    err.data.then(setServerMessages);
                })

        } else {
            setTaskForm({
                "title": "",
                "description": ""
            })
        }
    }, [taskId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskForm({ ...taskForm, [e.target.name]: e.target.value })
    }

    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTaskForm({ ...taskForm, [e.target.name]: e.target.value })
    }

    const handleCreation = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (taskId != undefined) {

            TasksBackend.updateTask(taskId, taskForm, userActive.token)
                .then(res => {
                    if (!res.ok) {
                        throw { status: res.status, data: res.json() };
                    }
                    return res.json()
                })
                .then(res => {
                    navigate('/task/' + taskId + "/")
                })
                .catch((err) => {
                    err.data.then(setServerMessages);
                })

        } else {
            TasksBackend.createTask(taskForm, userActive.token)
                .then(res => {
                    if (!res.ok) {
                        throw { status: res.status, data: res.json() };
                    }
                    return res.json()
                })
                .then(res => {
                    dispatch(addTask(res))
                    navigate('/task/' + res.id + "/")
                })
                .catch((err) => {
                    err.data.then(setServerMessages);
                })
        }
    }

    return (
        <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className="w-full max-w-md space-y-8  p-4 pb-10 square-back">

                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Task Creation
                </h2>

                <ServerMessages messages={serverMessages} />

                <form className="flex flex-col" onSubmit={handleCreation}>

                    <label className="flex flex-col" htmlFor="title">
                        Title:
                        <input type="text"
                            name="title"
                            value={taskForm.title}
                            onChange={handleChange}
                            placeholder="Title"
                            required
                            maxLength={100}
                            className="w-full border-2 rounded border-blue-500 p-2"
                        />
                    </label>

                    <label className="" htmlFor="description">
                        Description:
                        <textarea
                            name="description"
                            id="description"
                            value={taskForm.description}
                            onChange={handleChangeText}
                            rows={10}
                            placeholder="an awesome description"
                            required
                            maxLength={255}
                            className="w-full border-2 rounded border-blue-500 p-2"
                        >
                        </textarea>
                    </label>

                    <div className="flex items-center justify-between">
                        <Link to='/' className="group relative flex justify-center rounded-md  py-2 px-3 text-sm font-semibold text-white  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 bg-red-600 hover:bg-red-500">
                            Cancel
                        </Link>
                        <button type="submit" className="group relative flex justify-center rounded-md bg-green-600 py-2 px-3 text-sm font-semibold text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                            {taskId != undefined ? "Update " : "Create "}Task
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}