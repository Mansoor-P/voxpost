import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`/api/v1/articles/${id}`)
      .then(response => {
        setArticle(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the article!", error);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`/api/v1/articles/${id}`)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error("There was an error deleting the article!", error);
      });
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      <p>{article.content}</p>
      <p className="mt-4 text-sm text-gray-500">Category: {article.category}</p>
      <p className="text-sm text-gray-500">Tags: {article.tags}</p>
      <button onClick={() => navigate(`/update/${article.id}`)} className="bg-blue-500 text-white px-4 py-2 mr-2">Edit</button>
      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2">Delete</button>
    </div>
  );
};

export default ArticleDetail;
