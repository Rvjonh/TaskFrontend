import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Task } from '../../interfaces/tasks';

import { useIsLogged } from './../../hooks/userIsLogged';

import TasksBackend from './../../services/tasksBackend';

export default function TaskDetails() {
    const activeUser = useIsLogged();
    const taskId = useParams<{ id: string }>().id;
    const [selectedTask, setSelectedTask] = useState<Task>({
        "created_at": "",
        "description": "",
        "id": -1,
        "title": "",
        "updated_at": "",
        "user": -1,
    });

    useEffect(() => {
        if (activeUser.active && taskId != undefined) {
            TasksBackend.getTask(taskId, activeUser.token).then(res => {
                setSelectedTask(res)
            })
        }
    }, [activeUser.active])


    if (!activeUser.active) {
        return <h1>You need to log in first</h1>
    }

    return (
        <div>
            <h2>Task Details {taskId}</h2>
            <article style={{ border: "1px solid purple" }}>
                <h2>{selectedTask.title}</h2>
                <p>{selectedTask.description}</p>
                <p>{selectedTask.created_at}</p>
                <p>{selectedTask.updated_at}</p>
            </article>
        </div>
    );
}