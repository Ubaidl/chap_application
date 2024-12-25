import React from 'react'

const Conversation = () => {
    return (
        <>
            <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
                <div className='avatar-online'></div>
                <div className='w-12 h-12 rounded-full overflow-hidden'>
                    <img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' alt='sorry' />

                </div>
                <div>

                </div>
                <div className='flex flex-col flex-1'>
                    <div className=' flex justify-between items-center'>
                        <p className='font-bold text-gray-200'> ubaid</p>
                        <span className='text xl'>❤️</span>
                    </div>
                </div>

            </div>
            <div className=' divider my-2 py-0 h-1 bg-gray-700' />


        </>

    )
}

export default Conversation