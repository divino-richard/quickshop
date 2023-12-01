import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

function AuthNav(props: Props) {
    const {} = props

    return (
        <div className='flex items-center text-white'>
            <Link to="/signin" className="p-2 hover:text-amber-500">Signin</Link>
            <Link to="/signup" className="p-2 hover:text-amber-500">SignUp</Link>
        </div>
    )
}

export default AuthNav;
