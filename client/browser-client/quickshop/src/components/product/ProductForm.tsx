import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addProduct } from '../../services/product';
import { AppDispatch } from '../../redux/store';

interface Props {}

function ProductForm(props: Props) {
    const {} = props

    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantityInStock, setQuantityInStock] = useState(0);

    const handleSubmitProduct = () => {
        const productData = {title, description, price, quantityInStock}
        addProduct(productData)
            .then((response: any) => {
                // dispatch();
                console.log("Add product: ", response);
            })
            .catch((error: any) => {
                console.log("Add product: ", error);
            })
    }
    
    return (
        <Box className='py-2'>
            <Box className='flex flex-col'>
                <Box className='mt-2'>
                    <TextField 
                        id="outlined-multiline-flexible" 
                        label="title"
                        className='p-1 w-full' 
                        placeholder='title'
                        onChange={(event) => setTitle(event.target.value)}    
                    />
                </Box>
                <Box className='mt-2'>
                    <TextField 
                        id="outlined-multiline-flexible" 
                        label="description"
                        className='p-1 w-full' 
                        rows={4} multiline={true} 
                        placeholder='description'
                        onChange={(event) => setDescription(event.target.value)}    
                    />
                </Box>
                <Box className='mt-2'>
                    <TextField 
                        id="outlined-multiline-flexible" 
                        label="price"
                        className='w-full' 
                        placeholder='price'
                        type='number'
                        onChange={(event) => setPrice(Number(event.target.value))}    
                    />
                </Box>
                <Box className='mt-2'>
                    <TextField 
                        id="outlined-multiline-flexible" 
                        label="quantity in stock"
                        className='w-full' 
                        placeholder='quantity in stock'
                        type='number'
                        onChange={(event) => setQuantityInStock(Number(event.target.value))}    
                    />
                </Box>
            </Box>
            <Box className='flex justify-end py-2'>
                <Button 
                    onClick={handleSubmitProduct}
                    variant='contained' 
                    size='large'
                    color='primary'
                >Submit</Button>
            </Box>
        </Box>
    )
}

export default ProductForm
