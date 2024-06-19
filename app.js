const apiKey = '4d057832f4124a38ada745d8a470b29a'; // Replace with your actual API key
const apiUrl = 'https://newsapi.org/v2/top-headlines';
const newsContainer = document.getElementById('news-container');
const regionSelect = document.getElementById('region-select');
const categorySelect = document.getElementById('category-select');
const fetchNewsBtn = document.getElementById('fetch-news-btn');

// Event listener for Fetch News button click
fetchNewsBtn.addEventListener('click', () => {
  const region = regionSelect.value;
  const category = categorySelect.value;
  fetchNews(region, category);
});

// Function to fetch news based on region and category
async function fetchNews(region = 'us', category = 'general') {
  const url = `${apiUrl}?country=${region}&category=${category}&apiKey=${apiKey}`;
  console.log(`Fetching news from: ${url}`); // Debugging line

  try {
    newsContainer.innerHTML = '<div class="loading">Loading...</div>';
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response data:', data); // Debugging line

    if (data.articles.length === 0) {
      newsContainer.innerHTML = '<div class="loading">No news found for this selection.</div>';
      return;
    }

    displayNews(data.articles);
  } catch (error) {
    console.error('Error fetching news:', error); // Debugging line
    newsContainer.innerHTML = '<div class="loading">Failed to fetch news. Please try again later.</div>';
  }
}

// Function to display news articles in the UI
function displayNews(articles) {
  newsContainer.innerHTML = '';
  articles.forEach(article => {
    const newsCard = document.createElement('div');
    newsCard.className = 'news-card';
    newsCard.innerHTML = `
      <h2>${article.title}</h2>
      <p>${article.description}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    newsContainer.appendChild(newsCard);
  });
}

