import React from 'react'
import { Modal } from 'antd'

const OrderdModal = ({ session, orderdBy, showModal, setShowModal }) => {
    return (
        <Modal 
            visible={showModal}
            title="Order Payment info"
            onCancel={()=>setShowModal(!showModal)} 
        >
            <p>Payment intent: {session.payment_intent}</p>
            <p>Payment status: {session.payment_status}</p>
            <p>
                Amount total: {session.currency.toUpperCase()}{" "}
                {session.amount_total / 100}
            </p>
            <p>Stripe customer: {session.customer}</p>
            <p>Customer: {orderdBy.name}</p>
        </Modal>
        
    )
}

export default OrderdModal
