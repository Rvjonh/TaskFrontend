import { useState } from "react"
import { useDispatch } from "react-redux"

import { useIsLogged } from "../../hooks/userIsLogged"

import { addTask } from './../../store/historySlice';

import { TaskCreation } from "../../interfaces/tasks"

import TasksBackend from "../../services/tasksBackend"

export default function TaskRoute() {
    const dispatch = useDispatch();
    const userActive = useIsLogged();


    const [taskForm, setTaskForm] = useState<TaskCreation>({
        "title": "",
        "description": ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskForm({ ...taskForm, [e.target.name]: e.target.value })
    }

    const handleCreation = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        TasksBackend.createTask(taskForm, userActive.token)
            .then(res => {
                dispatch(addTask(res))
            })
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
                <button type="submit">Create Task</button>
            </form>
        </div>
    )
}