import { useDispatch } from "react-redux"
import { LoginData } from "../../model/LoginData";
import LoginForm from "../forms/LoginForm"
import {authActions} from "../../redux/authSlice"


export const Login: React.FC = () => {
    const dispath = useDispatch();

    function submitFOrmData(loginData: LoginData): void {       
        dispath(authActions.login(loginData.email));
    }
    return <LoginForm submitFn={submitFOrmData} />
}