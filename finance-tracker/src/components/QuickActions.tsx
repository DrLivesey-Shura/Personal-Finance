import { Plus } from "lucide-react";
import { Button } from "./ui/button";

interface QuickActionsProps {
  onAction: (type: "transaction" | "category" | "budget") => void;
}

export function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { type: "transaction", label: "New Transaction" },
        { type: "category", label: "New Category" },
        { type: "budget", label: "New Budget" },
      ].map(({ type, label }) => (
        <Button
          key={type}
          className="w-full"
          onClick={() =>
            onAction(type as "transaction" | "category" | "budget")
          }
        >
          <Plus className="w-4 h-4 mr-2" />
          {label}
        </Button>
      ))}
    </div>
  );
}
