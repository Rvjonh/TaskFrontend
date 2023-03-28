import { Errors } from '../../interfaces/errorsRequest';


interface ComponentProps {
    messages: Errors | undefined;
}

export function ServerMessages(props: ComponentProps) {
    const { messages } = props;

    const returnListItemOrString = (myArray: string[] | string) => {
        if (typeof myArray === 'string') {
            return myArray
        }
        return myArray.map((item) => (
            <li key={item}>{item}</li>
        ))
    }

    return (
        <div>
            {messages && Object.entries(messages).map(([key, value]) => (
                <div key={key}>
                    <h2>{key}</h2>
                    <ul>
                        {returnListItemOrString(value)}
                    </ul>
                </div>
            ))}
        </div>
    )
}