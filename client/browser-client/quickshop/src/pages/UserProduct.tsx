import React, { useEffect } from 'react'
import Sidebar from '../components/general/Sidebar'
import ProductListTable from '../components/general/ProductListTable'
import { getProductsByUserId } from '../services/product'
import { UserSession } from '../types/userTypes'
import { getUserSession } from '../utils/session'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getProductsFailed, gotProducts } from '../redux/slice/product/products.slice'
import { Product } from '../types/poduct.type'
import { AxiosError } from 'axios'

interface Props {}

function UserProduct(props: Props) {
    const {} = props

    const dispatch = useDispatch<AppDispatch>();
    const productState = useSelector((state: RootState) => state.products); 
    const userSession: UserSession = getUserSession();

    const handleGetProducts = () => {
        if (userSession.data?._id) {
            getProductsByUserId(userSession.data?._id)
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
    }

    useEffect(() => {
        handleGetProducts();
    });

    return (
        <div className='flex'>
            <Sidebar />
            <ProductListTable data={productState.products} />
        </div>
    )
}

export default UserProduct
