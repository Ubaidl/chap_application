import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import useConversation from '../zustand/useConversation';
import useGetConversations from '../hooks/usegetConversations';
import toast from 'react-hot-toast';

const Searchbar = () => {
    const [search, setsearch] = useState("")
    const { setSelectedConversation } = useConversation();
    const { conversations } = useGetConversations();
    const handlesubmit = (e) => {
        e.preventDefault();
        if (!search) return;

        if (search.length < 3) {
            return toast.error("search must be more than 3 characters");
        }
        const conversation = conversations.find((e) => e.fullname.toLowerCase().includes(search.toLowerCase()));

        if (conversation) {
            setSelectedConversation(conversation);
            setsearch('')
        } else {
            toast.error("no such user is exist")
        }


    }
    return (
        <form onSubmit={handlesubmit} className='flex  gap-3'>
            <input type='text' placeholder='search ' className=' input input-bordered rounded-full'
                value={search} onChange={(e) => setsearch(e.target.value)}

            />
            <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
                <IoSearchOutline className='w-6 h-6 outline-none' />

            </button>
        </form>
    )
}

export default Searchbar