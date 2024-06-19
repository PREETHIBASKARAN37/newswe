import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = '4d057832f4124a38ada745d8a470b29a'; // Your provided API key
const API_URL = 'https://newsapi.org/v2/top-headlines';

function App() {
  const [category, setCategory] = useState('general');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  const fetchNews = async (category) => {
    const url = `${API_URL}?country=in&category=${category}&apiKey=${API_KEY}`;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
      }
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header>
        <h1>India News Dashboard</h1>
        <div id="controls">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="general">General</option>
            <option value="sports">Sports</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
            {/* Add more categories as needed */}
          </select>
        </div>
      </header>
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching news: {error}</p>
        ) : (
          <div id="newsContainer" className="news-container">
            {articles.map((article, index) => (
              <div key={index} className="news-card">
                {article.urlToImage && (
                  <img src={article.urlToImage} alt={article.title} />
                )}
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;


