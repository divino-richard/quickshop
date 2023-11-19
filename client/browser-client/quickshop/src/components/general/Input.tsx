import React, { ChangeEvent, HTMLInputTypeAttribute } from 'react'

interface Props {
    type?: HTMLInputTypeAttribute | undefined;
    placeholder: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Input(props: Props) {
    const {placeholder, onChange, type} = props

    return (
        <div>
            <input 
                type={type}
                className="w-full mt-3 p-2 rounded-md bg-slate-200 outline-rose-300" 
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    )
}

export default Input