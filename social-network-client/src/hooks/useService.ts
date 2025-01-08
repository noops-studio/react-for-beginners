import axios, { AxiosInstance } from "axios";
import { useContext } from "react";
import { AuthContext } from "../components/auth/auth/Auth";
import AuthAwareService from "../services/authAware/AuthAwareService";
import { SocketContext } from "../components/socket/dispatcher/SocketDispatcher";

export default function useService<T extends AuthAwareService>(Service: { new(axiosInstance: AxiosInstance): T}): T {

    const { jwt } = useContext(AuthContext)!
    const { xClientId } = useContext(SocketContext)

    const axiosInstance = axios.create({})
    axiosInstance.interceptors.request.use(config => {
        config.headers['Authorization'] = `Bearer ${jwt}`
        config.headers['x-client-id'] = xClientId
        return config
    })

    const service = new Service(axiosInstance)
    return service
    
}