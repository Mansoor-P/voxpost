import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    title: '',
    content: '',
    authorId: 1, // Example authorId, you can replace it with the actual logged-in user ID
    category: '',
    tags: '',
  });

  useEffect(() => {
    if (id) {
      axios.get(`/api/v1/articles/${id}`)
        .then(response => {
          setArticle(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the article!", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`/api/v1/articles/${id}`, article)
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          console.error("There was an error updating the article!", error);
        });
    } else {
      axios.post('/api/v1/articles', article)
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          console.error("There was an error creating the article!", error);
        });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Update Article' : 'Create Article'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" name="title" value={article.title} onChange={handleChange} className="mt-1 block w-full" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea name="content" value={article.content} onChange={handleChange} className="mt-1 block w-full" rows="4" required></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input type="text" name="category" value={article.category} onChange={handleChange} className="mt-1 block w-full" required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <input type="text" name="tags" value={article.tags} onChange={handleChange} className="mt-1 block w-full" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</button>
      </form>
    </div>
  );
};

export default ArticleForm;
