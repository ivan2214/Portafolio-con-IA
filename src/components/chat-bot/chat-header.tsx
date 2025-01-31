import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MaterialSymbolsCloseSmallOutline } from "@/components/icons";

interface Repository {
  id: number;
  name: string;
}

interface ChatHeaderProps {
  repository: Repository;
  onClose: () => void;
}

export function ChatHeader({ repository, onClose }: ChatHeaderProps) {
  return (
    <CardHeader className="rounded-t-2xl shadow-2xl bg-primary text-primary-foreground">
      <CardTitle className="flex items-center justify-between">
        <span>Chat sobre {repository.name}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="rounded-full"
        >
          <MaterialSymbolsCloseSmallOutline />
        </Button>
      </CardTitle>
    </CardHeader>
  );
}
