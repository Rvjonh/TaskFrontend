import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { useIsLogged } from "../../hooks/userIsLogged"
import { RootState } from "../../store/store";

import { setTasks } from './../../store/taskSlice';

import DeleteButton from './../../components/deleteButton';

import UserImge from './../../assets/user.png';

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
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className='w-full max-w-md space-y-8 p-4 pb-10 square-back'>
                    <div className="border-2 border-black-500 p-4">
                        <div className="flex justify-center">
                            <img className="w-16 md:w-32 lg:w-48" src={UserImge} />
                        </div>

                        <h2 className="text-center py-5">You need to log in to see your tasks</h2>

                        <div className="flex justify-around py-5">
                            <Link to='/login'
                                className="group relative flex w-full flex-col justify-center
                                items-center rounded-md  py-2 px-3 text-sm font-semibold text-white  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 bg-green-600 hover:bg-green-500">
                                Login
                            </Link>
                            <Link to='/signup'
                                className="group relative flex w-full flex-col justify-center
                                items-center rounded-md  py-2 px-3 text-sm font-semibold text-white  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 bg-blue-600 hover:bg-blue-500">
                                SignUp
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div >
            <h1>Home - Tasks</h1>
            <div>
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
                    <h3>no tasks</h3>
                }
            </div>
        </div>
    )
}