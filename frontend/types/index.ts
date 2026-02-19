export type ChatMessage = {
  role: "user" | "assistant";
  message: string;
};

export type Chat = {
  role: "user" | "assistant";
  content: string;
};

export type Doctor = {
  id: number;
  name: string;
  specialization: string;
  chats: Chat[];
};
