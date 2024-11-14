import { create, StateCreator } from "zustand";
import { ChatInterfaceStore } from "../interfaces/chatInterface";
import { persist } from "zustand/middleware";
import { sendMessage, sendNormalMessage, uploadFile } from "../api/chatRequests";
import { toast } from "sonner";

const chatStore: StateCreator<ChatInterfaceStore> = (set, get) => ({
    messages: [],
    isLoading: false,
    fileAvailable: false,
    sendMessage: async (message) => {
        set({ isLoading: true });
        
        const response = await sendMessage(message);
        if (!response) {
            toast.error("Error en la conexión con el servidor", {
                description: 'No se puede procesar la solicitud en este momento.',
                className: 'bg-red-500 border-none text-white text-sm',
            });
            set({ isLoading: false });
            return;
        }

        const parsedResponse = JSON.parse(response);
        const reader = parsedResponse.data.getReader();
        const decoder = new TextDecoder("utf-8");
        let result = "";

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                result += chunk;

                set((state) => ({
                    messages: [
                        ...state.messages,
                        { query: message, result: result }
                    ]
                }));
            }
        } catch (error) {
            console.error("Error al recibir el stream:", error);
        } finally {
            set({ isLoading: false });
        }
    },
    sendNormalMessage: async (message) => {
        set({ isLoading: true });
        const response = await sendNormalMessage(message);
        console.log(response?.data.answer);
        if (response?.status !== 200) {
            toast.error("Error en la conexión con el servidor", {
                description: 'No se puede procesar la solicitud en este momento.',
                className: 'bg-red-500 border-none text-white text-sm',
            });
            set({ isLoading: false });
            return;
        }

        get().messages.push({ query: message, result: response.data.answer })
        set({
            isLoading: false, 
        });
    },
    uploadFile: async(file) => {
        console.log(file);
        set({isLoading: true})
        const response = await uploadFile(file);
        if( response?.status !== 200){
            toast.error('Error en el servidor', {
                description: 'No se puede procesar la solicitud en este momento.',
                className: 'bg-red-500 border-none text-white text-sm',
            });
            set({isLoading: false});
            return;
        }
        set({isLoading: false, fileAvailable: true})

    }
});

export const useChatStore = create<ChatInterfaceStore>()(
    persist(chatStore, { name: "chat-store" })
);
