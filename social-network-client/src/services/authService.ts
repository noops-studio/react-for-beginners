import axios from "axios";
import Login from "../models/auth/Login";

class AuthService {
    async login(login: Login): Promise<string> {
        const response = await axios.post<{jwt: string}>(`${process.env.REACT_APP_REST_SERVER}/auth/login`, login)
        const { jwt } = response.data
        return jwt
    }
}

const authService = new AuthService();
export default authService