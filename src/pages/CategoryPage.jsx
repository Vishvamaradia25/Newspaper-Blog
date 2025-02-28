import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import articles from "../data/articles";

const categoryTranslations = {
  general: { en: "General News", hi: "सामान्य समाचार" },
  business: { en: "Business News", hi: "व्यापार समाचार" },
  entertainment: { en: "Entertainment News", hi: "मनोरंजन समाचार" },
  health: { en: "Health News", hi: "स्वास्थ्य समाचार" },
  science: { en: "Science News", hi: "विज्ञान समाचार" },
  sports: { en: "Sports News", hi: "खेल समाचार" },
  technology: { en: "Technology News", hi: "प्रौद्योगिकी समाचार" },
};

const CategoryPage = () => {
  const { language } = useLanguage();
  const { category } = useParams();

  const categoryTitle = categoryTranslations[category]?.[language] || category;

  const filteredArticles = articles.filter((article) => article.category === category);

  return (
    <div className="p-5 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{categoryTitle}</h1>

      {filteredArticles.length > 0 ? (
        filteredArticles.map((article) => (
          <div key={article.id} className="mb-4 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{article.title[language]}</h2>
            <p className="text-gray-600 dark:text-gray-400 ">{article.description[language]}</p>
            {article.image && (
              <img
                src={article.image}
                alt={article.title[language]}
                className="mt-2 w-full h-64 object-cover rounded-lg"
              />
            )}
            <Link to={`/article/${article.id}`} className="text-blue-500 dark:text-blue-400 mt-2 block">
              {language === "en" ? "Read More" : "और पढ़ें"}
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-700 dark:text-gray-300">{language === "en" ? "No news available." : "कोई खबर उपलब्ध नहीं है।"}</p>
      )}
    </div>
  );
};

export default CategoryPage;
