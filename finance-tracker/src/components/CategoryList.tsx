import { Category, Transaction } from "@/lib/type";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface CategoryListProps {
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

export function CategoryList({
  categories,
  onDelete,
}: CategoryListProps & { onDelete: (id: string) => Promise<void> }) {
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
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div>
                <p className="font-medium">{category.name}</p>
              </div>
              <div className="flex items-center">
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      category.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {category.type === "income"}
                  </p>
                </div>
                <DeleteButton
                  onDelete={() => handleDelete(category._id)}
                  isDeleting={deletingId === category._id}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
