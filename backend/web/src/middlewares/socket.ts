import { NextFunction, Response, Request } from "express";
import { io, Socket } from "socket.io-client";
import config from 'config'
import { DefaultEventsMap } from "socket.io/dist/typed-events";

declare global {
    namespace Express {
        interface Request {
            ioSocket: Socket;
        }
    }
}

export default function socket(req: Request, res: Response, next: NextFunction) {
    const socket = io(config.get('io.server'))
    req.ioSocket = socket
    next()
}