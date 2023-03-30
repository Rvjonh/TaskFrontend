import { useSelector } from "react-redux"
import { useIsLogged } from "../../hooks/userIsLogged";

import { RootState } from "../../store/store"

export default function TaskHistoryRoute() {
    const userActive = useIsLogged(undefined, '/');

    const { tasks } = useSelector((state: RootState) => state.history);


    return (
        <div >
            <div className="flex flex-col justify-center items-center">

                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Task History
                </h2>

                <div className="sm:container flex flex-col justify-start items-center">
                    <p className="text-center">
                        Kept tasks during session active, after logout will no be here
                    </p>
                    <p className="text-center text-amber-600 underline decoration-amber-500">Warning: if you press F5 the the history will be reseted</p>
                    {tasks.length ?
                        tasks.map((task, key) => {
                            return (
                                <article key={`task-${task.id}`} className="w-full my-2 rounded border-4 border-black-900 flex flex-col p-1 max-w-4xl bg-neutral-50"
                                >
                                    <div className="flex-1 border-2 border-black-900 rounded ">
                                        <h3 className="w-full rounded block p-1 text-lg  transition duration-250"
                                        >
                                            {task.title}
                                        </h3>
                                    </div>
                                    <div className="flex-1 ">
                                        <p className="w-full rounded block p-1 text-lg"
                                        >
                                            {task.description}
                                        </p>
                                    </div>
                                    <div className='flex flex-col justify-between'>
                                        <p className='flex flex-1 flex-col'>
                                            Updated:{task.updated_at}
                                        </p>
                                        <p className='flex flex-1 flex-col'>
                                            Created:{task.created_at}
                                        </p>
                                    </div>
                                </article>)
                        })
                        :
                        <div className="flex justify-center mt-5">
                            <p className="text-red-700 text-4xl">No task added recently</p>
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}