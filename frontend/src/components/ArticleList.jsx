import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/v1/articles')
      .then(response => {
        // Assuming the response is an array of articles
        if (Array.isArray(response.data)) {
          setArticles(response.data);
        } else {
          console.error('API response is not an array:', response.data);
          setError('Unexpected data format from server');
        }
      })
      .catch(error => {
        console.error("There was an error fetching the articles!", error);
        setError('Failed to fetch articles');
      });
  }, []);

  if (error) {
    return <div className="p-4">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Articles</h1>
      <ul>
        {articles.map(article => (
          <li key={article.id} className="mb-2">
            <Link to={`/articles/${article.id}`} className="text-blue-500">{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
