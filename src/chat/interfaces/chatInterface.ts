
export interface ChatInterfaceStore {
  messages: Messages[];
  isLoading: boolean;
  fileAvailable:boolean
  sendMessage: (message: string) => Promise<void>;
  sendNormalMessage: (message: string) => Promise<void>;
  uploadFile: (file: FormData) => Promise<void>;

}

export interface Messages {
  query: string;
  result: string;
}
