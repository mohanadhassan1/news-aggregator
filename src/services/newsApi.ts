import axios from 'axios';
import { IArticle } from '../types/news';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const GUARDIAN_API_KEY = process.env.NEXT_PUBLIC_GUARDIAN_API_KEY;
const NYT_API_KEY = process.env.NEXT_PUBLIC_NYT_API_KEY;

// NewsAPI.org implementation
export const newsApiService = {
  async fetchArticles(query: string = '', category: string = ''): Promise<IArticle[]> {
    try {
      const params = new URLSearchParams({
        apiKey: NEWS_API_KEY || '',
        pageSize: '20',
        sortBy: 'publishedAt'
      });

      if (query) params.append('q', query);
      if (category) params.append('category', category);
      if (!query && !category) params.append('country', 'us');

      const response = await axios.get(`https://newsapi.org/v2/top-headlines?${params}`);
      
      return response.data.articles.map((article: any, index: number) => ({
        id: `newsapi-${index}-${Date.now()}`,
        title: article.title || 'No title available',
        description: article.description || 'No description available',
        content: article.content || article.description || 'No content available',
        url: article.url,
        urlToImage: article.urlToImage || '/placeholder-news.jpg',
        publishedAt: article.publishedAt,
        author: article.author || 'Unknown Author',
        source: {
          id: article.source.id || 'newsapi',
          name: article.source.name || 'NewsAPI'
        },
        category: category || 'general'
      }));
    } catch (error) {
      console.error('NewsAPI fetch error:', error);
      return [];
    }
  }
};

// The Guardian API implementation
export const guardianApiService = {
  async fetchArticles(query: string = '', category: string = ''): Promise<IArticle[]> {
    try {
      const params = new URLSearchParams({
        'api-key': GUARDIAN_API_KEY || 'test',
        'show-fields': 'thumbnail,trailText,body',
        'page-size': '20',
        'order-by': 'newest'
      });

      if (query) params.append('q', query);
      if (category) params.append('section', category);

      const response = await axios.get(`https://content.guardianapis.com/search?${params}`);
      
      return response.data.response.results.map((article: any, index: number) => ({
        id: `guardian-${index}-${Date.now()}`,
        title: article.webTitle,
        description: article.fields?.trailText || 'No description available',
        content: article.fields?.body || article.fields?.trailText || 'No content available',
        url: article.webUrl,
        urlToImage: article.fields?.thumbnail || '/placeholder-news.jpg',
        publishedAt: article.webPublicationDate,
        author: 'The Guardian',
        source: {
          id: 'the-guardian',
          name: 'The Guardian'
        },
        category: article.sectionName || 'general'
      }));
    } catch (error) {
      console.error('Guardian API fetch error:', error);
      return [];
    }
  }
};

// New York Times API implementation
export const nytApiService = {
  async fetchArticles(query: string = '', category: string = ''): Promise<IArticle[]> {
    try {
      const params = new URLSearchParams({
        'api-key': NYT_API_KEY || '',
        'sort': 'newest'
      });

      if (query) params.append('q', query);
      if (category) params.append('fq', `section_name:("${category}")`);

      const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?${params}`);
      
      return response.data.response.docs.map((article: any, index: number) => ({
        id: `nyt-${index}-${Date.now()}`,
        title: article.headline.main,
        description: article.abstract || 'No description available',
        content: article.lead_paragraph || article.abstract || 'No content available',
        url: article.web_url,
        urlToImage: article.multimedia?.[0] ? 
          `https://www.nytimes.com/${article.multimedia[0].url}` : '/placeholder-news.jpg',
        publishedAt: article.pub_date,
        author: article.byline?.original || 'New York Times',
        source: {
          id: 'new-york-times',
          name: 'New York Times'
        },
        category: article.section_name || 'general'
      }));
    } catch (error) {
      console.error('NYT API fetch error:', error);
      return [];
    }
  }
};