import { useState } from "react";
import { useWalletStore } from "../store/useWalletStore";

interface TransactionListProps {
  onClose: () => void;
}

export const TransactionList = ({ onClose }: TransactionListProps) => {
  const transactions = useWalletStore((state) => state.transactions);
  const removeTransaction = useWalletStore((state) => state.removeTransaction);
  const clearHistory = useWalletStore((state) => state.clearHistory);

  const [filterType, setFilterType] = useState<"income" | "expense" | "all">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyIncome = transactions
    .filter((tx) => {
      if (!tx.date) return false;
      const txDate = new Date(tx.date);
      return (
        tx.type === "income" &&
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, tx) => sum + tx.amount, 0);

  const monthlyExpense = transactions
    .filter((tx) => {
      if (!tx.date) return false;
      const txDate = new Date(tx.date);
      return (
        tx.type === "expense" &&
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, tx) => sum + tx.amount, 0);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesType = filterType === "all" || tx.type === filterType;
    const matchesSearch = tx.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 relative">
      <h2 className="text-xl font-bold text-white text-center">
        История транзакций
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 flex flex-col items-center">
          <span className="text-xs text-slate-400 mb-1">Доходы за месяц</span>
          <span className="text-green-400 font-bold text-lg">
            +${monthlyIncome.toFixed(2)}
          </span>
        </div>
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 flex flex-col items-center">
          <span className="text-xs text-slate-400 mb-1">Расходы за месяц</span>
          <span className="text-red-400 font-bold text-lg">
            -${monthlyExpense.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex gap-2 justify-center mt-1">
        <button
          onClick={() => setFilterType("all")}
          className={`text-xs px-4 py-2 rounded-xl transition border ${
            filterType === "all"
              ? "bg-slate-700 text-white border-slate-500 font-semibold"
              : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
          }`}
        >
          Все
        </button>
        <button
          onClick={() => setFilterType("income")}
          className={`text-xs px-4 py-2 rounded-xl transition border ${
            filterType === "income"
              ? "bg-green-600/30 text-green-300 border-green-500 font-semibold"
              : "bg-green-600/10 text-green-400 border-green-500/20 hover:bg-green-600/20"
          }`}
        >
          Доходы
        </button>
        <button
          onClick={() => setFilterType("expense")}
          className={`text-xs px-4 py-2 rounded-xl transition border ${
            filterType === "expense"
              ? "bg-red-600/30 text-red-300 border-red-500 font-semibold"
              : "bg-red-600/10 text-red-400 border-red-500/20 hover:bg-red-600/20"
          }`}
        >
          Расходы
        </button>
      </div>

      <input
        type="text"
        placeholder="Поиск по описанию..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition placeholder-slate-500"
      />

      <div className="max-h-72 overflow-y-auto pr-1 flex flex-col gap-3">
        {transactions.length === 0 ? (
          <p className="text-gray-400 text-center py-6">
            Список транзакций пуст
          </p>
        ) : filteredTransactions.length === 0 ? (
          <p className="text-gray-400 text-center py-6">
            Ничего не найдено по вашему запросу
          </p>
        ) : (
          filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className={`flex justify-between items-center p-4 rounded-lg shadow-md transition ${
                tx.type === "income"
                  ? "bg-green-600/20 shadow-green-500/20 hover:bg-green-600/30"
                  : "bg-red-600/20 shadow-red-500/20 hover:bg-red-600/30"
              }`}
            >
              <div className="flex flex-col">
                <span className="font-semibold text-white">
                  {tx.description}
                </span>
                <span className="text-sm text-gray-400">
                  {tx.date ? new Date(tx.date).toLocaleString() : ""}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`font-bold ${tx.type === "income" ? "text-green-400" : "text-red-400"}`}
                >
                  {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                </span>

                <button
                  onClick={() => removeTransaction(tx.id)}
                  className="text-slate-400 hover:text-red-400 transition p-1 text-sm font-bold"
                  title="Удалить транзакцию"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {transactions.length > 0 && (
        <button
          onClick={() => setIsConfirmOpen(true)}
          className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-semibold py-2.5 px-4 rounded-xl transition text-sm"
        >
          Очистить историю
        </button>
      )}

      <button
        onClick={onClose}
        className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-lg shadow-pink-500/20"
      >
        Назад в меню
      </button>

      {isConfirmOpen && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-2xl flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-sm w-full flex flex-col gap-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white text-center">
              Очистить всю историю?
            </h3>
            <p className="text-sm text-slate-400 text-center">
              Это действие удалит все ваши транзакции без возможности
              восстановления.
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 px-4 rounded-xl transition text-sm border border-slate-700"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  clearHistory();
                  setIsConfirmOpen(false);
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-xl transition text-sm shadow-lg shadow-red-600/30"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
