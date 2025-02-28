import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, switchLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => switchLanguage(e.target.value)}
      className="p-1 border border-gray-400 rounded-md bg-white text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-600 text-sm"
      aria-label="Select Language"
    >
      <option value="en" className="bg-gray-200 text-black">English</option>
      <option value="hi" className="bg-gray-200 text-black">हिंदी</option>
    </select>
  );
};

export default LanguageSwitcher;

