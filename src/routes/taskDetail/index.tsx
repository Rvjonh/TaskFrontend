import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Task } from '../../interfaces/tasks';

import { useIsLogged } from './../../hooks/userIsLogged';

import { Errors } from '../../interfaces/errorsRequest';
import { ServerMessages } from './../../components/serverMessages'
import DeleteButton from './../../components/deleteButton';

import TasksBackend from './../../services/tasksBackend';

export default function TaskDetails() {
    const activeUser = useIsLogged(undefined, '/');
    const taskId = useParams<{ id: string }>().id;
    const [selectedTask, setSelectedTask] = useState<Task>({
        "created_at": "",
        "description": "",
        "id": -1,
        "title": "",
        "updated_at": "",
        "user": -1,
    });

    const [serverMessages, setServerMessages] = useState<Errors>()


    useEffect(() => {
        if (activeUser.active && taskId != undefined) {
            TasksBackend.getTask(taskId, activeUser.token)
                .then(res => {
                    if (!res.ok) {
                        throw { status: res.status, data: res.json() };
                    }
                    return res.json()
                })
                .then(res => {
                    setSelectedTask(res)
                })
                .catch((err) => {
                    err.data.then(setServerMessages);
                })

        }
    }, [activeUser.active])


    if (!activeUser.active) {
        return <h1>You need to log in first</h1>
    }
    if (serverMessages) {
        return <ServerMessages messages={serverMessages} />
    }

    return (
        <div>
            <h2>Task Details {taskId}</h2>
            <article style={{ border: "1px solid purple" }}>
                <h2>{selectedTask.title}</h2>
                <p>{selectedTask.description}</p>
                <p>{selectedTask.created_at}</p>
                <p>{selectedTask.updated_at}</p>
                <Link to={`update/`}>Update</Link>
                <DeleteButton taskID={`${taskId}`} redirect='/' />
            </article>
        </div>
    );
}