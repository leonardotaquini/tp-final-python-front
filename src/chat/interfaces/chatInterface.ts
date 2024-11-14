
export interface ChatInterfaceStore {
  messages: Messages[];
  isLoading: boolean;
  fileAvailable:boolean;
  pdfName: string;
  sendMessage: (message: string) => Promise<void>;
  sendNormalMessage: (message: string) => Promise<void>;
  uploadFile: (file: FormData | null) => Promise<void>;
  getPdfName: () => Promise<void>;

}

export interface Messages {
  query: string;
  result: string;
}
export interface QueryResponse {
  answer: string;
}

export interface GetPDF {
  filename: string;
}
