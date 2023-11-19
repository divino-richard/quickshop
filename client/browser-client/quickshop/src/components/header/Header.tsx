import React from 'react'
import Logo from '../general/Logo'
import HeaderNav from './HeaderNav'
import HeaderAccount from './HeaderAccount'
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store";

interface Props {}

function Header(props: Props) {
    const {} = props

    const authState = useSelector((state: RootState) => state.authentication);

    return (
        <div className='px-5 py-2 flex items-center justify-between bg-white'>
            <Logo />
            {authState.session.token
                ? <HeaderAccount />
                : <HeaderNav />
            }
        </div>
    )
}

export default Header
