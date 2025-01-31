"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useChat } from "ai/react";
import { ChatHeader } from "./chat-header";
import { ChatContent } from "./chat-content";
import { ChatFooter } from "./chat-footer";

interface Repository {
  id: number;
  name: string;
}

interface ChatBotProps {
  repository: Repository;
}

export function ChatBot({ repository }: ChatBotProps) {
  if (!repository) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [viewReasoning, setViewReasoning] = useState(false);

  const [isSendMessage, setIsSendMessage] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null!);
  const chatContentRef = useRef<HTMLDivElement>(null!);

  const {
    error,
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
  } = useChat({
    api: "/api/chat",
    body: { repositoryId: repository.id },
  });

  const typicalQuestions = [
    "¿Cuál es el propósito principal de este proyecto?",
    "¿Qué tecnologías se utilizaron en este proyecto?",
    "¿Cómo puedo contribuir a este proyecto?",
    "¿Cuáles son las principales características de este proyecto?",
  ];

  const toggleChat = () => setIsOpen(!isOpen);
  const onClose = () => setIsOpen(false);

  /**
   * Función para añadir una pregunta sugerida al input.
   */
  const addQuestion = (question: string) => {
    if (inputRef.current) {
      const event = {
        target: { value: question } as HTMLInputElement,
        currentTarget: inputRef.current,
        nativeEvent: new Event("input"),
        bubbles: true,
        cancelable: true,
      };
      handleInputChange(event as React.ChangeEvent<HTMLInputElement>);
    }
  };

  /**
   * Efecto que controla el scroll automático.
   * Si el usuario se encuentra a menos de 100px del final, se hace scroll al final.
   * De lo contrario, se respeta la posición actual.
   */
  useEffect(() => {
    const el = chatContentRef.current;
    if (!el) return;
    const threshold = 100; // píxeles de margen para considerar "cerca del final"
    const isUserNearBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;

    if (isUserNearBottom) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  if (!isOpen) {
    return (
      <Button
        className="fixed right-4 bottom-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90"
        onClick={toggleChat}
      >
        Chat sobre {repository.name}
      </Button>
    );
  }

  return (
    <Card className="fixed right-4 bottom-4 md:w-[500px] rounded-2xl bg-background/80 shadow-xl backdrop-blur-sm transition-all duration-300">
      <ChatHeader repository={repository} onClose={onClose} />
      <ChatContent
        isLoading={isLoading}
        isSendMessage={isSendMessage}
        setIsStopped={setIsStopped}
        error={error}
        reload={reload}
        messages={messages}
        typicalQuestions={typicalQuestions}
        addQuestion={addQuestion}
        viewReasoning={viewReasoning}
        setViewReasoning={setViewReasoning}
        chatContentRef={chatContentRef}
      />
      <ChatFooter
        inputRef={inputRef}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isSendMessage={isSendMessage}
        setIsSendMessage={setIsSendMessage}
        stop={stop}
        isStopped={isStopped}
        setIsStopped={setIsStopped}
      />
    </Card>
  );
}
