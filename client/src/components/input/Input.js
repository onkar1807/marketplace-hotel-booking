import React from 'react'
import { EyeOutlined } from '@ant-design/icons'
import { EyeInvisibleOutlined } from '@ant-design/icons'

const Input = ({
    label,
    type,
    value,
    placeholder,
    autoComplete,
    icon,
    id,
    onHandleChange}) => (

    <form className="mt-3">
        <div className="form-group mb-3">
            <label className="form-label">{label}</label>
            <div className={icon && "password"}>
                <input
                    type={type}
                    className={id ? "input" : "form-control"}
                    placeholder={ placeholder}
                    onChange={onHandleChange}
                    value={value}
                    autoComplete={autoComplete}
                />
                {id === "input" && icon}
            </div>
        </div>
</form>
)

export default Input
