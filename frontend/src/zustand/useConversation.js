import { create } from 'zustand';

const useConversation = create((set) => ({
    selectedConversation: null, // Initial state for selected conversation
    setSelectedConversation: (selectedConversation) =>
        set({ selectedConversation }), // Action to set selectedConversation

    messages: [], // Initial state for messages
    setMessages: (messages) => set({ messages }), // Action to set messages
}));

export default useConversation;
