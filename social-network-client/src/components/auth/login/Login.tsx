import { useForm } from 'react-hook-form'
import './Login.css'
import LoginModel from '../../../models/auth/Login'
import authService from '../../../services/authService'
import { useContext } from 'react'
import { AuthContext } from '../auth/Auth'

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<LoginModel>()

    const { updateJwt } = useContext(AuthContext)!

    async function submit(login: LoginModel) {
        try {
            const jwt = await authService.login(login)
            updateJwt(jwt)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder='username' {...register('username', {
                    required: {
                        value: true,
                        message: 'username is required'
                    },
                    minLength: {
                        value: 3,
                        message: 'username must be at least 6 characters long'
                    }
                })}/>
                <span className="form-error">{formState.errors.username?.message}</span>
                <input placeholder="password" type="password" {...register('password', {
                    required: {
                        value: true,
                        message: 'password is required'
                    },
                    minLength: {
                        value: 3,
                        message: 'password must be at least 6 characters long'
                    }
                })}/>
                <span className="form-error">{formState.errors.password?.message}</span>
                <button>login</button>
            </form>
        </div>
    )
}

export default Login