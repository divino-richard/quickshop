import React from 'react'
import { Product } from '../../types/poduct.type'
import { API_END_POINT } from '../../constant/api.constant'

interface Props {
    product: Product
}

function ProductCard (props: Props) {
    const {product} = props

    return (
        <div className='p-2 flex flex-col mr-2 w-52 h-72 bg-white cursor-pointer'>
            {
                product.images && (
                    <img 
                        className="w-full h-44 bg-gray-100" 
                        src={`${API_END_POINT}/uploads/products/${product.images[0]}`} 
                        alt="product"
                    />
                )
            }
            
            <div className='py-2 h-full flex flex-col justify-between'>
                <h1>{product.title}</h1>
                <span 
                    className='font-bold text-lg text-amber-500'
                >
                    ₱ {product.price.toLocaleString()}
                </span>
            </div>
        </div>
    )
}

export default ProductCard
