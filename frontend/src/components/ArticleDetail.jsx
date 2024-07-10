import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './api.js';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/articles/${id}`)
      .then(response => {
        setArticle(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the article!", error);
        setError('Failed to fetch article');
      });
  }, [id]);

  if (error) {
    return <div className="p-4">Error: {error}</div>;
  }

  if (!article) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      <p>{article.content}</p>
      <p className="text-gray-500">Category: {article.category}</p>
      <p className="text-gray-500">Tags: {article.tags}</p>
    </div>
  );
};

export default ArticleDetail;
