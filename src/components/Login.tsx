import React from "react";
import { Input } from "./Input";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/authSlice";

export const Login: React.FC = () => {
    const dispatch = useDispatch();
    function submit(value: string) {
        dispatch(authActions.login(value));
        return ""
    }
    return <div className="login">
        <Input buttonName="Login" placeHolder='Enter name' submitFn={submit} />
    </div>
}    