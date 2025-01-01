import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetmessages from '../hooks/useGetmessages'
import MessageSkeleton from '../skeltons/MessageSkeleton';

const Messages = () => {
    const { messages, loading } = useGetmessages();
    console.log("this is a messsages", messages);

    const lastmessage = useRef();

    useEffect(() => {

        setTimeout(() => {
            lastmessage.current.scrollIntoView({ behavior: "smooth" })

        }, 1000)

    }, [messages])
    return (
        <div className='px-4 flex-1 overflow-auto'>


            {!loading && messages.length > 0 &&

                messages.map((message) => (
                    <div key={message._id}
                        ref={(lastmessage)}



                    >

                        <Message
                            message={message}


                        />

                    </div>


                ))}

            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start a conversation </p>
            )}

        </div>
    )
}

export default Messages