const ArticleCard = ({ article }) => {
  return (
    <div className="border p-4 rounded shadow-md">
      {article.urlToImage && <img src={article.urlToImage} alt="News" className="w-full h-48 object-cover rounded" />}
      <h2 className="text-xl font-bold mt-2">{article.title}</h2>
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">Read More</a>
    </div>
  );
};

export default ArticleCard;
