import React from 'react'
import useConversation from '../zustand/useconversation'

const Conversation = ({ conversation, emoji, lastindex }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();


    // Add a check to safely access _id
    const isselected = selectedConversation && selectedConversation._id === conversation._id;

    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
                
                ${isselected ? "bg-red-500" : null}
                
                `}
                onClick={() => setSelectedConversation(conversation)}>
                <div className="avatar online">
                    <div className="w-12 rounded-full">
                        <img src={conversation.profilepic} alt='sorry something went wrong' />
                    </div>
                </div>
                <div className=' flex flex-col flex-1'>
                    <div className='flex gap-1 jusb'>
                        <p className='font-bold text-gray-200'>{conversation.fullname}</p>
                        <span className='text-xl'>{emoji}</span>
                    </div>

                </div>

            </div>

            {!lastindex && <div className=' divider my-0 py-0 h-1' />}
        </>
    )
}

export default Conversation
