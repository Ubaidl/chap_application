import React from 'react'
import Searchbar from './Searchbar'

import Conversations from './Conversations'
import Logout from './Logout'

const Sidebar = () => {
    return (
        <>
            <div className='boredr-r border-slate-500 py-4 flex flex-col'>
                <Searchbar />
                <div className='divider px-3'></div>
                <Conversations />
                <Logout />

            </div>



        </>


    )
}

export default Sidebar