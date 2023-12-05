import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState, useRef, FormEvent } from 'react'
import productService from '../../services/product';
import { Cloud } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { AxiosError, AxiosResponse } from 'axios';
import { Product } from '../../types/poduct.type';
import { createProductFailed, createProductLoading, productWasCreated } from '../../redux/slice/product/createProduct.slice';

interface Props {
    submitSuccess: () => void
}

function ProductForm(props: Props) {
    const {submitSuccess} =  props;
    const dispatch = useDispatch<AppDispatch>();
    const {
        error, 
        loading
    } = useSelector((state: RootState) => state.createProduct);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagesPreviewData, setImagesPreviewData] = useState<any[]>([]);

    const handleSubmitProduct = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log("Form Data", formData);
        
        dispatch(createProductLoading(true));
        productService.addProduct(formData)
            .then((response: AxiosResponse) => {
                const createdProduct: Product = response.data.createdProduct;
                dispatch(productWasCreated(createdProduct));
                submitSuccess();
            })
            .catch((error) => {
                if(error instanceof AxiosError) {
                    const message: string = error.response?.data.error.message;
                    return dispatch(createProductFailed(message));
                }
                return dispatch(createProductFailed('Something went wrong. Please try again later.'));
            })
            .finally(() => {
                dispatch(createProductLoading(false));
            });
    }

    // Will trigger the input files element
    const handleSelectImages = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handlePreviewImages = (event: any) => {
        const selectedFiles = event.target.files;
    
        if (selectedFiles.length > 0) {
            const imagesArray: any[] = [];
    
            for (let i = 0; i < selectedFiles.length; i++) {
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    imagesArray.push(reader.result);
    
                    if (imagesArray.length === selectedFiles.length) {
                        setImagesPreviewData(imagesArray);
                    }
                });
                reader.readAsDataURL(selectedFiles[i]);
            }
        }
    };    
    
    return (
        <form onSubmit={handleSubmitProduct} encType='multipart/form-data' className='py-2'>
            <Box className='flex flex-col'>
                <Typography 
                    variant='body1'
                    className='text-red-500 text-center'
                >
                    {error.message}
                </Typography>
                <Box className='mt-2'>
                    <TextField 
                        name='title'
                        id="outlined-multiline-flexible" 
                        label="title"
                        className='p-1 w-full' 
                        placeholder='title'
                    />
                </Box>
                <Box className='mt-2'>
                    <TextField
                        name='description'
                        id="outlined-multiline-flexible" 
                        label="description"
                        className='p-1 w-full' 
                        rows={4} multiline={true} 
                        placeholder='description'
                    />
                </Box>
                <Box className='mt-2 flex items-center'>
                    <Box className='mr-1 w-1/2'>
                        <TextField 
                            name='price'
                            id="outlined-multiline-flexible" 
                            label="price"
                            className='w-full' 
                            placeholder='price'
                            type='number'
                        />
                    </Box>
                    <Box className='ml-1 w-1/2'>
                        <TextField 
                            name='quantityInStock'
                            id="outlined-multiline-flexible" 
                            label="quantity in stock"
                            className='w-full' 
                            placeholder='quantity in stock'
                            type='number'
                        />
                    </Box>
                </Box>
                <Box className='mt-5'>
                    <input
                        ref={fileInputRef}
                        name='product_images'
                        className='hidden'
                        type='file' 
                        multiple={true} 
                        accept='image/png, image/gif, image/jpeg'
                        onChange={handlePreviewImages}
                    />
                    <Box 
                        className='w-fit p-2 rounded-md bg-gray-100 flex items-center cursor-pointer hover:bg-gray-200'
                        onClick={handleSelectImages}
                    >
                        <Cloud fontSize='medium' className='text-gray-500 mr-2'/>
                        <Typography variant='overline'>
                            Upload Images
                        </Typography>
                    </Box>
                    <Box className='flex items-center overflow-x-auto mt-5 bg-gray-200'>
                        {imagesPreviewData.map(imageData => (
                            <img
                                className='m-2 w-28 h-24 object-contain' 
                                src={imageData} 
                                alt='product'
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
            <Box className='flex justify-end py-2'>
                <Button 
                    type='submit'
                    variant='contained' 
                    size='large'
                    color='primary'
                >
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
            </Box>
        </form>
    )
}

export default ProductForm
