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
import { Paperclip } from "lucide-react";
import { useChatStore } from "../store/chatStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";

export const inputFileSchema = z.object({
  file: z.any().optional(),
});

export function InputFile() {
  const uploadFile = useChatStore((state) => state.uploadFile);

  const form = useForm<z.infer<typeof inputFileSchema>>({
    resolver: zodResolver(inputFileSchema),
    defaultValues: {
      file: "",
    },
  });

  async function onSubmit(data: z.infer<typeof inputFileSchema>) {
    await uploadFile(data.file);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button className="rounded-full">
                      <Paperclip />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-zinc-700 text-white border-none p-4">
                    <DropdownMenuLabel className="mb-4">Selecciona un archivo</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Input {...field} type="file" className="bg-zinc-800 text-slate-50 border-none shadow-xl" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
