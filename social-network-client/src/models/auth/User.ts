import Login from "./Login";

export default interface User extends Login {
    id: string,
    name: string,
    username: string,
    createdAt: string
}