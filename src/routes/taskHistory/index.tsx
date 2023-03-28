import { useSelector } from "react-redux"
import { Link } from 'react-router-dom';

import DeleteButton from './../../components/deleteButton';

import { useIsLogged } from "../../hooks/userIsLogged";

import { RootState } from "../../store/store"

export default function TaskHistoryRoute() {
    const userActive = useIsLogged(undefined, '/');

    const { tasks } = useSelector((state: RootState) => state.history);


    return (
        <div>
            <h2>Task History</h2>
            <p>Kept tasks during session active, after logout will no be here</p>
            {tasks.length ?
                tasks.map((task, key) => {
                    return (<article key={`task-${task.id}`} style={{ border: "2px solid black" }}>
                        <p><Link to={`task/${task.id}/`}>{task.title}</Link></p>
                        <p>{task.updated_at}</p>
                        <Link to={`task/${task.id}/update/`}>Update</Link>
                        <DeleteButton taskID={`${task.id}`} />
                    </article>)
                })
                :
                <p>No task added recently</p>
            }
        </div>
    )
}