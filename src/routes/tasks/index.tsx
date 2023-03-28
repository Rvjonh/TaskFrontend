import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';

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
    const userActive = useIsLogged();

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

    if (!userActive.active) {
        return <h2>you need to log in to add tasks</h2>
    }
    return (
        <div>
            <h2>Task CREATION</h2>
            <form onSubmit={handleCreation}>
                <label htmlFor="title">
                    Title:
                    <input type="text" name="title" value={taskForm.title} onChange={handleChange} placeholder="title" required />
                </label>
                <label htmlFor="description">
                    Description:
                    <input type="text" name="description" value={taskForm.description} onChange={handleChange} placeholder="description" required />
                </label>
                <button type="submit">
                    {taskId != undefined ?
                        "Update"
                        :
                        "Create"
                    }
                    Task
                </button>
            </form>
            <ServerMessages messages={serverMessages} />
        </div>
    )
}