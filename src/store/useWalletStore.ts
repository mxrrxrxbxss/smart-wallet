import { create } from "zustand";
import type { Transaction, WalletState } from "../types/wallet";
import { persist } from "zustand/middleware";

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      user: {
        name: "Shevchenko Maxim",
        email: "shevchenko.maxim@example.com",
        avatarUrl: "https://via.placeholder.com/100",
      },
      balance: 0,
      transactions: [],
      categories: [
        {
          id: "1",
          name: "Зарплата",
          type: "income",
          icon: "💰",
          color: "#10B981",
        },
        {
          id: "2",
          name: "Фриланс",
          type: "income",
          icon: "💻",
          color: "#3B82F6",
        },
        {
          id: "3",
          name: "Подарки",
          type: "income",
          icon: "🎁",
          color: "#8B5CF6",
        },
        {
          id: "4",
          name: "Продукты",
          type: "expense",
          icon: "🛒",
          color: "#EF4444",
        },
        {
          id: "5",
          name: "Транспорт",
          type: "expense",
          icon: "🚗",
          color: "#F59E0B",
        },
        {
          id: "6",
          name: "Жилье",
          type: "expense",
          icon: "🏠",
          color: "#6366F1",
        },
        {
          id: "7",
          name: "Кафе и рестораны",
          type: "expense",
          icon: "🍔",
          color: "#EC4899",
        },
        {
          id: "8",
          name: "Развлечения",
          type: "expense",
          icon: "🎉",
          color: "#14B8A6",
        },
        {
          id: "9",
          name: "Здоровье",
          type: "expense",
          icon: "💊",
          color: "#84CC16",
        },
      ],
      addTransaction: (transactionData) => {
        const newTransaction: Transaction = {
          id: (Math.random() * 1000000).toString(),
          amount: transactionData.amount,
          date: new Date().toISOString(),
          description: transactionData.description,
          type: transactionData.type,
          category: transactionData.category,
        };

        set((state) => ({
          transactions: [...state.transactions, newTransaction],
          balance:
            transactionData.type === "income"
              ? state.balance + transactionData.amount
              : state.balance - transactionData.amount,
        }));
      },
      removeTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        }));
      },
      clearHistory: () => {
        set({
          transactions: [],
        });
      },
    }),
    {
      name: "wallet-storage",
    },
  ),
);
