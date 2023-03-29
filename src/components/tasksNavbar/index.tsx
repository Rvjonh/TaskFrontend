import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

interface Url {
    name: string;
    url: string;
}

const UrlList: Url[] = [
    { name: "Create Task", url: '/task' },
    { name: "History Task", url: '/task/history' }
];

export function TaskNavbar() {
    const location = useLocation();
    const [items] = useState<Url[]>(UrlList);
    const [selected, setSelected] = useState(-1);

    useEffect(() => {
        const index = items.findIndex((item) => {
            return item.url === location.pathname
        })
        setSelected(index)
    }, [location])


    const getBorders = (key: number) => {
        if (key === 0) {
            return 'rounded-l-lg'
        } else if (key == items.length - 1) {
            return 'rounded-r-lg'
        }
        return ''
    }

    const getBackground = (key: number) => {
        if (key === selected) {
            return 'bg-green-500'
        }
        return 'bg-slate-300'
    }

    return (
        <nav className="max-w-4xl mx-auto flex justify-center items-center py-2 overflow-x-auto ">
            <ul className="w-full flex justify-center items-center ">
                {items.length &&
                    items.map((item, key) => {
                        return (
                            <li key={`task-url-${key}`}
                                className={
                                    `flex border-2 border-black-900 sm:text-2xl text-center
                                    ${getBorders(key)} ${getBackground(key)}
                                    `
                                }
                            >
                                <Link to={item.url} className="p-4 px-10 whitespace-nowrap">
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}