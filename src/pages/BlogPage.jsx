/**
 * Copyright (c) 2025-2026 Fenero Capital Advisory LLP
 * All Rights Reserved.
 * 
 * This file is part of the Fenero platform and is proprietary software.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 * 
 * Author: Tanishk Jain
 * Company: Fenero Capital Advisory LLP
 * Contact: fenerocapitaladvisory@gmail.com
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, ArrowRight, Search, TrendingUp, BookOpen, Newspaper, Tag, BarChart3, FileText, Loader } from 'lucide-react';
import './BlogPage.css';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const RSS_TO_JSON = url =>
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;

  const categories = [
    { id: 'all', name: 'All Articles', icon: BookOpen },
    { id: 'finance', name: 'Finance', icon: Newspaper },
    { id: 'business', name: 'Business', icon: TrendingUp },
    { id: 'technology', name: 'Technology', icon: BarChart3 },
    { id: 'startup', name: 'Startups', icon: FileText }
  ];

  const FEEDS = [
    { url: 'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms', category: 'finance' },
    { url: 'https://economictimes.indiatimes.com/industry/banking/finance/rssfeeds/3949403.cms', category: 'finance' },
    { url: 'https://www.moneycontrol.com/rss/latestnews.xml', category: 'finance' },
    { url: 'https://www.bloomberg.com/feeds/india.rss', category: 'finance' },

    { url: 'https://www.livemint.com/rss/business', category: 'business' },
    { url: 'https://www.livemint.com/rss/companies', category: 'business' },
    { url: 'https://economictimes.indiatimes.com/small-biz/sme-sector/rssfeeds/5575606.cms', category: 'business' },

    { url: 'https://inc42.com/feed/', category: 'startup' },
    { url: 'https://yourstory.com/feed', category: 'startup' }
  ];

  const FALLBACK_IMAGE =
    'https://source.unsplash.com/1200x800/?finance,business,markets,india';

  useEffect(() => {
    fetchAllFeeds();
  }, []);

  const fetchAllFeeds = async () => {
    setLoading(true);

    try {
      const all = [];

      for (const feed of FEEDS) {
        const response = await fetch(RSS_TO_JSON(feed.url));
        const data = await response.json();

        if (data.items) {
          const mapped = data.items.map((item, index) => {
            const isTech = detectTech(item.title);

            return {
              id: `${feed.url}-${index}`,
              title: item.title,
              excerpt: cleanText(item.description),
              category: isTech ? 'technology' : feed.category,
              author: item.author || item.source || 'Unknown',
              date: new Date(item.pubDate).toLocaleDateString('en-US'),
              readTime: `${Math.floor(Math.random() * 5) + 3} min read`,
              image:
                item.thumbnail ||
                extractImage(item.description) ||
                generateImage(item.title),
              tags: extractTags(item.title, item.description),
              url: item.link
            };
          });

          all.push(...mapped);
        }
      }

      const finalArticles = all
        .filter(a => a.title && a.excerpt)
        .filter((a, idx, self) => idx === self.findIndex(b => b.title === a.title))
        .slice(0, 40);

      setArticles(finalArticles);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Unable to load live news. Showing fallback content.');
      setArticles(getFallbackArticles());
      setLoading(false);
    }
  };

  const detectTech = title => {
    const keys = ['tech', 'ai', 'digital', 'cloud', 'software', 'platform'];
    return keys.some(k => title.toLowerCase().includes(k));
  };

  const extractImage = html => {
    if (!html) return null;

    const imgTag = html.match(/<img[^>]+src="([^">]+)"/);
    if (imgTag) return imgTag[1];

    const urlMatch = html.match(/https?:\/\/[^"]+\.(jpg|jpeg|png|webp)/i);
    if (urlMatch) return urlMatch[0];

    return null;
  };

  const generateImage = title => {
    return `https://source.unsplash.com/1200x800/?${encodeURIComponent(
      title
    )},finance,business`;
  };

  const cleanText = text => text?.replace(/<\/?[^>]+(>|$)/g, '') || '';

  const extractTags = (title, desc) => {
    const text = `${title} ${desc}`.toLowerCase();
    const keywords = [
      'finance',
      'business',
      'debt',
      'lending',
      'investment',
      'startup',
      'technology',
      'market',
      'banking',
      'economy',
      'sme',
      'growth',
      'strategy',
      'india',
      'capital'
    ];

    return keywords.filter(k => text.includes(k)).slice(0, 3);
  };

  const getFallbackArticles = () => [
    {
      id: 1,
      title: 'The Future of Debt Syndication in India',
      excerpt:
        'How regulatory reforms and capital market growth are transforming debt syndication.',
      category: 'finance',
      author: 'Fenero Team',
      date: 'December 2024',
      readTime: '8 min read',
      image: FALLBACK_IMAGE,
      tags: ['Debt', 'Finance', 'India'],
      url: '#'
    }
  ];

  const filteredPosts = articles.filter(post => {
    const matchCategory =
      selectedCategory === 'all' || post.category === selectedCategory;
    const matchSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    return matchCategory && matchSearch;
  });

  const featuredPost =
    filteredPosts.length > 0
      ? filteredPosts[0]
      : getFallbackArticles()[0];

  return (
    <div className="blog-page-container">
      <section className="blog-hero-section">
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">Insights and Perspectives</h1>
          <p className="blog-hero-subtitle">
            Real-time finance, business, market and startup updates curated for you
          </p>
        </div>
      </section>

      <section className="blog-controls-section">
        <div className="blog-controls-container">
          <div className="blog-search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search articles"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="blog-search-input"
            />
          </div>

          <div className="blog-categories">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`blog-category-btn ${
                  selectedCategory === category.id ? 'active' : ''
                }`}
              >
                <category.icon size={18} />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
          <Loader
            size={48}
            className="loading-spinner"
            style={{ animation: 'spin 1s linear infinite' }}
          />
        </div>
      )}

      {!loading && featuredPost && (
        <section className="blog-featured-section">
          <div className="blog-content-wrapper">
            <div className="blog-featured-badge">Featured Article</div>
            <div className="blog-featured-card">
              <div className="blog-featured-image">
                <img src={featuredPost.image} alt={featuredPost.title} />
              </div>

              <div className="blog-featured-content">
                <div className="blog-featured-meta">
                  <span className="blog-meta-item">
                    <User size={16} /> {featuredPost.author}
                  </span>
                  <span className="blog-meta-item">
                    <Calendar size={16} /> {featuredPost.date}
                  </span>
                  <span className="blog-meta-item">
                    <Clock size={16} /> {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="blog-featured-title">{featuredPost.title}</h2>
                <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>

                <a
                  href={featuredPost.url}
                  target="_blank"
                  rel="noreferrer"
                  className="blog-read-more-btn"
                >
                  Read Full Article <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {!loading && (
        <section className="blog-grid-section">
          <div className="blog-content-wrapper">
            <div className="blog-grid-header">
              <h2 className="blog-grid-title">Latest Articles</h2>
              <p className="blog-grid-count">{filteredPosts.length} articles found</p>
            </div>

            <div className="blog-posts-grid">
              {filteredPosts.map(post => (
                <article key={post.id} className="blog-post-card">
                  <div className="blog-post-image">
                    <img src={post.image} alt={post.title} />

                    <div className="blog-post-category-badge">
                      {categories.find(cat => cat.id === post.category)?.name}
                    </div>
                  </div>

                  <div className="blog-post-content">
                    <div className="blog-post-meta">
                      <span className="blog-meta-item">
                        <Calendar size={14} /> {post.date}
                      </span>
                      <span className="blog-meta-item">
                        <Clock size={14} /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="blog-post-title">{post.title}</h3>
                    <p className="blog-post-excerpt">{post.excerpt}</p>

                    <div className="blog-post-tags">
                      {post.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="blog-tag-small">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="blog-post-footer">
                      <span className="blog-post-author">
                        <User size={16} /> {post.author}
                      </span>

                      <a
                        href={post.url}
                        target="_blank"
                        rel="noreferrer"
                        className="blog-read-link"
                      >
                        Read More <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default BlogPage;
