import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatMessage } from "./chat-message";

interface ChatContentProps {
  messages: any[];
  typicalQuestions: string[];
  addQuestion: (question: string) => void;
  viewReasoning: boolean;
  setViewReasoning: (view: boolean) => void;
  chatContentRef: React.RefObject<HTMLDivElement>;
}

export function ChatContent({
  messages,
  typicalQuestions,
  addQuestion,
  viewReasoning,
  setViewReasoning,
  chatContentRef,
}: ChatContentProps) {
  return (
    <CardContent
      className="h-80 space-y-4 overflow-y-scroll overflow-x-hidden p-4"
      ref={chatContentRef}
    >
      {messages.length === 0 && (
        <div className="mb-4">
          <p className="mb-2 font-semibold">Preguntas sugeridas:</p>
          <div className="flex flex-col gap-2">
            {typicalQuestions.map((question) => (
              <Badge
                variant="outline"
                className="cursor-pointer rounded-2xl py-2 transition-colors duration-200 hover:bg-primary/10"
                key={question}
                onClick={() => addQuestion(question)}
              >
                {question}
              </Badge>
            ))}
          </div>
        </div>
      )}
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          viewReasoning={viewReasoning}
          setViewReasoning={setViewReasoning}
        />
      ))}
    </CardContent>
  );
}
