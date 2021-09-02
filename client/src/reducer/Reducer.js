import { combineReducers } from 'redux';
import { authReducer } from './authReducer';

const rooReducer = combineReducers({
    auth: authReducer
})

export default rooReducer