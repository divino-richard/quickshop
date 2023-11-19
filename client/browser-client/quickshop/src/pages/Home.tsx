import React from 'react'
import Banner from '../components/Banner'
import Categories from '../components/category/Categories'
import TopBrands from '../components/brand/TopBrands'
import Products from '../components/product/Products'

interface Props {}

function Home(props: Props) {
    const {} = props

    return (
        <div className='px-5 lg:px-20 xl:px-40 2xl:px-52'>
            <div className='py-5 flex items-start'>
                <div className='w-full'>
                    <Banner />
                    <TopBrands />
                </div>
                <Categories />
            </div>
            <Products />
        </div>
    )
}

export default Home
