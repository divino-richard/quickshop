import React from 'react'
import { useNavigate } from 'react-router-dom';

interface Props {}

function Logo(props: Props) {
    const {} = props
    const navigate = useNavigate();
    return (
        <div className='cursor-pointer' onClick={() => navigate('/')}>
            <h1 className='font-bold text-lg text-rose-500'>QuickShop</h1>
        </div>
    )
}

export default Logo
