import React, { ReactNode } from 'react'
import Logo from './Logo'
import SideNav from './SideNav';

interface Props {}

export interface SideNavItem {
    title: string;
    link: string;
}

function Sidebar(props: Props) {
    const {} = props

    const sideNavItems: SideNavItem[] = [
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

    return (
        <div className='max-h-screen px-3 w-52 border-r-2 border-gray-200 h-screen bg-white'>
            <div className='py-5'>
                <h1 className='font-bold text-gray-500 text-lg'>Welcome Administrator</h1>
            </div>
            <SideNav items={sideNavItems}/>
        </div>
    )
}

export default Sidebar
