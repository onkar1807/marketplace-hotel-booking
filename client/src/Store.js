import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rooReducer from './reducer/Reducer'


const store = createStore(
    rooReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store