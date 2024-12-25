import React from 'react'
import { IoSearchOutline } from "react-icons/io5";

const Searchbar = () => {
    return (
        <form className='flex  gap-3'>
            <input type='text' placeholder='search ' className=' input input-bordered rounded-full' />
            <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
                <IoSearchOutline className='w-6 h-6 outline-none' />

            </button>
        </form>
    )
}

export default Searchbar