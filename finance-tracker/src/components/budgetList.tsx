import { Budget, Category, Transaction } from "@/lib/type";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface BudgetListProps {
  budgets: Budget[];
  categories: Category[];
  transactions: Transaction[];
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

export function BudgetList({
  budgets,
  categories,
  transactions,
  onDelete,
}: BudgetListProps & { onDelete: (id: string) => Promise<void> }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  const calculateSpent = (budget: Budget) => {
    const relevantTransactions = transactions.filter(
      (t) =>
        t.category === budget.category &&
        t.type === "expense" &&
        new Date(t.date) >= new Date(budget.startDate) &&
        (!budget.endDate || new Date(t.date) <= new Date(budget.endDate))
    );
    return relevantTransactions.reduce((sum, t) => sum + t.amount, 0);
  };

  const getProgressPercentage = (budget: Budget) => {
    const spent = calculateSpent(budget);
    return Math.min((spent / budget.amount) * 100, 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Budgets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {budgets.map((budget) => {
            const percentage = getProgressPercentage(budget);
            const category = categories.find((c) => c._id === budget.category);

            return (
              <div key={budget._id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{category?.name}</p>
                    <p className="text-sm text-gray-500">
                      {budget.period.charAt(0).toUpperCase() +
                        budget.period.slice(1)}
                    </p>
                  </div>
                  <p className="font-bold">${budget.amount.toFixed(2)}</p>
                </div>
                <div className="mt-2">
                  <div className="h-2 bg-gray-200 rounded overflow-hidden">
                    <div
                      className={`h-full rounded transition-all duration-500 ${
                        percentage > 90
                          ? "bg-red-500"
                          : percentage > 75
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    ${calculateSpent(budget).toFixed(2)} spent of $
                    {budget.amount.toFixed(2)}
                  </p>
                </div>
                <DeleteButton
                  onDelete={() => handleDelete(budget._id)}
                  isDeleting={deletingId === budget._id}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
