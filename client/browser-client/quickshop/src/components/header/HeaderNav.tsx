import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

function HeaderNav(props: Props) {
    const {} = props

    return (
        <div className='flex items-center text-gray-600'>
            <Link to="/signin" className="p-2 hover:text-rose-500">Signin</Link>
            <Link to="/signup" className="p-2 hover:text-rose-500">SignUp</Link>
        </div>
    )
}

export default HeaderNav;
