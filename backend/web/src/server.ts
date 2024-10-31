import app from "./app"
import config from 'config'

const port = config.get<number>('app.port')
app.listen(port, () => {
    console.log(`app started on port ${port}`)
})