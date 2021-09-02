import axios from '../helper/axios'

export const userRegister = async (payload) => 
    await axios.post('/register', payload)

export const userLogin = async (payload) => 
    await axios.post('/login', payload)

// update user in local storage
export const updateUserInLocalStorage = (user, next) => {
    if(window.localStorage.getItem('auth')) {
        let auth = JSON.parse(localStorage.getItem('auth'));
        auth.user = user;
        localStorage.setItem('auth', JSON.stringify(auth));
        next();
    }
}