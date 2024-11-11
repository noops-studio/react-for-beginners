import { AxiosInstance } from "axios";

export default abstract class AuthAwareService {
    constructor(public axiosInstance: AxiosInstance) {}
}