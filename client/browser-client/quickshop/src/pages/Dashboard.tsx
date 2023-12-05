import React from 'react'
import Sidebar from '../components/general/Sidebar'

function Dashboard() {
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
