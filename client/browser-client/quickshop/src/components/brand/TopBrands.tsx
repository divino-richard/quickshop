import React from 'react'
import BrandCard from './BrandCard';
import Divider from '../general/Divider';

interface Props {}

export interface Brand {
    title: string;
    description: string;
}

function TopBrands(props: Props) {
    const {} = props

    const topBrands: Brand[] | null = [
        {
            title: "Brand one",
            description: "Brand on description"
        },
        {
            title: "Brand one",
            description: "Brand on description"
        },
        {
            title: "Brand one",
            description: "Brand on description"
        },
        {
            title: "Brand one",
            description: "Brand on description"
        },
        {
            title: "Brand one",
            description: "Brand on description"
        }
    ]

    return (
        <div className='w-full bg-white p-2 mt-5 border-t-2 border-amber-500'>
            <h1 className='pb-2 text-gray-500 font-semibold'>Top Brands</h1>
            <Divider />
            <div className='flex items-center mt-2'>
                {topBrands.map((brand) => (
                    <BrandCard data={brand}/>
                ))}
            </div>
        </div>
    )
}

export default TopBrands
