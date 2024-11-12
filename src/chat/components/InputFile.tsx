import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { useChatStore } from "../store/chatStore";

// Actualiza el esquema para aceptar un archivo de tipo File
export const inputFileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file instanceof File, {
      message: "El archivo es requerido",
    }),
});

export function InputFile() {
  const form = useForm<z.infer<typeof inputFileSchema>>({
    resolver: zodResolver(inputFileSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const uploadFile = useChatStore((state) => state.uploadFile);

  async function onSubmit(data: z.infer<typeof inputFileSchema>) {
    const formData = new FormData();
    formData.append("file", data.file);
   console.log(formData.get("file"));
    await uploadFile(formData);
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
                <Input
                  type="file"
                  className="border-none shadow-xl"
                  onChange={(e) => {
                    // Guarda el archivo seleccionado en el estado de React Hook Form
                    if (e.target.files && e.target.files[0]) {
                      field.onChange(e.target.files[0]);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Subir archivo</Button>
      </form>
    </Form>
  );
}