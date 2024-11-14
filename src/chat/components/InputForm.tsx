import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { ArrowUp, Loader2 } from "lucide-react";
import { useChatStore } from "../store/chatStore";
import { useNavigate } from "react-router-dom";

import { DialogFormFile } from "./DialogFormFile";

 const messageSchema = z.object({
  message: z.string().min(4, {
    message: "El mensaje debe tener al menos 4 caracteres",
  }),
  file: z.any().optional(),
});

export function InputForm() {
  const sendMessage = useChatStore((state) => state.sendNormalMessage);
  const isLoading = useChatStore((state) => state.isLoading);
  const fileAvailable = useChatStore((state) => state.fileAvailable);
  const navigate = useNavigate();



  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof messageSchema>) {
    await sendMessage(data.message);
    form.reset();
    navigate("/chat");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-8 flex justify-center items-center shadow rounded-3xl px-5 py-3 bg-zinc-800 w-full sm:w-2/4 mx-4 sm:mx-0 "
      >
      <DialogFormFile />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  placeholder={fileAvailable ? "Escribe un mensaje" : " ←  Sube un archivo"}
                  className="border-none rounded-none bg-transparent text-gray-100 sm:text-xl focus-visible:outline-none"
                  disabled={!fileAvailable}
                  readOnly={!fileAvailable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={"default"}
          className="border-none rounded-3xl"
          disabled={!fileAvailable}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <ArrowUp />}
        </Button>
      </form>
    </Form>
  );
}
