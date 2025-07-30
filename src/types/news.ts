export interface IArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  author: string;
  source: {
    id: string;
    name: string;
  };
  category?: string;
}

export interface NewsSource {
  name: string;
  fetchArticles: (query?: string, category?: string) => Promise<IArticle[]>;
}