import { Notyf } from "notyf"

class Notify {

    private notyf = new Notyf({
        duration: 3000, // milliseconds
        position: {
            x: 'center',
            y: 'center'
        }
    })

    public success(message: string) {
        this.notyf.success(message)
    }

    public error(err: any) {
        this.notyf.error(this.extractMessage(err))
    }

    private extractMessage(err: any): string {
        if(typeof err === 'string') return err
        if(typeof err.response?.data === 'string') return err.response.data
        if(Array.isArray(err.response?.data)) return err.response.data[0]
        if(typeof err.message === 'string') return err.message
        return 'unknown error occured...'
    }

}

const notify = new Notify()
export default notify