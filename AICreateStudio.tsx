import React, { useState } from 'react';
import './AI.css';

function AICreateStudio() {
  // State for active page
  const [activePage, setActivePage] = useState('dashboard');
  
  // Dashboard states
  const [activeTab, setActiveTab] = useState('images');
  const [imageDesc, setImageDesc] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [generatedContent, setGeneratedContent] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Gallery states
  const [galleryTab, setGalleryTab] = useState('my-content');
  const [layout, setLayout] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Auth states
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Profile states
  const [profileData, setProfileData] = useState({
    username: 'John Doe',
    email: 'john@example.com',
    bio: 'Content Creator'
  });

  // Subscription states
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Mock content data
  const [content] = useState([
    {
      id: 1,
      type: 'image',
      url: 'https://via.placeholder.com/400x300/667eea/ffffff?text=AI+Generated+Image',
      description: 'A serene mountain landscape',
      timestamp: '2024-03-20T10:00:00Z'
    },
    {
      id: 2,
      type: 'video',
      url: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=AI+Generated+Video',
      description: 'City lights time-lapse',
      timestamp: '2024-03-19T15:30:00Z'
    }
  ]);

  // Handlers
  const handleGenerate = (type) => {
    setIsGenerating(true);
    setTimeout(() => {
      const newContent = {
        id: Date.now(),
        type: type,
        description: type === 'image' ? imageDesc : videoDesc,
        url: `https://via.placeholder.com/400x300/${type === 'image' ? '667eea' : '764ba2'}/ffffff?text=AI+Generated+${type}`,
        timestamp: new Date().toISOString()
      };
      setGeneratedContent([newContent, ...generatedContent]);
      setShowResults(true);
      setIsGenerating(false);
    }, 2000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt:', loginData);
    setActivePage('dashboard');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Registration attempt:', registerData);
    setActivePage('dashboard');
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log('Profile update:', profileData);
  };

  const handleSubscribe = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentChoice = (method) => {
    alert(`Payment method selected: ${method}`);
    setShowPaymentModal(false);
  };

  // Render functions
  const renderHeader = () => (
    <header className="header">
      <div className="logo">
        <span className="logo-icon">⚡</span>
        <span className="logo-text">AICreate Studio</span>
      </div>
      <nav className="nav">
        <button 
          className={`nav-link ${activePage === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActivePage('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`nav-link ${activePage === 'gallery' ? 'active' : ''}`}
          onClick={() => setActivePage('gallery')}
        >
          Gallery
        </button>
        <button 
          className={`nav-link ${activePage === 'subscription' ? 'active' : ''}`}
          onClick={() => setActivePage('subscription')}
        >
          Subscribe
        </button>
        <button 
          className={`nav-link ${activePage === 'register' ? 'active' : ''}`}
          onClick={() => setActivePage('register')}
        >
          Sign Up
        </button>
      </nav>
      <div className="user-menu">
        <span className="notif-dot">🔔</span>
        <span className="user-icon">👤</span>
        <span className="user-name">MOZFER</span>
        <span className="dropdown-arrow">▼</span>
        <div className="dropdown">
          <button onClick={() => setActivePage('profile')}>Profile</button>
          <button onClick={() => setActivePage('login')}>Log out</button>
        </div>
      </div>
    </header>
  );

  const renderDashboard = () => (
    <div className="dashboard">
      <section className="hero">
        <h1><span className="bold">Create Stunning</span> <span className="highlight">AI Content</span></h1>
        <p className="subtitle">Transform your ideas into beautiful images and videos using cutting-edge AI technology.</p>
      </section>

      {showResults && (
        <section className="results-section">
          <div className="results-header">
            <h2>Generated Content</h2>
            <button className="close-results-btn" onClick={() => setShowResults(false)}>✕</button>
          </div>
          <div className="results-grid">
            {generatedContent.map(content => (
              <div key={content.id} className="content-item">
                {content.type === 'image' ? (
                  <img src={content.url} alt={content.description} />
                ) : (
                  <video src={content.url} controls />
                )}
                <p>{content.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="tabs-section">
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'images' ? 'active' : ''}`}
            onClick={() => setActiveTab('images')}
          >
            Generate Images
          </button>
          <button 
            className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            Generate Videos
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'images' ? (
            <div className="generate-container">
              <div className="generate-form">
                <label htmlFor="image-desc" className="form-label">Describe the image you want to create...</label>
                <textarea
                  id="image-desc"
                  className="input-area"
                  value={imageDesc}
                  onChange={(e) => setImageDesc(e.target.value)}
                  placeholder="e.g., 'A serene mountain landscape at sunset with purple clouds'"
                />
                <div className="style-buttons">
                  <button>Photorealistic</button>
                  <button>Digital Art</button>
                  <button>Oil Painting</button>
                  <button>Sketch</button>
                  <button>Watercolor</button>
                  <button>Abstract</button>
                  <button>Anime</button>
                  <button>Cyberpunk</button>
                </div>
                <div className="dropdown-row">
                  <select id="img-dim">
                    <option>Square (1024x1024)</option>
                    <option>Portrait (1024x1536)</option>
                    <option>Landscape (1536x1024)</option>
                  </select>
                  <select id="img-quality">
                    <option>Standard</option>
                    <option>High</option>
                    <option>Ultra</option>
                  </select>
                </div>
                <button className="generate-btn" onClick={() => handleGenerate('image')}>
                  Generate Image
                </button>
              </div>
              <div className="tips-box">
                <h3>💡 Image Generation Tips</h3>
                <ul>
                  <li>Be specific about colors, lighting, and composition</li>
                  <li>Include art style preferences</li>
                  <li>Mention camera angles or perspectives</li>
                  <li>Add mood or atmosphere descriptions</li>
                  <li>Try different style presets for unique looks</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="generate-container">
              <div className="generate-form">
                <label htmlFor="video-desc" className="form-label">Describe the video scene...</label>
                <textarea
                  id="video-desc"
                  className="input-area"
                  value={videoDesc}
                  onChange={(e) => setVideoDesc(e.target.value)}
                  placeholder="e.g., 'A time-lapse of city lights at night with moving traffic'"
                />
                <div className="dropdown-row">
                  <select id="vid-duration">
                    <option>5 seconds</option>
                    <option>10 seconds</option>
                    <option>20 seconds</option>
                  </select>
                  <select id="vid-res">
                    <option>720p</option>
                    <option>1080p</option>
                    <option>4K</option>
                  </select>
                </div>
                <button className="generate-btn video" onClick={() => handleGenerate('video')}>
                  Generate Video
                </button>
              </div>
              <div className="tips-box">
                <h3>🎬 Video Generation Tips</h3>
                <ul>
                  <li>Describe motion and movement clearly</li>
                  <li>Specify camera movements</li>
                  <li>Include timing references</li>
                  <li>Mention lighting changes or effects</li>
                  <li>Keep scenes simple for better results</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );

  const renderGallery = () => (
    <div className="gallery">
      <section className="gallery-header">
        <h1>Content Gallery</h1>
        <p>Explore and manage your AI-generated content</p>
      </section>

      <section className="gallery-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search your content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="gallery-actions">
          <button className="filter-btn">📅 Newest First ▾</button>
          <button 
            className={`layout-btn ${layout === 'grid' ? 'active' : ''}`}
            onClick={() => setLayout('grid')}
          >
            🔲
          </button>
          <button 
            className={`layout-btn ${layout === 'list' ? 'active' : ''}`}
            onClick={() => setLayout('list')}
          >
            ☰
          </button>
        </div>
      </section>

      <section className="gallery-tabs">
        <button 
          className={`tab ${galleryTab === 'my-content' ? 'active' : ''}`}
          onClick={() => setGalleryTab('my-content')}
        >
          My Content
        </button>
        <button 
          className={`tab ${galleryTab === 'community' ? 'active' : ''}`}
          onClick={() => setGalleryTab('community')}
        >
          Community
        </button>
      </section>

      <section className={`gallery-content ${layout}`}>
        {content.length > 0 ? (
          content.map(item => (
            <div key={item.id} className="content-item">
              {item.type === 'image' ? (
                <img src={item.url} alt={item.description} />
              ) : (
                <video src={item.url} controls />
              )}
              <div className="content-info">
                <p>{item.description}</p>
                <span className="timestamp">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="gallery-empty">
            <h2>Your Creations (0)</h2>
            <div className="empty-content">
              <div style={{ fontSize: '4rem', margin: '2rem 0' }}>📁</div>
              <p>Start creating your first AI-generated content!</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );

  const renderSubscription = () => (
    <div className="subscription-page">
      <section className="subscription-hero">
        <h1>
          <span className="bold">Choose Your</span>{' '}
          <span className="highlight-premium">Premium Plan</span>
        </h1>
        <p className="subtitle">Enjoy unlimited features with AI Plus</p>
      </section>

      <div className="subscription-card">
        <div className="badge">⭐ Premium Plan</div>

        <h2 className="plan-title">AI Plus</h2>
        <div className="plan-price">
          $10 <span>/month</span>
        </div>

        <ul className="plan-features">
          {[
            'Unlimited image generation',
            'Create 4K videos',
            'Priority processing',
            'Access to all art styles',
            '24/7 technical support',
            'Download without watermark',
          ].map((f, i) => (
            <li key={i}>
              <span>{f}</span> <span className="check">✓</span>
            </li>
          ))}
        </ul>

        <button className="subscribe-btn" onClick={handleSubscribe}>
          🚀 Subscribe Now
        </button>
        <p className="cancel-note">You can cancel your subscription at any time</p>
      </div>

      {showPaymentModal && (
        <div className="payment-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Choose Payment Method</h2>
            <p>Please select your preferred payment method</p>
            <div className="payment-options">
              <button
                className="payment-btn visa"
                onClick={() => handlePaymentChoice('Visa / MasterCard')}
              >
                💳 Visa / MasterCard
              </button>
              <button
                className="payment-btn paypal"
                onClick={() => handlePaymentChoice('PayPal')}
              >
                🟦 PayPal
              </button>
              <button className="payment-cancel" onClick={() => setShowPaymentModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderLogin = () => (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email address"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="auth-btn">Sign In</button>
        <p className="switch-link">
          Don't have an account? <button type="button" onClick={() => setActivePage('register')}>Sign up</button>
        </p>
      </form>
    </div>
  );

  const renderRegister = () => (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleRegister}>
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join us to start your journey!</p>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={registerData.username}
            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email address"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={registerData.confirmPassword}
            onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="auth-btn">Create Account</button>
        <p className="switch-link">
          Already have an account? <button type="button" onClick={() => setActivePage('login')}>Sign in</button>
        </p>
      </form>
    </div>
  );

  const renderProfile = () => (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-avatar">
            👤
          </div>
          <h2 className="profile-name">{profileData.username}</h2>
          <p className="profile-role">Content Creator</p>
          <button className="profile-edit-btn">Edit Profile</button>
        </div>

        <div className="profile-details">
          <h2>Profile Settings</h2>
          <form className="profile-form" onSubmit={handleProfileUpdate}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={profileData.username}
                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                placeholder="Enter your username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                rows={4}
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                placeholder="Write something about yourself..."
              />
            </div>

            <button type="submit" className="profile-save-btn">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );

  const renderFooter = () => (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section brand">
          <h2>⚡ AI Creator Studio</h2>
          <p>Advanced platform for creating visual content using cutting-edge artificial intelligence technology</p>
        </div>
        <div className="footer-section">
          <h3>Products</h3>
          <ul>
            <li>Image Generator</li>
            <li>Video Generator</li>
            <li>Text Editor</li>
            <li>Developer API</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li>About Us</li>
            <li>Pricing</li>
            <li>Blog</li>
            <li>Careers</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 AI Creator Studio. All rights reserved.</p>
        <div className="social-icons">
          <span style={{ fontSize: '1.5rem' }}>📘 📷 🦅 💼</span>
        </div>
      </div>
    </footer>
  );

  const renderLoadingOverlay = () => (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p>Creating content...</p>
      </div>
    </div>
  );

  return (
    <div className="app">
      {renderHeader()}
      <main className="main-content">
        {activePage === 'dashboard' && renderDashboard()}
        {activePage === 'gallery' && renderGallery()}
        {activePage === 'subscription' && renderSubscription()}
        {activePage === 'login' && renderLogin()}
        {activePage === 'register' && renderRegister()}
        {activePage === 'profile' && renderProfile()}
      </main>
      {renderFooter()}
      {isGenerating && renderLoadingOverlay()}
    </div>
  );
}

export default AICreateStudio;
