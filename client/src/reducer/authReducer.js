let userState;

if(window.localStorage.getItem('auth')) {
    userState = JSON.parse(window.localStorage.getItem('auth'))
} else {
    userState = null
}

export const authReducer = (state = userState, action) => {
    switch(action.type){
        case 'USER_LOGGEDIN':
            return {...state, ...action.payload}
        case 'LOGOUT':
            return action.payload
        default:
            return state
    }
}