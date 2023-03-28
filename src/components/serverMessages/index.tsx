import { Errors } from '../../interfaces/errorsRequest';


interface ComponentProps {
    messages: Errors | undefined;
}

export function ServerMessages(props: ComponentProps) {
    const { messages } = props;

    const returnListItemOrString = (myArray: string[] | string) => {
        if (typeof myArray === 'string') {
            return <li className='capitalize'>{myArray}</li>
        }
        return myArray.map((item) => (
            <li key={item} className='capitalize'>
                {item}
            </li>
        ))
    }
    if (!messages) {
        return <i></i>
    }

    return (
        <div className='border-2 border-red p-2 bg-amber-100'>
            {messages && Object.entries(messages).map(([key, value]) => (
                <div key={key}>
                    <h3 className='capitalize text-lg'>{key}</h3>
                    <ul>
                        {returnListItemOrString(value)}
                    </ul>
                </div>
            ))}
        </div>
    )
}