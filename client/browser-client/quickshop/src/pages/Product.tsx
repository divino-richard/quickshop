import React, { useEffect, useState } from 'react'
import Sidebar from '../components/general/Sidebar'
import ProductTable from '../components/product/ProductTable'
import productService from '../services/product'
import { UserSession } from '../types/userTypes'
import { getUserSession } from '../utils/session'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getProductsFailed, gotProducts } from '../redux/slice/product/products.slice'
import { Product } from '../types/poduct.type'
import { AxiosError } from 'axios'
import { Box, Divider, Modal, Typography } from '@mui/material'
import { Alert, Spin, Button } from 'antd'
import ProductForm from '../components/product/ProductForm'

function UserProduct() {
    const dispatch = useDispatch<AppDispatch>();
    const productState = useSelector((state: RootState) => state.products); 
    const userSession: UserSession = getUserSession();
    const [openModal, setOpenModal] = useState(false);
    const [actionsLoading, setActionsLoading] = useState(false);
    const [deleteError, setDeleteError] = useState('');
    const [deleteSuccess, setDeleteSuccess] = useState('');

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleDeleteProduct = (productId: string) => {
        if (productId) {
            setActionsLoading(true);
            productService.deleteProduct(productId)
                .then(() => {
                    handleGetProducts();
                    setDeleteSuccess('Product deleted successfully')
                })
                .catch((error) => {
                    if (error instanceof AxiosError) {
                        console.log(error)
                        const errorMessage = error.response?.data.error.message;
                        return setDeleteError(errorMessage);
                    }
                    return setDeleteError('Unable to delete product. Please try again later.')
                })
                .finally(() => {
                    setActionsLoading(false);
                })
        }
    }

    const handleGetProducts = () => {
        if(userSession.data?._id) {
            productService.getProductsByUserId(userSession.data?._id)
                .then((response) => {
                    const products: Product[] = response.data.products;
                    dispatch(gotProducts(products));
                })
                .catch((error) => {
                    if (error instanceof AxiosError) {
                        const errorMessage = error.response?.data.error.message;
                        return dispatch(getProductsFailed(errorMessage));
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
            
            <div className='p-2 w-full'>
                {deleteSuccess && (
                    <Alert
                        className='mb-2'
                        message={deleteSuccess}
                        type="success"
                        showIcon
                        closable
                        onClose={() => setDeleteSuccess('')}
                    />
                )}
                {deleteError && (
                    <Alert
                        className='mb-2'
                        message={deleteError}
                        type="error"
                        showIcon
                        closable
                        onClose={() => setDeleteError('')}
                    />
                )}
                {actionsLoading && (
                    <div className='p-2 flex justify-end'>
                        <Spin />
                    </div>
                )}
                <Button 
                    onClick={() => setOpenModal(true)}
                    className='mb-2'
                >
                    Add Product
                </Button>
                <ProductTable 
                    data={productState.products} 
                    deleteProduct={handleDeleteProduct}
                />
            </div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='flex mt-10 justify-center'
            >
                <Box className='bg-white px-10 py-5 rounded-md h-fit w-1/2'>
                    <Typography className='py-2' id="modal-modal-title" variant="h6" component="h2">
                        Add Product
                    </Typography>
                    <Divider />
                    <ProductForm submitSuccess={handleCloseModal}/>
                </Box>
            </Modal>
        </div>
    )
}

export default UserProduct
