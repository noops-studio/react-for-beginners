import { NextFunction, Response, Request } from "express";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(() => {
        resolve(1)
    }, ms))
}

export default async function delay(req: Request, res: Response, next: NextFunction) {
    await sleep(2000)
    next()
}