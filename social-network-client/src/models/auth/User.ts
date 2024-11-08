import Login from "./Login";

export default interface User extends Login {
    name: string,
    username: string,
    createdAt: string
}