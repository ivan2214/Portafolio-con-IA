import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

import {
  EosIconsThreeDotsLoading,
  MaterialSymbolsLightDirectorySync,
  RiSendPlaneFill,
  RiStopFill,
} from "@/components/icons";

interface ChatFooterProps {
  inputRef: React.RefObject<HTMLInputElement>;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  isSendMessage: boolean;
  isStopped: boolean;
  setIsStopped: (value: boolean) => void;
  setIsSendMessage: (value: boolean) => void;
  stop: () => void;
}

export function ChatFooter({
  isStopped,
  setIsStopped,
  inputRef,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  isSendMessage,
  setIsSendMessage,

  stop,
}: ChatFooterProps) {
  return (
    <CardFooter className="p-4">
      <form onSubmit={handleSubmit} className="flex w-full">
        <Input
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          placeholder="Pregunta sobre el proyecto..."
          className="mr-2 flex-grow rounded-2xl"
        />
        <section className="flex items-center gap-2">
          <Button
            onClick={() => {
              setIsSendMessage(true);
              setIsStopped(false);
            }}
            className="rounded-full"
            disabled={isLoading}
            type="submit"
            size="icon"
          >
            {isLoading ? <EosIconsThreeDotsLoading /> : <RiSendPlaneFill />}
          </Button>

          {isSendMessage && !isStopped && (
            <Button
              size="icon"
              className="rounded-full"
              variant="destructive"
              disabled={isLoading}
              onClick={() => {
                stop();

                setIsStopped(true);
              }}
            >
              <RiStopFill />
            </Button>
          )}
        </section>
      </form>
    </CardFooter>
  );
}
