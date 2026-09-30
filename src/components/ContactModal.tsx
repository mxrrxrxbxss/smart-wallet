interface ContactModalProps {
  onClose: () => void;
}

export const ContactModal = ({ onClose }: ContactModalProps) => {
  return (
    <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 relative">
      <h2 className="text-xl font-bold text-white text-center">Контакты</h2>
      <div className="flex flex-col gap-2">
        <p className="text-white text-sm">
          Если у вас есть вопросы или предложения, вы можете связаться с нами:
        </p>
        <ul className="list-disc list-inside text-white text-sm">
          <li>
            Email:{" "}
            <a
              href="mailto:info@company.com"
              className="text-blue-400 hover:underline"
            >
              info@company.com
            </a>
          </li>
          <li>
            Телефон:{" "}
            <a href="tel:+1234567890" className="text-blue-400 hover:underline">
              +1 (234) 567-890
            </a>
          </li>
          <li>Адрес: 123 Main St, City, Country</li>
          <li>
            Социальные сети:
            <ul className="list-disc list-inside ml-4">
              <li>
                <a
                  href="https://twitter.com/company123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/company123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/company123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-lg shadow-pink-500/20 mt-4"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};
