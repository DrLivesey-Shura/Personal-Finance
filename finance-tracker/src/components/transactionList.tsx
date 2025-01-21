import { Category, Transaction } from "@/lib/type";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface TransactionListProps {
  transactions: Transaction[];
  categories: Category[];
}

const DeleteButton = ({
  onDelete,
  isDeleting,
}: {
  onDelete: () => Promise<void>;
  isDeleting: boolean;
}) => (
  <Button
    variant="destructive"
    size="sm"
    onClick={onDelete}
    disabled={isDeleting}
    className="ml-2"
  >
    {isDeleting ? (
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
    ) : (
      <Trash2 className="h-4 w-4" />
    )}
  </Button>
);

export function TransactionList({
  transactions,
  categories,
  onDelete,
}: TransactionListProps & { onDelete: (id: string) => Promise<void> }) {
  const getCategoryName = (categoryId: string) =>
    categories.find((c) => c._id === categoryId)?.name || "Unknown";
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">
                  {getCategoryName(transaction.category)}
                </p>
              </div>
              <div className="flex items-center">
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <DeleteButton
                  onDelete={() => handleDelete(transaction._id)}
                  isDeleting={deletingId === transaction._id}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
