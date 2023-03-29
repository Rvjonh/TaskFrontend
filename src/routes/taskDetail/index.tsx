import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Task } from '../../interfaces/tasks';

import { useIsLogged } from './../../hooks/userIsLogged';

import { Errors } from '../../interfaces/errorsRequest';
import { ServerMessages } from './../../components/serverMessages'
import DeleteButton from './../../components/deleteButton';

import { Spinner } from '../../components/spinner';

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
    const [loading, setLoading] = useState(true)


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
                    setLoading(false)
                })
                .catch((err) => {
                    err.data.then(setServerMessages);
                    setLoading(false)
                })
        }
    }, [activeUser.active])

    const getDateFormatted = (myDate: string) => {
        const fecha = new Date(myDate);
        const ops: any = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const fecha_formateada = fecha.toLocaleString('es-ES', ops);
        return fecha_formateada;
    }

    if (loading) {
        return (
            <div className='flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col items-center justify-center w-full max-w-md space-y-8 p-4 pb-10 square-back'
                    style={{ height: "20em" }}
                >
                    <Spinner text='Loading task' color='#124124' />
                </div>
            </div>
        )
    }

    if (serverMessages) {
        return <ServerMessages messages={serverMessages} />
    }

    return (
        <div className='flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-md p-4 pb-10 square-back'>

                <Link to='/' className='self-start rounded bg-blue-300 p-2 font-black'>⬅Go Back</Link>

                <article className='flex flex-1 flex-col mt-4'>
                    <div>
                        <p className='font-light'>Task:</p>
                        <h3 className='font-bold'>{selectedTask.title}</h3>
                    </div>

                    <div className='py-2 h-48'>
                        <p>
                            {selectedTask.description}
                        </p>
                    </div>

                    <div className='flex justify-between mt-auto'>
                        <p className='flex flex-1 flex-col'>
                            <span className='font-black'>Updated:</span>
                            <span >{getDateFormatted(selectedTask.updated_at)}</span>
                        </p>
                        <p className='flex flex-1 flex-col'>
                            <span className='font-black self-end text-end'>Created:</span>
                            <span className='self-end text-end'>{getDateFormatted(selectedTask.created_at)}</span>
                        </p>
                    </div>

                </article>

                <div className='flex justify-between border-t-4 border-stone-300 pt-2 m-0'>
                    <Link to={`update/`}
                        className="group relative flex justify-center rounded-md  py-2 px-3 text-sm font-semibold text-white  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 hover:bg-green-500 bg-green-600"
                    >
                        Update
                    </Link>
                    <DeleteButton taskID={`${taskId}`} redirect='/' />
                </div>

            </div>
        </div>
    );
}