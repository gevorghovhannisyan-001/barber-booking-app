import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="bg-transparent cursor-pointer border border-border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <option value="en" className="bg-background">EN</option>
      <option value="hy" className="bg-background">HY</option>
      <option value="ru" className="bg-background">RU</option>
    </select>
  );
}

export default LanguageSwitcher;