export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: "income" | "expense";
  category: string;
}

export interface Category {
  id: string;
  name: string;
  type: Transaction["type"];
  icon: string;
  color: string;
}

export interface Profile {
  name: string;
  email: string;
  avatarUrl: string;
}

export interface WalletState {
  user: Profile;
  balance: number;
  transactions: Transaction[];
  categories: Category[];
  addTransaction: (transaction: {
    amount: number;
    description: string;
    type: "income" | "expense";
    category: string;
  }) => void;
  removeTransaction: (id: string) => void;
  clearHistory: () => void;
}
