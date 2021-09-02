import React, { useState } from 'react'
import { userLogin } from '../../actions/auth';
import Input from '../../components/input/Input'
import { useDispatch } from 'react-redux'
import TopNavBar from '../../components/TopNavBar/TopNavBar'
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner'

const Login = ({ history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [request, setRequest] = useState(false);
    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault();
        setRequest(true)
        const user = {
            email, 
            password
        }

        try {
            const res = await userLogin(user)
            if(res.status === 200) {
                window.localStorage.setItem('auth', JSON.stringify(res.data))
                dispatch({
                    type: 'USER_LOGGEDIN',
                    payload: res.data
                })
                history.push('/dashboard')
            }
        } catch (error) {
            if(error.response.status === 400) toast.error(error.response.data)
            setRequest(false)
        }
    }

    return (
        <TopNavBar>
            <div className="text-center p-4 mt-2 header bg-secondary">
                <h2>Login</h2>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <Input
                            type='email'
                            label='Email'
                            className='form-control'
                            placeholder='Enter Email'
                            onHandleChange={(e)=>setEmail(e.target.value)}
                            value={email}
                            autoComplete="on"
                        />
                        <Input
                            type='password'
                            label='Password'
                            className='form-control'
                            placeholder='Enter Password'
                            onHandleChange={(e)=>setPassword(e.target.value)}
                            value={password}
                        />
                        <button 
                           className="btn btn-primary px-5" 
                            type="submit"
                            disabled={ !email || !password}
                            onClick={handleSubmit}
                        >
                            {request ? 
                                <Loader
                                    type="Puff"
                                    color="#00BFFF" 
                                    height={20}
                                    width={20}
                                />
                                : "Submit"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </TopNavBar>
    )
}

export default Login
