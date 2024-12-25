import React from 'react';
import Messages from './Messages';
import Messageinput from './Messageinput';
import { TiMessages } from 'react-icons/ti';

const MessageContainer = () => {
    const noChatSelected = true; // Renamed to avoid naming conflict

    if (noChatSelected) {
        return <NoChatSelected />; // Correctly rendering the component
    } else {
        return (
            <div className='md-min-w-[450] flex flex-col'>
                <div className='bg-slate-500 px-4 py-2 mb-2'>
                    <span className='label-text'>To</span> <span className='text-gray-900 font-bold'>lone ubaid</span>
                </div>
                <Messages />
                <Messageinput />
            </div>
        );
    }
};

const NoChatSelected = () => {
    // Correct component syntax with return statement
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='p-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome ✌️ Ubaid</p> {/* Fixed casing for <p> */}
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};

export default MessageContainer;