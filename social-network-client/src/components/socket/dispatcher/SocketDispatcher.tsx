import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Post from "../../../models/post/Post";
import useUserId from "../../../hooks/useUserId";
import { useAppDispatch } from "../../../redux/hooks";
import { addOnTop } from "../../../redux/profileSlice";
import { v4 } from "uuid";

export const SocketContext = createContext({
    xClientId: ''
})

function SocketDispatcher(props: PropsWithChildren): JSX.Element {

    const userId = useUserId()
    const dispatch = useAppDispatch()

    const [ xClientId, setXClientId ] = useState<string>(v4())
    const value = { xClientId }

    useEffect(() => {
        const socket = io(process.env.REACT_APP_IO_SERVER)

        // socket.onAny((eventName, payload) => {
        //     console.log(eventName, payload)
        // })
        socket.on('new-post', (data: {from: string, post: Post}) => {
            const { from, post } = data
            /*
            only if the new post is by MY user AND it is was not created by this app instance
            only then i want to dispatch the message
            */            
            if (post.userId === userId && from !== xClientId) {
                dispatch(addOnTop(post))
            }
        })

        return () => {
            socket.disconnect()
        }

    }, [])


    return (
        <SocketContext.Provider value={value}>
            {props.children}
        </SocketContext.Provider>
    )
}

export default SocketDispatcher