import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, ArrowRight, Search, TrendingUp, BookOpen, Newspaper, Filter, Tag, BarChart3, FileText, Loader } from 'lucide-react';
import './BlogPage.css';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: 'all', name: 'All Articles', icon: BookOpen },
    { id: 'finance', name: 'Finance News', icon: Newspaper },
    { id: 'business', name: 'Business', icon: TrendingUp },
    { id: 'technology', name: 'Technology', icon: BarChart3 },
    { id: 'startup', name: 'Startups', icon: FileText }
  ];

  // Fetch articles from NewsAPI
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // NewsAPI endpoint for finance and business news
      const apiKey = 'c2e62398fb774f8198a7285e0a9e9826'; // Replace with your API key
      const queries = [
        'finance debt syndication India',
        'business lending finance',
        'startup funding venture capital',
        'financial markets India',
        'business loans SME'
      ];
      
      const allArticles = [];
      
      for (const query of queries) {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        
        const data = await response.json();
        
        if (data.articles) {
          // Map articles to our format
          const mappedArticles = data.articles.map((article, index) => ({
            id: `${query}-${index}`,
            title: article.title,
            excerpt: article.description || article.content?.substring(0, 150) + '...',
            category: getCategoryFromQuery(query),
            author: article.author || article.source.name,
            date: new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            readTime: `${Math.floor(Math.random() * 5) + 3} min read`,
            image: article.urlToImage || 'https://images.unsplash.com/photo-1554224311-beee460c201f?w=600&h=400&fit=crop',
            tags: extractTags(article.title, article.description),
            url: article.url
          }));
          
          allArticles.push(...mappedArticles);
        }
      }
      
      // Remove duplicates and filter out articles without images
      const uniqueArticles = allArticles
        .filter(article => article.image && article.excerpt)
        .filter((article, index, self) => 
          index === self.findIndex(a => a.title === article.title)
        )
        .slice(0, 20); // Limit to 20 articles
      
      setArticles(uniqueArticles);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load articles. Using fallback content.');
      setArticles(getFallbackArticles());
      setLoading(false);
    }
  };

  const getCategoryFromQuery = (query) => {
    if (query.includes('finance') || query.includes('debt')) return 'finance';
    if (query.includes('business') || query.includes('loans')) return 'business';
    if (query.includes('startup') || query.includes('venture')) return 'startup';
    if (query.includes('technology')) return 'technology';
    return 'finance';
  };

  const extractTags = (title, description) => {
    const text = `${title} ${description}`.toLowerCase();
    const possibleTags = [
      'Finance', 'Business', 'Debt', 'Lending', 'Investment', 
      'Startup', 'Technology', 'Market', 'Banking', 'Economy',
      'SME', 'Growth', 'Strategy', 'India', 'Capital'
    ];
    
    return possibleTags
      .filter(tag => text.includes(tag.toLowerCase()))
      .slice(0, 3);
  };

  const getFallbackArticles = () => {
    return [
      {
        id: 1,
        title: 'The Future of Debt Syndication in India\'s Growing Economy',
        excerpt: 'Exploring how evolving regulatory frameworks and digital transformation are reshaping the debt syndication landscape for Indian businesses in 2024 and beyond.',
        category: 'finance',
        author: 'Fenero Team',
        date: 'December 5, 2024',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=500&fit=crop',
        tags: ['Debt Syndication', 'Indian Economy', 'Finance']
      },
      {
        id: 2,
        title: 'Understanding Working Capital Management for SMEs',
        excerpt: 'A comprehensive guide to optimizing cash flow and managing working capital effectively for small and medium enterprises.',
        category: 'business',
        author: 'Senior Partner',
        date: 'December 3, 2024',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1554224311-beee460c201f?w=600&h=400&fit=crop',
        tags: ['Working Capital', 'SME', 'Cash Flow']
      },
      {
        id: 3,
        title: 'RBI Policy Changes: Impact on Business Lending',
        excerpt: 'Analyzing recent Reserve Bank of India policy shifts and their implications for corporate borrowing and debt restructuring.',
        category: 'finance',
        author: 'Fenero Team',
        date: 'November 30, 2024',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
        tags: ['RBI', 'Policy', 'Lending']
      }
    ];
  };

  const filteredPosts = articles.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = articles.length > 0 ? articles[0] : getFallbackArticles()[0];

  return (
    <div className="blog-page-container">
      {/* Hero Section */}
      <section className="blog-hero-section">
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">Insights & Perspectives</h1>
          <p className="blog-hero-subtitle">
            Expert insights on debt advisory, finance trends, and strategic capital planning
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="blog-controls-section">
        <div className="blog-controls-container">
          <div className="blog-search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="blog-search-input"
            />
          </div>
          
          <div className="blog-categories">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`blog-category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              >
                <category.icon size={18} />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: '80px 24px',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <Loader size={48} className="loading-spinner" style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ fontSize: '18px', color: '#0369a1', fontWeight: 600 }}>Loading latest articles...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={{
          maxWidth: '600px',
          margin: '40px auto',
          padding: '24px',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '2px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#dc2626', fontSize: '16px', fontWeight: 600 }}>{error}</p>
        </div>
      )}

      {/* Featured Post */}
      {!loading && featuredPost && (
        <section className="blog-featured-section">
          <div className="blog-content-wrapper">
            <div className="blog-featured-badge">Featured Article</div>
            <div className="blog-featured-card">
              <div className="blog-featured-image">
                <img src={featuredPost.image} alt={featuredPost.title} />
                <div className="blog-featured-overlay"></div>
              </div>
              <div className="blog-featured-content">
                <div className="blog-featured-meta">
                  <span className="blog-meta-item">
                    <User size={16} />
                    {featuredPost.author}
                  </span>
                  <span className="blog-meta-item">
                    <Calendar size={16} />
                    {featuredPost.date}
                  </span>
                  <span className="blog-meta-item">
                    <Clock size={16} />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="blog-featured-title">{featuredPost.title}</h2>
                <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>
                <div className="blog-featured-tags">
                  {featuredPost.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="blog-tag">
                      <Tag size={14} />
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={featuredPost.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="blog-read-more-btn"
                  style={{ textDecoration: 'none' }}
                >
                  Read Full Article
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      {!loading && (
        <section className="blog-grid-section">
          <div className="blog-content-wrapper">
            <div className="blog-grid-header">
              <h2 className="blog-grid-title">Latest Articles</h2>
              <p className="blog-grid-count">{filteredPosts.length} articles found</p>
            </div>
            
            {filteredPosts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 24px',
                color: '#64748b'
              }}>
                <p style={{ fontSize: '18px', fontWeight: 600 }}>No articles found matching your criteria.</p>
                <p style={{ fontSize: '15px', marginTop: '8px' }}>Try adjusting your search or filter.</p>
              </div>
            ) : (
              <div className="blog-posts-grid">
                {filteredPosts.map(post => (
                  <article key={post.id} className="blog-post-card">
                    <div className="blog-post-image">
                      <img src={post.image} alt={post.title} />
                      <div className="blog-post-category-badge">
                        {categories.find(cat => cat.id === post.category)?.name || 'Article'}
                      </div>
                    </div>
                    <div className="blog-post-content">
                      <div className="blog-post-meta">
                        <span className="blog-meta-item">
                          <Calendar size={14} />
                          {post.date}
                        </span>
                        <span className="blog-meta-item">
                          <Clock size={14} />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="blog-post-title">{post.title}</h3>
                      <p className="blog-post-excerpt">{post.excerpt}</p>
                      <div className="blog-post-tags">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="blog-tag-small">{tag}</span>
                        ))}
                      </div>
                      <div className="blog-post-footer">
                        <span className="blog-post-author">
                          <User size={16} />
                          {post.author}
                        </span>
                        <a 
                          href={post.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="blog-read-link"
                          style={{ textDecoration: 'none' }}
                        >
                          Read More
                          <ArrowRight size={16} />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="blog-newsletter-section">
        <div className="blog-newsletter-card">
          <div className="blog-newsletter-icon">
            <Newspaper size={48} />
          </div>
          <h2 className="blog-newsletter-title">Stay Updated</h2>
          <p className="blog-newsletter-text">
            Subscribe to our newsletter for the latest insights on debt advisory, market trends, and financial strategies.
          </p>
          <div className="blog-newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              className="blog-newsletter-input"
            />
            <button className="blog-newsletter-btn">Subscribe</button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .loading-spinner {
          color: #0ea5e9;
        }
      `}</style>
    </div>
  );
};

export default BlogPage;