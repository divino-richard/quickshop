import React from 'react'
import { Link } from 'react-router-dom';
import { SideNavItem } from './Sidebar';

interface Props {
    items: SideNavItem[];
}

function SideNav(props: Props) {
    const {items} = props

    const renderNavItem = (data: SideNavItem) => (
        <div className='p-2 hover:bg-gray-100'>
            <Link to={data.link}>{data.title}</Link>
        </div>
    )

    return (
        <div className=''>
            {items.map((item: SideNavItem) => (
                renderNavItem(item)
            ))}
        </div>
    )
}

export default SideNav
