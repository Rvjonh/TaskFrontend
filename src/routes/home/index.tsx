import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
                console.log(res)
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
                {
                    tasks.map((item, key) => {
                        return (<article key={`task-${item.id}`} style={{ border: "2px solid black" }}>
                            <p>{item.title}</p>
                            <p>{item.description}</p>
                            <p>{item.created_at}</p>
                            <p>{item.updated_at}</p>
                        </article>)
                    })
                }
            </div>
        </div>
    )
}