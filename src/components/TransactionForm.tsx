import React, { useState } from "react";
import { useWalletStore } from "../store/useWalletStore";

interface TransactionFormProps {
  onClose: () => void;
}

export const TransactionForm = ({ onClose }: TransactionFormProps) => {
  const addTransaction = useWalletStore((state) => state.addTransaction);
  const categories = useWalletStore((state) => state.categories);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const filteredCategories = categories.filter((cat) => cat.type === type);
  const [selectedCategory, setSelectedCategory] = useState(
    filteredCategories[0]?.name || "",
  );

  const handleTypeChange = (newType: "income" | "expense") => {
    setType(newType);
    const newFiltered = categories.filter((cat) => cat.type === newType);
    if (newFiltered.length > 0) {
      setSelectedCategory(newFiltered[0].name);
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setError("Пожалуйста, введите корректную сумму");
      return;
    }
    if (!description.trim()) {
      setError("Пожалуйста, введите описание транзакции");
      return;
    }

    setError("");
    addTransaction({
      amount: parseFloat(amount),
      description,
      type,
      category: selectedCategory,
    });

    setSuccessMessage("Транзакция успешно добавлена!");
    setSelectedCategory("");
    setAmount("");
    setDescription("");

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-2xl w-full"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-slate-400 hover:text-pink-500 transition text-lg font-bold px-2 py-1"
      >
        ✕
      </button>

      <h3 className="text-xl font-bold text-white mb-4 pr-6">
        Новая транзакция
      </h3>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-500/10 border border-green-500 text-green-400 text-sm p-3 rounded-lg mb-4">
          {successMessage}
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="type"
          className="block text-sm font-medium text-slate-300 mb-1"
        >
          Тип транзакции
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) =>
            handleTypeChange(e.target.value as "income" | "expense")
          }
          className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition cursor-pointer"
        >
          <option value="expense">📉 Расход</option>
          <option value="income">📈 Доход</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-slate-300 mb-1"
        >
          Категория
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition cursor-pointer"
        >
          {filteredCategories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-slate-300 mb-1"
        >
          Сумма
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
          placeholder="0.00"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-slate-300 mb-1"
        >
          Описание
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
          placeholder="Например: Покупка продуктов..."
        />
      </div>

      <button
        type="submit"
        className="w-full mt-2 bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-pink-500/20 transition duration-200"
      >
        Добавить транзакцию
      </button>
    </form>
  );
};
