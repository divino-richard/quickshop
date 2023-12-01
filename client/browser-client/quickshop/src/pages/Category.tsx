import React, { useEffect, useState } from 'react'
import Sidebar from '../components/general/Sidebar'
import CategoriesTable from '../components/category/CategoriesTable';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { GridAddIcon, GridDeleteIcon } from '@mui/x-data-grid';
import { Edit } from '@mui/icons-material';
import Divider from '../components/general/Divider';
import { categoryService } from '../services/category';
import { AxiosError } from 'axios';
import { Category } from '../types/category.types';

interface Props {}

function CategoryPage(props: Props) {
    const {} = props
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [createCategoryError, setCreateCategoryError] = useState<string | null>(null);
    const [getCategoriesError, setGetCategoriesError] = useState<string | null>(null);

    useEffect(() => {
        handleGetCategories();
    }, []);

    const handleGetCategories = () => {
        setLoading(true);
        categoryService.getMany()
            .then(response => {
                const responseData = response.data;
                const categories = responseData.categories;
                setCategories(categories);
            })
            .catch(error => {
                if(error instanceof AxiosError) {
                    return setGetCategoriesError(error.response?.data.error.message);
                }
                return setGetCategoriesError('Something went wrong. Please try again later.')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleSubmitCategory = () => {
        const category = {
            title,
            description,
        };
        setLoading(true);
        categoryService.create(category)
            .then((response) => {
                setOpenModal(false);
                handleGetCategories();
            })
            .catch((error) => {
                console.log(error);
                if(error instanceof AxiosError) {
                    const errorData = error.response?.data;
                    return setCreateCategoryError(errorData.error.message);
                }
                return setCreateCategoryError('Something went wrong. Please try again later.');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full p-5'>
                <div className='p-2 flex items-center justify-end'>
                    <Button 
                        className='ml-2' 
                        variant="text" 
                        color='info' 
                        size="small" 
                        startIcon={<GridAddIcon />}
                        onClick={() => setOpenModal(true)}
                    >
                        Add
                    </Button>
                    <Button 
                        className='ml-2' 
                        variant="text" 
                        color='warning' 
                        size="small" 
                        startIcon={<Edit />}
                    >
                        Edit
                    </Button>
                    <Button 
                        className='ml-2' 
                        variant="text" 
                        color='error' 
                        size="small" 
                        startIcon={<GridDeleteIcon />} 
                    >
                        Delete
                    </Button>
                </div>
                <CategoriesTable data={categories}/>
                {getCategoriesError && (<Typography>{getCategoriesError}</Typography>)}
                {loading && (<Typography>Loading...</Typography>)}
            </div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='flex mt-10 justify-center'
            >
                <Box className=' bg-white px-10 py-5 rounded-md h-fit w-1/2'>
                    <Typography className='py-2' id="modal-modal-title" variant="h6" component="h2">
                        Add Category
                    </Typography>
                    <Divider />
                    <Box className='flex flex-col'>
                        {createCategoryError && 
                            (<Box className='mt-5'>
                                <Typography 
                                    className='text-red-500'
                                >
                                    {createCategoryError}
                                </Typography>
                            </Box>)
                        }
                                
                        <Box className='mt-5 w-full'>
                            <TextField 
                                className='w-full'
                                label="title"
                                placeholder='title'
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </Box>
                        <Box className='mt-5 w-full'>
                            <TextField 
                                className='w-full'
                                label="description"
                                rows={4} multiline={true} 
                                placeholder='description'
                                onChange={(event) => setDescription(event.target.value)}    
                            />
                        </Box>
                        <Box className='my-5 flex w-full justify-end'>
                            <Button 
                                onClick={handleSubmitCategory}
                                variant='contained' 
                                size='large'
                                color='primary'
                                disabled={loading ? true : false}
                            >
                                {loading ? 'Loading...' : 'Submit'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default CategoryPage
