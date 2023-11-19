import React from 'react'
import { Category } from './Categories';

interface Props {
    data: Category;
}

function CategoryItem(props: Props) {
    const {data} = props

    return (
        <div className='flex items-center p-2 cursor-pointer hover:bg-gray-100'>
            <img className='w-10 bg-gray-100 mr-2 rounded-md' src="/bag.png" alt="category-item"/>
            <h1 className='font-semibold text-md text-gray-500'>{data.title}</h1>
        </div>
    )
}

export default CategoryItem
