import React, { ReactNode } from 'react'
import Logo from './Logo'
import SideNav from './SideNav';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Props {}

export interface SideNavItem {
    title: string;
    link: string;
}

function Sidebar(props: Props) {
    const {} = props
    const userSession = useSelector((state: RootState) => state.authentication);
    const userRole = userSession.session.data?.role;

    const adminSideNavItems: SideNavItem[] = [
        {
            title: 'Dashboard',
            link: '/admin',
        },
        {
            title: 'Products',
            link: '/admin/product',
        },
        {
            title: 'Orders',
            link: '/admin/order',
        },
        {
            title: 'Carts',
            link: '/admin/cart',
        },
        {
            title: 'Categories',
            link: '/admin/category',
        },
    ];

    const sellerSideNavItems: SideNavItem[] = [
        {
            title: 'Dashboard',
            link: '/seller',
        },
        {
            title: 'Products',
            link: '/seller/product',
        },
        {
            title: 'Orders',
            link: '/seller/order',
        },
        {
            title: 'Carts',
            link: '/seller/cart',
        },
    ];

    const renderSideNav = () => {
        switch(userRole) {
            case 'ADMIN': 
                return <SideNav items={adminSideNavItems}/>
            case 'SELLER':
                return <SideNav items={sellerSideNavItems}/>
        }
    }

    return (
        <div className='max-h-screen px-3 w-52 border-r-2 border-gray-200 h-screen bg-white'>
            <div className='py-5'>
                <h1 className='font-bold text-gray-500 text-lg'>
                    Welcome {userRole?.toLowerCase()}
                </h1>
            </div>
            {renderSideNav()}
        </div>
    )
}

export default Sidebar
