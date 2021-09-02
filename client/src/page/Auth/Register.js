import React, { useState } from 'react'
import Input from '../../components/input/Input';
import TopNavBar from '../../components/TopNavBar/TopNavBar'
import { toast } from 'react-toastify';
import { userRegister } from '../../actions/auth';
import { EyeOutlined } from '@ant-design/icons'
import { EyeInvisibleOutlined } from '@ant-design/icons'

const Register = ({history}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

   
    const handleSubmit = async(e) => {
        e.preventDefault();

        const user = {
            name, 
            email, 
            password
        }

        try {
            const res = await userRegister(user)
            toast.success(res.data.message)
            history.push('/login')
        } catch (error) {
           if(error.response.status === 400) toast.error(error.response.data)
        }
    }
    
    return (
        <TopNavBar>
            <div className="text-center p-4 mt-2 header bg-secondary">
                <h2>Register</h2>
            </div>
          
            
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <Input
                            type="text"
                            label='Your Name'
                            placeholder='Enter name'
                            value={name}
                            onHandleChange={(e)=>setName(e.target.value)}
                            autoComplete="on"
                        />
                        <Input
                            type="email"
                            label='Email'
                            placeholder='Enter Email'
                            value={email}
                            onHandleChange={(e)=>setEmail(e.target.value)}
                            autoComplete="on"
                        />
                        <Input
                            type="password"
                            label='Password'
                            placeholder='Enter Password'
                            value={password}
                            onHandleChange={(e)=>setPassword(e.target.value)}
                        />
        
                        <button 
                            className="btn btn-primary px-5"
                            type="submit"
                            disabled={!name || !email || !password}
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </TopNavBar>
    )
}

export default Register
