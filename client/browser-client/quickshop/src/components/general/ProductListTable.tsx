import React, {useState}from 'react'
import { Product } from '../../types/poduct.type'
import { 
    DataGrid, 
    GridAddIcon, 
    GridColDef, 
    GridDeleteIcon, 
    GridRowSelectionModel } from '@mui/x-data-grid';
import { Box, Button, Modal, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import ProductForm from '../product/ProductForm';
import Divider from './Divider';

interface Props {
    data: Product[] | null;
}

function ProductListTable(props: Props) {
    const {data} = props
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const columns: GridColDef[] = [
        {
            field: 'title',
            headerName: 'Product title',
            width: 200,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 250,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 100,
            headerAlign: 'left',
            align: 'left',
            type: 'number',
        },
        {
            field: 'quantityInStock',
            headerName: 'Stock Qty',
            width: 100,
            headerAlign: 'left',
            align: 'left',
            type: 'number',
        },
    ];
    return (
        <div className='m-5 bg-white w-full h-3/4'>
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
            {data 
                ? (<DataGrid
                    className='px-5'
                    getRowId={(row) => row._id}
                    rows={data}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowSelectionModel(newRowSelectionModel);
                    }}
                    rowSelectionModel={rowSelectionModel}
                    
                />)
                : (<span>Empty</span>)
            }
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
                    <ProductForm />
                </Box>
            </Modal>
        </div>
    );
}

export default ProductListTable
