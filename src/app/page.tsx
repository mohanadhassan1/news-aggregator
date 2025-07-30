'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import SearchBar from '@/components/SearchBar';
import ArticleCard from '@/components/ArticleCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { IArticle } from '@/types/news';
import { newsApiService, guardianApiService } from '@/services/newsApi';

export default function Home() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    handleSearch('', '');
    
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  const handleSearch = async (query: string, category: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [newsApiArticles, guardianArticles] = await Promise.all([
        newsApiService.fetchArticles(query, category),
        guardianApiService.fetchArticles(query, category)
      ]);

      const allArticles = [...newsApiArticles, ...guardianArticles]
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

      setArticles(allArticles);
    } catch (err) {
      setError('Failed to fetch news articles. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header ref={headerRef} className="bg-white shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              News Aggregator
            </h1>
            <p className="text-lg text-gray-600">
              Stay informed with the latest news from trusted sources
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {articles.length > 0 ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Latest News ({articles.length} articles)
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article, index) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      index={index}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or filters
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-sm text-gray-600 text-center">
            <p>&copy; 2025 News Aggregator. Built with Next.js 15, TypeScript, and Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}