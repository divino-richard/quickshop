import React, {useState}from 'react'
import { 
    DataGrid, 
    GridColDef, 
    GridRowSelectionModel } from '@mui/x-data-grid';
import { Category } from '../../types/category.types';

interface Props {
    data: Category[];
}

function CategoriesTable(props: Props) {
    const {data} = props
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    
    const columns: GridColDef[] = [
        {
            field: 'title',
            headerName: 'Title',
            width: 200,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 250,
        },
    ];

    return (
        <div className='bg-white w-full min-h-fit'>
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
        </div>
    );
}

export default CategoriesTable
