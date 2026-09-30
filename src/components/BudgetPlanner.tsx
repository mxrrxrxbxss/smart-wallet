import { useState } from "react";
import { useWalletStore } from "../store/useWalletStore";

interface BudgetPlannerProps {
  onClose: () => void;
}

export const BudgetPlanner = ({ onClose }: BudgetPlannerProps) => {
  const transactions = useWalletStore((state) => state.transactions);
  const categories = useWalletStore((state) => state.categories);

  const [limits, setLimits] = useState<Record<string, number>>({
    Продукты: 500,
    Транспорт: 300,
    Жилье: 1000,
    "Кафе и рестораны": 400,
    Развлечения: 300,
    Здоровье: 300,
  });

  const [isEditingLimits, setIsEditingLimits] = useState(false);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const expenseCategories = categories.filter((cat) => cat.type === "expense");

  const categoriesWithExpenses = expenseCategories.map((category) => {
    const totalExpense = transactions
      .filter((tx) => tx.category === category.name && tx.type === "expense")
      .filter((tx) => {
        if (!tx.date) return false;
        const txDate = new Date(tx.date);
        return (
          txDate.getMonth() === currentMonth &&
          txDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, tx) => sum + tx.amount, 0);
    return { ...category, totalExpense };
  });

  return (
    <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 relative">
      <h2 className="text-xl font-bold text-white text-center">
        Планировщик бюджета
      </h2>
      <div className="grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
        {!isEditingLimits &&
          categoriesWithExpenses.map((category) => {
            const limit = limits[category.name] || 1000;
            const percentage = Math.min(
              (category.totalExpense / limit) * 100,
              100,
            );
            const isExceeded = category.totalExpense > limit;
            return (
              <div
                key={category.name}
                className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {category.name}
                  </p>
                  <span className="text-xs text-gray-400">Лимит: {limit}</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <p className="text-xl font-extrabold text-white">
                    {category.totalExpense.toFixed(2)}
                  </p>
                  <span
                    className={`text-xs font-semibold ${isExceeded ? "text-red-400" : "text-gray-400"}`}
                  >
                    {Math.round((category.totalExpense / limit) * 100)}%
                  </span>
                </div>

                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isExceeded
                        ? "bg-red-500"
                        : "bg-gradient-to-r from-blue-500 to-pink-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        {isEditingLimits &&
          Object.keys(limits).map((categoryName) => (
            <div
              key={categoryName}
              className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {categoryName}
                </p>
                <input
                  type="number"
                  value={limits[categoryName]}
                  onChange={(e) => {
                    const newLimit = parseFloat(e.target.value);
                    setLimits((prevLimits) => ({
                      ...prevLimits,
                      [categoryName]: isNaN(newLimit) ? 0 : newLimit,
                    }));
                  }}
                  className="w-20 bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-pink-500 transition"
                />
              </div>
            </div>
          ))}
      </div>

      <button
        onClick={
          !isEditingLimits
            ? () => setIsEditingLimits(true)
            : () => setIsEditingLimits(false)
        }
        className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-lg shadow-pink-500/20 mt-2"
      >
        {isEditingLimits ? "Сохранить лимиты" : "Задать лимиты"}
      </button>
      <button
        onClick={onClose}
        className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-lg shadow-pink-500/20 mt-2"
      >
        {isEditingLimits ? "Отмена" : "Закрыть планировщик"}
      </button>
    </div>
  );
};
