import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import articles from "../data/articles"; 

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    if (query) {
      const results = articles.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredArticles(results);
    }
  }, [query]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Search Results for: "{query}"</h1>

      {filteredArticles.length > 0 ? (
        filteredArticles.map((article) => (
          <div key={article.id} className="p-4 border-b border-gray-300">
            <h2 className="text-xl font-bold">{article.title}</h2>
            <p>{article.description.slice(0, 100)}...</p>
            <Link to={`/article/${article.id}`} className="text-blue-500">
              Read More
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-4">No articles found.</p>
      )}
    </div>
  );
};

export default SearchResults;
