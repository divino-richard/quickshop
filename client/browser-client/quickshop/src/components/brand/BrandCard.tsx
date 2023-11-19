import React from 'react'
import { Brand } from './TopBrands'

interface Props {
    data: Brand;
}

function BrandCard(props: Props) {
    const {data} = props

    return (
        <div className='mr-2'>
            <h1 className='text-gray-500 font-semibold py-1'>{data.title}</h1>
            <img className="w-40 h-32 bg-gray-100" src="/bag.png" alt="brand"/>
        </div>
    )
}

export default BrandCard
