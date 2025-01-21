export interface Transaction {
  _id: string;
  date: string;
  description: string;
  category: string;
  type: "income" | "expense";
  amount: number;
  categoryDetails?: Category; // Add this for populated category data
}

export interface Category {
  _id: string;
  name: string;
  type: "income" | "expense";
  color: string;
}

export interface Budget {
  _id: string;
  category: string;
  period: "monthly" | "yearly";
  amount: number;
  startDate: string;
  endDate?: string;
  notifications: {
    enabled: boolean;
    threshold: number;
  };
}
