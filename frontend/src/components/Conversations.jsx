import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../hooks/usegetConversations'
import { getRandomEmoji } from '../util/emojies'; // Ensure getRandomEmoji is being imported properly

const Conversations = () => {
    const { loading, conversations } = useGetConversations();
    console.log("conversations", conversations);

    return (
        <div>
            {/* Ensure you return the JSX inside the map */}
            {conversations.map((conversation, idx) => {
                return (
                    <Conversation
                        key={conversation._id}
                        conversation={conversation}
                        emoji={getRandomEmoji()}
                        lastIdx={idx === conversations.length - 1}
                    />
                );
            })}

            {/* Loading spinner when the data is still being fetched */}
            {loading ? <span className='loading loading-spinner'></span> : null}
        </div>
    )
}

export default Conversations;
