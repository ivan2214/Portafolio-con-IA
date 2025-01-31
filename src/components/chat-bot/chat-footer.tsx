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
  setIsSendMessage: (value: boolean) => void;
  reload: () => void;
  stop: () => void;
}

export function ChatFooter({
  inputRef,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  isSendMessage,
  setIsSendMessage,
  reload,
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
            }}
            className="rounded-2xl"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? <EosIconsThreeDotsLoading /> : <RiSendPlaneFill />}
          </Button>
          {isSendMessage && (
            <Button
              className="rounded-2xl"
              variant="outline"
              disabled={isLoading}
              onClick={reload}
            >
              <MaterialSymbolsLightDirectorySync />
            </Button>
          )}
          {isSendMessage && (
            <Button
              className="rounded-2xl"
              variant="destructive"
              onClick={stop}
            >
              <RiStopFill />
            </Button>
          )}
        </section>
      </form>
    </CardFooter>
  );
}
