import React, { useState } from 'react'
import Divider from '../general/Divider';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { userLoggedOut } from '../../redux/slice/auth/auth.slice';

function HeaderAccount() {
    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.authentication);
    
    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    const {data} = authState.session;
    const fullName = `${data?.firstname} ${data?.lastname}`;

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(userLoggedOut());
    } 

    return (
        <div>
            <div 
                className='p-2 w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer'
                onClick={() => setShowDropDown(!showDropDown)}
            >
                <h1 className='font-bold text-lg text-rose-500 select-none'>
                    {fullName[0]}
                </h1>
            </div>
            <div className={`${showDropDown ? 'block' : 'hidden'} absolute z-10 bg-white px-5 py-3 right-5 w-52 mt-1 rounded-md shadow-md shadow-gray-300 text-gray-600`}>
                <h1 className='mb-2 font-bold'>Acount:</h1>
                <Divider />
                <div className='mt-2'>
                    <Link to='/' className='font-semibold hover:text-blue-500'>
                        {fullName}
                    </Link>
                </div>
                <button 
                    className='mt-3 py-1 text-center rounded-md bg-gray-100 w-full hover:text-rose-500'
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default HeaderAccount
