import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { Budget, Category, Transaction } from "@/lib/type";

export function useFinanceData() {
  const [data, setData] = useState<{
    transactions: Transaction[];
    categories: Category[];
    budgets: Budget[];
  }>({
    transactions: [],
    categories: [],
    budgets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [transactions, categories, budgets] = await Promise.all([
        api.transactions.list(),
        api.categories.list(),
        api.budgets.list(),
      ]);
      setData({ transactions, categories, budgets });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...data, loading, error, refetch: fetchData };
}
