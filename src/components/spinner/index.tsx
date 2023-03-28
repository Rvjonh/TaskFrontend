import './style.css';

export function Spinner({ text = "", size = "", color = "" }) {
    return (
        <>
            {text && <h4 style={{ margin: "1em 0" }}>{text}</h4>}
            <div className="lds-ring">
                <div style={{
                    borderWidth: size,
                    borderColor: `${color} transparent transparent transparent`
                }} ></div>
                <div style={{
                    borderWidth: size,
                    borderColor: `${color} transparent transparent transparent`
                }} ></div>
                <div style={{
                    borderWidth: size,
                    borderColor: `${color} transparent transparent transparent`
                }} ></div>
                <div style={{
                    borderWidth: size,
                    borderColor: `${color} transparent transparent transparent`
                }} ></div>
            </div>
        </>
    )
}