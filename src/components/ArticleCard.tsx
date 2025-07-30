'use client';

import React, { useRef, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Calendar, User, ExternalLink, ImageIcon } from 'lucide-react';
import { IArticle } from '../types/news';
import { gsap } from 'gsap';
import Image from 'next/image';

interface ArticleCardProps {
  article: IArticle;
  index: number;
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { 
          opacity: 0, 
          y: 50 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          delay: index * 0.1,
          ease: "power2.out"
        }
      );
    }
  }, [index]);

  const handleImageError = () => {
    console.log('Image failed to load:', article.urlToImage);
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const renderImage = () => {
    if (!article.urlToImage || imageError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
          <ImageIcon className="w-16 h-16 text-gray-400" />
        </div>
      );
    }

    return (
      <Image
        src={article.urlToImage}
        alt={article.title}
        width={100}
        height={100}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
    );
  };

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {renderImage()}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
            {article.source.name}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(article.publishedAt), 'MMM dd, yyyy')}</span>
          </div>
        </div>
        
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
        >
          Read Full Article
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}