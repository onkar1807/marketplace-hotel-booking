import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, Avatar, Badge } from 'antd'
import moment from 'moment'
import { getAccountBalance, payoutSetting } from '../../actions/Stripe';
import { toast } from 'react-toastify';
import { SettingOutlined } from '@ant-design/icons'


const { Meta } = Card;
const { Ribbon } = Badge;

const ConnectNav = () => {

    const { auth } = useSelector(state => ({...state}));
    const { user } = auth;

    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAccountBalance(auth.token).then(res => {
            setBalance(res.data)
        })
    },[])

    const currencyFormatter = (data) => {
        return (data.amount / 100).toLocaleString(data.currency, {
            style: "currency",
            currency: data.currency
        })
    }

    // const hadlePayoutSetting = async () => {
    //     setLoading(true)
    //     try {
    //         const res = await payoutSetting(auth.token);
    //         console.log(res);
    //         // window.location.href = 
    //         setLoading(false)
    //     } catch (error) {
    //         console.log(error);
    //         setLoading(false)
    //         toast.error('Unable to access setting. Try again.')
    //     }
    // }
    
    return (
        <div className="d-flex justify-content-around">
            <Card>
                <Meta 
                    avatar={<Avatar>{user.name[0]}</Avatar>}
                    title={user.name}
                    description={`Joined ${moment(user.createdAt).fromNow()}`}
                />
            </Card>
            {
                auth &&
                auth.user &&
                auth.user.stripe_seller &&
                auth.user.stripe_seller.charges_enabled && 
                (<>
                    <Ribbon text="Available" color="grey">
                        <Card className="bg-light pt-1">
                            {balance && balance.pending && balance.pending.map((b, id) => (
                                <span key={id} className="lead">
                                    {currencyFormatter(b)}
                                </span>
                            ))}
                        </Card>
                    </Ribbon>
                    
                    {/* <Ribbon text="Payouts" color="silver">
                        <Card onClick={hadlePayoutSetting} className="bg-light pointer">
                            <SettingOutlined className="h5 pt-2" />
                        </Card>
                    </Ribbon> */}
                </>
                )
            }
        </div>
    )
}

export default ConnectNav
