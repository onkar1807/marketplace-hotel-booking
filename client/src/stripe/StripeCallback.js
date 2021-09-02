import {useEffect} from 'react'
import TopNavBar from '../components/TopNavBar/TopNavBar'
import { useSelector, useDispatch } from 'react-redux'
import { getAccountStatus } from '../actions/Stripe'
import { LoadingOutlined } from '@ant-design/icons'
import { updateUserInLocalStorage } from '../actions/auth'

const StripeCallback = ({ history }) => {

    const {auth} = useSelector(state => ({...state}));
    const dispatch = useDispatch();

    useEffect(() => {
        if(auth && auth.token) accountStatus()
    },[auth])

    const accountStatus = async() => {
        try {
            let res = await getAccountStatus(auth.token);
            // update user in localstorage
            updateUserInLocalStorage(res.data, () => {
                // update user in redux-state
                dispatch({
                    type: 'USER_LOGGEDIN',
                    payload: res.data
                })
            })
            // redirect user to dashboard
            window.location.href = '/dashboard/seller'
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TopNavBar>
            <div className="d-flex justify-content-center p-5">
                <LoadingOutlined className="h1 p-5 text-danger" />
            </div>
        </TopNavBar>
    )
}

export default StripeCallback
