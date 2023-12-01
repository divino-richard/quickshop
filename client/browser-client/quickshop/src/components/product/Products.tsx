import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { getProducts } from '../../services/product';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getProductsFailed, gotProducts } from '../../redux/slice/product/products.slice';
import { Product } from '../../types/poduct.type';
import { AxiosError } from 'axios';

interface Props {}

export interface ProductInfo {
    title: string;
    description: string;
    price: number;
}

export interface Pagination {
    limit: number;
    offset: number;
}

function Products(props: Props) {
    const {} = props

    const dispatch = useDispatch<AppDispatch>();
    const productsState = useSelector((state: RootState) => state.products);

    const [pagination, setPagination] = useState<Pagination>({
        limit: 10,
        offset: 0
    });

    const handleGetProducts = () => {
        getProducts(pagination)
            .then((response) => {
                const products: Product[] = response.data.products;
                dispatch(gotProducts(products));
            })
            .catch((error) => {
                if (error instanceof AxiosError) {
                    const errorMsg = error.response?.data.error.message;
                    return dispatch(getProductsFailed(errorMsg));
                }
                dispatch(getProductsFailed("Something went wrong. Please try again later."));
            })
    }

    useEffect(() => {
        handleGetProducts();
    });

    return (
        <div className='w-ful pb-5'>
            <div className='border-t-2 border-amber-500 bg-white p-3'>
                <h1 className='text-gray-500 font-semibold text-center'>Products</h1>
            </div>
            <div className='py-2 flex flex-wrap'>
                {productsState.products 
                    ? productsState.products.map((product) => (
                        <ProductCard product={product}/>
                    ))
                    : <span>Loading...</span>
                }
            </div>
        </div>
    )
}

export default Products


