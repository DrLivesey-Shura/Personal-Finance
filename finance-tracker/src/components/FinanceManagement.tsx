import { useState } from "react";
import { useFinanceData } from "../hooks/useFinanceData";
import { QuickActions } from "./QuickActions";
import { Alert, AlertDescription } from "./ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { TransactionList } from "./transactionList";
import { BudgetList } from "./budgetList";
import TransactionForm from "./forms/TransactionForm";
import CategoryForm from "./forms/CategoryForm";
import BudgetForm from "./forms/BudgetForm";
import { api } from "@/lib/api";
import { CategoryList } from "./CategoryList";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FinanceManagement() {
  const { transactions, categories, budgets, loading, error, refetch } =
    useFinanceData();
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const handleSuccess = () => {
    setActiveDialog(null);
    refetch();
  };

  const dialogs = {
    transaction: {
      title: "Add New Transaction",
      component: TransactionForm,
    },
    category: {
      title: "Add New Category",
      component: CategoryForm,
    },
    budget: {
      title: "Add New Budget",
      component: BudgetForm,
    },
  };

  const handleDelete = {
    transaction: async (id: string) => {
      try {
        await api.transactions.delete(id);
        refetch();
      } catch (err) {
        console.log(err);
      }
    },
    category: async (id: string) => {
      try {
        await api.categories.delete(id);
        refetch();
      } catch (err) {
        console.log(err);
      }
    },
    budget: async (id: string) => {
      try {
        await api.budgets.delete(id);
        refetch();
      } catch (err) {
        console.log(err);
      }
    },
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <Button onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="h-4 w-4" />
          Home
        </Button>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <h1 className="text-2xl mr-4 font-bold"></h1>
      </div>
      <QuickActions onAction={(type) => setActiveDialog(type)} />

      {Object.entries(dialogs).map(([key, { title, component: Component }]) => (
        <Dialog
          key={key}
          open={activeDialog === key}
          onOpenChange={() => setActiveDialog(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <Component
              onSuccess={handleSuccess}
              {...(key !== "transaction" && { categories })}
            />
          </DialogContent>
        </Dialog>
      ))}

      <TransactionList
        transactions={transactions}
        categories={categories}
        onDelete={handleDelete.transaction}
      />
      <BudgetList
        budgets={budgets}
        categories={categories}
        transactions={transactions}
        onDelete={handleDelete.budget}
      />
      <CategoryList categories={categories} onDelete={handleDelete.category} />
    </div>
  );
}
