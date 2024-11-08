import { useContext, useMemo } from "react"
import { AuthContext } from "../components/auth/auth/Auth"
import { jwtDecode } from "jwt-decode"
import User from "../models/auth/User"

function useUsername() {
    const { jwt } = useContext(AuthContext)
    const name = useMemo(() => {
        const payload = jwtDecode(jwt) as User
        return payload.name
    }, [jwt])
    return name
}

export default useUsername