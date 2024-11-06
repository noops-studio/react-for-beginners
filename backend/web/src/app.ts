import express, { json, Router } from 'express'
import config from 'config'
import notFound from './middlewares/not-found';
import errorHandler from './middlewares/error/error-handler';
import commentsRouter from './routers/comments';
import followsRouter from './routers/follows';
import postsRouter from './routers/posts';
import feedRouter from './routers/feed';
import authRouter from './routers/auth';
import { Sequelize } from "sequelize-typescript";
import cors from 'cors'
import authBearerParser from 'auth-bearer-parser';
import auth from './middlewares/auth';
import delay from './middlewares/delay';
import allow from './middlewares/allow';
import socket from './middlewares/socket';

const app = express();

const sequelize = new Sequelize({
    ...config.get('postgres'),
    models: [__dirname + '/models']
});
sequelize.sync()

app.use(cors())
app.use(json())
app.use(socket)

app.use('/allow/comments', allow)
app.use('/allow/posts', allow)
app.use('/allow/follows', allow)
app.use('/allow/feed', allow)

app.use('/delay/allow/comments', allow)
app.use('/delay/allow/posts', allow)
app.use('/delay/allow/follows', allow)
app.use('/delay/allow/feed', allow)

// all /allow routers should be before the auth middlewares
app.use('/auth', authRouter)
app.use('/delay/auth', delay, authRouter)

app.use(authBearerParser({isThrowError: true}))
app.use(auth)

app.use('/comments', commentsRouter)
app.use('/posts', postsRouter)
app.use('/follows', followsRouter)
app.use('/feed', feedRouter)

app.use('/delay/comments', delay, commentsRouter)
app.use('/delay/posts', delay, postsRouter)
app.use('/delay/follows', delay, followsRouter)
app.use('/delay/feed', delay, feedRouter)

app.use('/allow/comments', commentsRouter)
app.use('/allow/posts', postsRouter)
app.use('/allow/follows', followsRouter)
app.use('/allow/feed', feedRouter)

app.use('/delay/allow/comments', delay, commentsRouter)
app.use('/delay/allow/posts', delay, postsRouter)
app.use('/delay/allow/follows', delay, followsRouter)
app.use('/delay/allow/feed', delay, feedRouter)

app.use(notFound)

app.use(errorHandler)

export default app;

