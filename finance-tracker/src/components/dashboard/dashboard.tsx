import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Category, Transaction } from "@/lib/type";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [data, setData] = useState<{
    totalIncome: number;
    totalExpenses: number;
    recentTransactions: Transaction[];
  }>({
    totalIncome: 0,
    totalExpenses: 0,
    recentTransactions: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const [dashboardResponse, categoriesResponse] = await Promise.all([
          fetch(
            `http://localhost:5000/api/transaction/reports/monthly?year=${new Date().getFullYear()}&month=${
              new Date().getMonth() + 1
            }`,
            {
              headers: { "x-auth-token": token },
            }
          ),
          fetch("http://localhost:5000/api/categories", {
            headers: { "x-auth-token": token },
          }),
        ]);

        if (!dashboardResponse.ok || !categoriesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [monthlyData, categoriesData] = await Promise.all([
          dashboardResponse.json(),
          categoriesResponse.json(),
        ]);

        setCategories(categoriesData);
        setData({
          totalIncome: monthlyData.totalIncome,
          totalExpenses: monthlyData.totalExpenses,
          recentTransactions: monthlyData.transactions.slice(0, 5),
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c._id === categoryId)?.name || "Unknown";
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={() => router.push("/finance")}>
          View All Transactions
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              ${data.totalIncome.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              ${data.totalExpenses.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {data.recentTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className="flex justify-between items-center p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">
                    {getCategoryName(transaction.category)}
                  </p>
                </div>
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
