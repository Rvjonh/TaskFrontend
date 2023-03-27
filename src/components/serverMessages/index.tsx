import { Errors } from '../../interfaces/errorsRequest';


interface ComponentProps {
    messages: Errors | undefined;
}

export function ServerMessages(props: ComponentProps) {
    const { messages } = props;

    return (
        <div>
            {messages && Object.entries(messages).map(([key, value]) => (
                <div key={key}>
                    <h2>{key}</h2>
                    <ul>
                        {value.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}