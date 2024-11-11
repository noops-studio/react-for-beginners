import { PropsWithChildren, useEffect } from "react";
import { io } from "socket.io-client";
import Post from "../../../models/post/Post";
import useUserId from "../../../hooks/useUserId";
import { useAppDispatch } from "../../../redux/hooks";
import { addOnTop } from "../../../redux/profileSlice";

function SocketDispatcher(props: PropsWithChildren): JSX.Element {

    const userId = useUserId()
    const dispatch = useAppDispatch()

    useEffect(() => {
        const socket = io(process.env.REACT_APP_IO_SERVER)

        socket.on('new-post', (post: Post) => {
            /*
            only if the new post is by MY user AND it is was not created by this app instance
            only then i want to dispatch the message
            */            
            if (post.userId === userId) {
                dispatch(addOnTop(post))
            }
        })

    }, [])


    return (
        <>
            {props.children}
        </>
    )
}

export default SocketDispatcher