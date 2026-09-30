import { useState } from "react";
import { useWalletStore } from "../store/useWalletStore";

interface ProfileCardProps {
  onClose: () => void;
}

export const ProfileCard = ({ onClose }: ProfileCardProps) => {
  const user = useWalletStore((state) => state.user);

  const [currency, setCurrency] = useState<"USD" | "UAH" | "EUR">("USD");

  const totalBalanceUSD = useWalletStore((state) => state.balance);

  const currencyData = {
    USD: { symbol: "$", rate: 1 },
    UAH: { symbol: "₴", rate: 41.5 },
    EUR: { symbol: "€", rate: 0.92 },
  };

  const currentBalance = totalBalanceUSD * currencyData[currency].rate;

  return (
    <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-pink-500/10 flex flex-col gap-6">
      <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
        <img
          src={user.avatarUrl}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover border-2 border-pink-500 shadow-md shadow-pink-500/20"
        />
        <div>
          <h2 className="text-2xl font-bold text-white">{user.name}</h2>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
      </div>

      <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-6 flex flex-col items-center justify-center relative">
        <div className="absolute top-4 right-4">
          <select
            value={currency}
            onChange={(e) =>
              setCurrency(e.target.value as "USD" | "UAH" | "EUR")
            }
            className="bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-pink-500 cursor-pointer transition"
          >
            <option value="USD">USD ($)</option>
            <option value="UAH">UAH (₴)</option>
            <option value="EUR">EUR (€)</option>
          </select>
        </div>

        <p className="text-sm font-medium text-gray-400 mb-1 uppercase tracking-wider">
          Общий баланс
        </p>
        <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
          {currencyData[currency].symbol}
          {currentBalance.toFixed(2)}
        </p>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-lg shadow-pink-500/20 mt-2"
      >
        Закрыть профиль
      </button>
    </div>
  );
};
