import { useContext, useMemo } from "react"
import { AuthContext } from "../components/auth/auth/Auth"
import { jwtDecode } from "jwt-decode"
import User from "../models/auth/User"

function useUserId() {
    const { jwt } = useContext(AuthContext)
    const userId = useMemo(() => {
        const payload = jwtDecode(jwt) as User
        return payload.id
    }, [jwt])
    return userId
}

export default useUserId