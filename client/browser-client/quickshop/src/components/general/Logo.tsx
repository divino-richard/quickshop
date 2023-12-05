import React from 'react'
import { useNavigate } from 'react-router-dom';

function Logo() {
    const navigate = useNavigate();
    return (
        <div className='cursor-pointer' onClick={() => navigate('/')}>
            <h1 className='font-bold text-lg text-amber-500'>QuickShop</h1>
        </div>
    )
}

export default Logo
