import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import { InputForm } from "../components/InputForm";
import { useChatStore } from "../store/chatStore";
import { motion } from "framer-motion";

export const ChatView = () => {
  const messages = useChatStore((state) => state.messages);
  return (
    <main className="bg-neutral-800 min-h-screen flex flex-col justify-between items-center">
      <ScrollArea className="h-full w-full sm:px-44">
        {messages &&
          messages.map((message, index) => (
            <div key={index} className="flex w-full flex-col max-h-[200px] sm:max-h-[238px]">
              <p className="text-gray-100 rounded-lg w-fit bg-zinc-900 p-4 m-4 rounded-tl-none">
                {message.query}
              </p>
              <p className="text-gray-100 rounded-lg w-fit self-end bg-zinc-700 p-4 m-4 rounded-tr-none">
                {message.result}
              </p>
            </div>
          ))}
      </ScrollArea>
      <motion.section
        className="w-full flex justify-center items-center"
        initial={{ opacity: 0, y: -450 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <InputForm />
      </motion.section>
    </main>
  );
};
