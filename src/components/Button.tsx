type ButtonProps = {
    text?: string
}

export default function Button(props: ButtonProps) {
    return (
        <button>
            {props.text || "Default"} 
        </button>
    )
}
