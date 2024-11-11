
export interface ChatInterfaceStore {
  messages: Messages[];
  isLoading: boolean;
  sendMessage: (message: string) => Promise<void>;
  sendNormalMessage: (message: string) => Promise<void>;
}

export interface Messages {
  query: string;
  result: string;
}
