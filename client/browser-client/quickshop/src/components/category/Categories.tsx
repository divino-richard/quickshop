import React from 'react'
import CategoryItem from './CategoryItem';
import Divider from '../general/Divider';

export interface Category {
    title: string;
    description: string;
}

function Categories() {
    const categories: Category[] = [
        {
            title: "Category one",
            description: "This is the category one",
        },
        {
            title: "Category two",
            description: "This is the category two",
        },
        {
            title: "Category three",
            description: "This is the category three",
        },
        {
            title: "Category four",
            description: "This is the category four",
        },
        {
            title: "Category five",
            description: "This is the category five",
        },
    ]
    return (
        <div className='ml-5 p-2 h-96 w-1/3 bg-white border-t-2 border-rose-500'>
            <h1 className='text-gray-500 mb-2 font-semibold'>Categories</h1>
            <Divider />
            <div className='mt-2'>
                
                {categories.map((category) => (
                    <CategoryItem data={category}/>
                ))}
            </div>
        </div>
    )
}

export default Categories
