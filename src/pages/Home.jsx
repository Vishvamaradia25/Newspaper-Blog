import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import articles from "../data/articles";

const Home = () => {
  const { language } = useLanguage();
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-5">
    {/* featured news */}
       <h1 className="text-2xl font-bold mt-6 mb-4 flex items-center">
       <span className="relative flex h-3 w-3 mr-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
        </span>
        {language === "en" ? "Featured News" : "मुख्य खबरें"}
      </h1>

      <div className="relative w-full h-20 overflow-hidden mb-6">
        {articles.slice(0, 14).map((article, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: i === currentNewsIndex ? 1 : 0, x: i === currentNewsIndex ? 0 : 100 }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 left-0 w-full h-full bg-red-700 text-white dark:bg-red-700 dark:text-white p-5 rounded-lg"
          >
            <h2 className="text-xl font-semibold ">{article.title?.[language] || "No Title"}</h2>
            <p>{article.description?.[language]?.slice(0, 100) || "No Description"}</p>
          </motion.div>
        ))}
      </div>

      {/*Latest News*/}
      <h1 className="text-2xl font-bold mt-5 mb-4">{language === "en" ? "Latest News" : "ताज़ा खबरें"}</h1>

      <div className="space-y-5">
        {articles.map((article, index) => (
        <motion.div
          key={article.id}
         initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg 
             bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
          >
        <h2 className="text-xl font-bold">{article.title?.[language] || "No Title"}</h2>
        <p>
           {article.description?.[language]?.slice(0, 100) || "No Description"}...
         </p>
          {article.image && (
         <img
         src={article.image}
         alt={article.title?.[language] || "News Image"}
        className="mt-2 w-full h-64 object-cover rounded-lg"
        />
         )}
         <Link to={`/article/${article.id}`} className="text-blue-500 dark:text-blue-300 mt-2 block">
         {language === "en" ? "Read More" : "और पढ़ें"}
        </Link>
      </motion.div>
           ))}
      </div>
    </div>
  );
};

export default Home;


