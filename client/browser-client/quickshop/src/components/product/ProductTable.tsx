import React from 'react'
import { Product } from '../../types/poduct.type'
import { Table, Image, Popconfirm, Button, ButtonProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { API_END_POINT } from '../../constant/api.constant';

interface Props {
    data: Product[] | null;
    deleteProduct: (productId: string) => void;
}

function ProductListTable(props: Props) {
    const {data, deleteProduct} = props

    const columns: ColumnsType<Product> = [
        {
            title: 'Image',
            render: (data: Product) => (
                <Image
                    width={80}
                    height={50}
                    className='object-contain bg-gray-100'
                    src={`${API_END_POINT}/uploads/products/${data.images && data.images[0]}`}
                />
            )
        },
        {
            dataIndex: 'title',
            title: 'Product titl',
        },
        {
            dataIndex: 'description',
            title: 'Description',
        },
        {
            dataIndex: 'price',
            title: 'Price',
        },
        {
            dataIndex: 'quantityInStock',
            title: 'Stock Qty',
        },
        {
            title: 'Actions',
            render: (data: Product) => {
                const okButtonProps: ButtonProps = {
                    className: 'bg-blue-500',
                }
            
                return (
                    <div>
                        <button 
                            className='p-2 rounded-sm text-blue-500 hover:bg-blue-100'
                        >
                            <EditOutlined />
                        </button>
                        <Popconfirm
                            title="Delete the product"
                            description="Are you sure to delete this product?"
                            okText="Yes"
                            cancelText="No"
                            placement='topRight'
                            okButtonProps={okButtonProps}
                            onConfirm={() => deleteProduct(data._id??'')}
                        >
                            <Button 
                                danger 
                                type='text'
                            >
                                <DeleteOutlined className='align-middle'/>
                            </Button>
                        </Popconfirm>
                    </div>
                )
            },
        },
    ];
    return (
        <div className='bg-white w-full min-h-fit'>
            {data 
                ? (
                    <Table
                        dataSource={data}
                        columns={columns}
                    />
                ) : (<span>Empty</span>)
            }
        </div>
    );
}

export default ProductListTable
