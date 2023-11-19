import React from 'react'
import { ProductInfo } from './Products'

interface Props {
    product: ProductInfo
}

function ProductCard (props: Props) {
    const {product} = props

    return (
        <div className='p-2 flex flex-col mr-2 w-52 h-72 bg-white cursor-pointer'>
            <img className="w-full h-44 bg-gray-100" src="/bag.png" alt="product"/>
            <div className='py-2 h-full flex flex-col justify-between'>
                <h1>{product.title}</h1>
                <span 
                    className='font-bold text-lg text-rose-500'
                >
                    ₱ {product.price.toLocaleString()}
                </span>
            </div>
        </div>
    )
}

export default ProductCard
