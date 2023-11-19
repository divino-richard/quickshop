import React from 'react'
import Sidebar from '../components/general/Sidebar'

interface Props {}

function Dashboard(props: Props) {
    const {} = props

    return (
        <div className='flex'>
            <Sidebar />
            <div>
                <div>
                    <h1>Dashboard</h1>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
