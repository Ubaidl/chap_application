import React from 'react';
import { useAuthcontext } from '../Contextapi/Authcontext';  // Use the custom hook
import useConversation from '../zustand/useConversation';
import { extracttime } from '../util/extracttime';

const Message = ({ message }) => {
    const { authuser } = useAuthcontext();  // Get authuser from context
    const { selectedConversation } = useConversation();

    const fromme = message.senderId === authuser?._id;  // Check if the message is from the current user
    const formattedtime = extracttime(message.createdAt)
    const chatClassName = fromme ? 'chat-end' : 'chat-start';
    const profilepic = fromme ? authuser.profilepic : selectedConversation?.profilepic;  // Use the profile picture of the sender or the conversation
    const bubbleBgColor = fromme ? 'bg-blue-500' : "";

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img
                        alt="Profile picture"
                        src={profilepic || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}  // Fallback image URL
                    />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formattedtime}</div>
        </div>
    );
}

export default Message;
