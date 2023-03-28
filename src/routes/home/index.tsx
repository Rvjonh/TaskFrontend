import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { useIsLogged } from "../../hooks/userIsLogged"
import { RootState } from "../../store/store";

import { setTasks } from './../../store/taskSlice';

import TasksBackend from './../../services/tasksBackend';

export default function HomeRoute() {
    const dispatch = useDispatch();
    const userActive = useIsLogged();
    const { tasks } = useSelector((state: RootState) => state.tasks);

    useEffect(() => {
        if (userActive.active) {
            TasksBackend.getTasks(userActive.token).then(res => {
                dispatch(setTasks(res))
            })
        }
    }, [userActive.active])


    if (!userActive.active) {
        return (
            <div>
                <h1>You need to log in to see your tasks</h1>
            </div>
        )
    }
    return (
        <div>
            <h1>Home - Tasks</h1>
            <div>
                {tasks.length ?
                    tasks.map((task, key) => {
                        return (<article key={`task-${task.id}`} style={{ border: "2px solid black" }}>
                            <p><Link to={`task/${task.id}/`}>{task.title}</Link></p>
                            <p>{task.updated_at}</p>
                            <Link to={`task/${task.id}/update/`}>Update</Link>
                        </article>)
                    })
                    :
                    <h3>no tasks</h3>
                }
            </div>
        </div>
    )
}