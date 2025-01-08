import { createContext, PropsWithChildren, useState } from "react"

// export const AuthContext = createContext({
//     jwt: '',
//     updateJwt: (jwt: string) => {}
// })
interface AuthContextInterface {
    jwt: string, 
    updateJwt(jwt:string): void
}
export const AuthContext = createContext<AuthContextInterface | null>(null)
function Auth(props: PropsWithChildren): JSX.Element {

    const [ jwt, setJwt ] = useState<string>('')
    const value = { jwt, updateJwt }

    const savedJwt = localStorage.getItem('snc-jwt')
    if (savedJwt && !jwt) setJwt(savedJwt)

    function updateJwt(jwt: string) {
        localStorage.setItem('snc-jwt', jwt)
        setJwt(jwt)
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default Auth