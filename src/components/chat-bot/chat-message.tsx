import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: any;
  viewReasoning: boolean;
  setViewReasoning: (view: boolean) => void;
}

export function ChatMessage({
  message,
  viewReasoning,
  setViewReasoning,
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        "max-w-xs rounded-2xl p-2",
        message.role === "user"
          ? "ml-auto overflow-hidden bg-primary text-primary-foreground"
          : "mr-auto overflow-hidden bg-secondary text-secondary-foreground"
      )}
    >
      {message.role === "user" ? (
        <Badge
          variant="outline"
          className="text-primary-foreground rounded-2xl"
        >
          Tú:{" "}
        </Badge>
      ) : (
        <Badge className="rounded-2xl">IA: </Badge>
      )}

      {message?.reasoning && (
        <Button
          variant="outline"
          size="sm"
          className="ml-4 rounded-2xl"
          onClick={() => setViewReasoning(!viewReasoning)}
        >
          Ver razonamiento
        </Button>
      )}

      {viewReasoning && message?.reasoning && (
        <p className="my-2 whitespace-pre-wrap text-muted-foreground">
          {message?.reasoning}
        </p>
      )}

      <div>
        {message.content &&
          message.content.length > 0 &&
          message.content.split("```").map((part: string, index: number) => {
            if (index % 2 === 1) {
              return (
                <pre
                  key={part + index}
                  className="my-2 overflow-x-auto rounded bg-gray-800 p-2 text-white"
                >
                  <code>{part.trim()}</code>
                </pre>
              );
            }
            return (
              <p className="my-2 whitespace-pre-wrap" key={part + index}>
                {part}
              </p>
            );
          })}
      </div>
    </div>
  );
}
