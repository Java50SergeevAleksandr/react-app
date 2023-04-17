import { LoginData } from "../model/LoginData";

export default interface AuthService {
    login(loginData: LoginData): Promise<string>;
    logout():Promise<void>;
}