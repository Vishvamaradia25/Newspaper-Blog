import { useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useState, useEffect } from "react";
import articles from "../data/articles";

const ArticleDetail = () => {
  const { language } = useLanguage();
  const { id } = useParams();
  const article = articles.find((a) => a.id === parseInt(id));

  const [comments, setComments] = useState(() => {
    return JSON.parse(localStorage.getItem(`comments-${id}`)) || [];
  });

  const [commentText, setCommentText] = useState("");

  if (!article) {
    return (
      <p className="p-5 text-center text-red-600 text-xl">
        {language === "en" ? "Article not found." : "लेख नहीं मिला।"}
      </p>
    );
  }

  // Save comments to localStorage
  useEffect(() => {
    localStorage.setItem(`comments-${id}`, JSON.stringify(comments));
  }, [comments, id]);

  const handleCommentSubmit = () => {
    if (commentText.trim() === "") return;
    const newComments = [...comments, commentText];
    setComments(newComments);
    setCommentText("");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-200  dark:bg-gray-800 dark:text-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">{article.title[language]}</h1>
      
      {article.image && (
        <img
          src={article.image}
          alt={article.title[language]}
          className="w-full h-64 object-cover rounded-lg mb-4 shadow"
        />
      )}
      <p className="text-md text-justify text-gray-900 dark:text-gray-200 leading-relaxed">{article.content ? article.content[language] : ""}</p>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3">{language === "en" ? "Comments" : "टिप्पणियाँ"}</h2>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder={language === "en" ? "Add a comment..." : "एक टिप्पणी जोड़ें..."}
          className="w-full p-2 border border-gray-300 rounded-lg text-black dark:text-white bg-white dark:bg-gray-800"
        />

        <button
          onClick={handleCommentSubmit}
          className="bg-blue-800 text-white px-4 py-2 rounded-lg mt-2"
        >
          {language === "en" ? "Post Comment" : "टिप्पणी पोस्ट करें"}
        </button>
        <div className="mt-4">
          {comments.length === 0 ? (
            <p className="text-gray-500">{language === "en" ? "No comments yet." : "अभी तक कोई टिप्पणी नहीं।"}</p>
          ) : (
            comments.map((comment, index) => (
              <div key={index} className="bg-gray-700 text-white dark:bg-gray-700 p-2 rounded-lg mb-2">
                {comment}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
