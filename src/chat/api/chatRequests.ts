import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const chatRequests = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});


export const sendMessage = async (message: string) => {
  try {
    const response = await chatRequests.post("/get_answer_stream", { message }, {
      responseType: "stream", 
    });

    if (response.data && response.data.getReader) {
      const reader = response.data.getReader();
      const decoder = new TextDecoder("utf-8");

      let result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        result += chunk;

        console.log("Fragmento recibido:", chunk);
      }
      return result;
    }
  } catch (error) {
    console.error("Error al recibir el stream:", error);
    return null;
  }
};

export const sendNormalMessage = async (message: string) => {
  try {
    const response = await chatRequests.post("/get_answer", { message });
    return response;
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
    return null;
  }
}

export const uploadFile = async (file: FormDataEntryValue | null) => {
  try {
    const response = await chatRequests.post("/upload_pdf", {file}, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error("Error al subir archivo:", error);
    return null;
  }
}