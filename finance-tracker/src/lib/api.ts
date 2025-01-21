import { Budget, Category, Transaction } from "./type";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      "x-auth-token": token || "",
    },
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
}

export const api = {
  transactions: {
    list: () => fetchWithAuth("/transaction"),
    create: (data: Omit<Transaction, "_id">) =>
      fetchWithAuth("/transaction", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchWithAuth(`/transaction/${id}`, { method: "DELETE" }),
  },
  categories: {
    list: () => fetchWithAuth("/categories"),
    create: (data: Omit<Category, "_id">) =>
      fetchWithAuth("/categories", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchWithAuth(`/categories/${id}`, { method: "DELETE" }),
  },
  budgets: {
    list: () => fetchWithAuth("/budgets"),
    create: (data: Omit<Budget, "_id">) =>
      fetchWithAuth("/budgets", { method: "POST", body: JSON.stringify(data) }),
    delete: (id: string) =>
      fetchWithAuth(`/budgets/${id}`, { method: "DELETE" }),
  },
};
