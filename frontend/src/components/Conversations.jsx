import React from 'react'
import Conversation from './Conversation'


const Conversations = () => {
    console.log('Rendering Conversations component...');
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            <Conversation />
            <Conversation />
            <Conversation />


        </div>
    )
}

export default Conversations