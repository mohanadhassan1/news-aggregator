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

export interface NewsApiArticle {
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
}

export interface GuardianApiArticle {
  id: string;
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
  sectionName: string;
  fields?: {
    trailText?: string;
    body?: string;
    thumbnail?: string;
  };
}

export interface NytApiArticle {
  abstract: string;
  lead_paragraph: string;
  web_url: string;
  pub_date: string;
  byline?: {
    original?: string;
  };
  section_name?: string;
  headline: {
    main: string;
  };
  multimedia: { url: string }[];
}