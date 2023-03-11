import React, { useState, useEffect, useRef } from "react";
import { Alert } from "./Alert";

type Props = {
    submitFn: (value: string) => string;
    placeHolder: string;
    buttonName?: string;
}
export const Input: React.FC<Props> = ({ submitFn, placeHolder, buttonName }) => {
    const id = useRef<string>("input" + Math.random());
    const inputElement = useRef<HTMLInputElement | null>();
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        inputElement.current = document.getElementById(id.current) as HTMLInputElement
    }, []);

    function inputProcess() {
        let res = submitFn(inputElement.current!.value);
        if (!res) {
            inputElement.current!.value = "";
        }
        setMessage(res)
    }

    return <div>
        <input type="text" placeholder={placeHolder} id={id.current} />
        <button onClick={inputProcess}>{buttonName || "GO"}</button>
        {message && <Alert message={message} />}
    </div>

}
