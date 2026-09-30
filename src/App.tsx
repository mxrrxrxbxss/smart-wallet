import { useState } from 'react';
import { TransactionForm } from './components/TransactionForm';
import { ProfileCard } from './components/ProfileCard';
import { TransactionList } from './components/TransactionList';
import { BudgetPlanner } from './components/BudgetPlanner';
import { ContactModal } from './components/ContactModal';

type ActiveTab = 'menu' | 'profile' | 'history' | 'form' | 'budget' | 'contact';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('menu');

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-center text-pink-500">POM Wallet</h1>

        {activeTab === 'profile' && (
          <ProfileCard onClose={() => setActiveTab('menu')} />
        )}

        {activeTab === 'history' && (
          <TransactionList onClose={() => setActiveTab('menu')} />
        )}

        {activeTab === 'form' && (
          <TransactionForm onClose={() => setActiveTab('menu')} />
        )}

        {activeTab === 'budget' && (
          <BudgetPlanner onClose={() => setActiveTab('menu')} />
        )}

        {activeTab === 'contact' && (
          <ContactModal onClose={() => setActiveTab('menu')} />
        )}

        {activeTab === 'menu' && (
          <div className="w-full flex flex-col gap-4">
            <button
              onClick={() => setActiveTab('profile')}
              className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-lg shadow-pink-500/20"
            >
              Открыть профиль
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-lg shadow-pink-500/20"
            >
              История транзакций
            </button>

            <button
              onClick={() => setActiveTab('form')}
              className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-lg shadow-pink-500/20"
            >
              Добавить транзакцию
            </button>

            <button
              onClick={() => setActiveTab('budget')}
              className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-lg shadow-pink-500/20"
            >
              Планировщик бюджета
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-lg shadow-pink-500/20"
            >
              Контакты
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;