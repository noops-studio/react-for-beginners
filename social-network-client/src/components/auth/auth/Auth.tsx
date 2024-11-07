import { createContext, PropsWithChildren, useState } from "react"

export const AuthContext = createContext({
    jwt: ''
})

function Auth(props: PropsWithChildren): JSX.Element {

    const [ jwt, setJwt ] = useState<string>('')
    const value = { jwt }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default Auth