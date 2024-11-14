import { Button } from "@/components/shadcn/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/ui/dialog"
import { Paperclip } from "lucide-react"
import { InputFile } from "./InputFile"
import { useState } from "react"

export const DialogFormFile = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>
          <Paperclip />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subí tu PDF</DialogTitle>
          <DialogDescription>
            Una vez subido, podrás hacerle preguntas.
          </DialogDescription>
        </DialogHeader>
        <InputFile close={() => setOpen(false)} />
        <DialogFooter className="text-sm text-orange-400">
          Solo se admiten archivos PDF
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}




