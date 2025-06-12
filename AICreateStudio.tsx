import React, { useState, useEffect } from 'react';

const AICreateStudio = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [currentTab, setCurrentTab] = useState('images');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState('');

  // Form states
  const [imageDesc, setImageDesc] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [imgDimension, setImgDimension] = useState('Square (1024x1024)');
  const [imgQuality, setImgQuality] = useState('Standard');
  const [vidDuration, setVidDuration] = useState('5 seconds');
  const [vidResolution, setVidResolution] = useState('720p');

  const styleButtons = [
    'Photorealistic', 'Digital Art', 'Oil Painting', 'Sketch', 
    'Watercolor', 'Abstract', 'Anime', 'Cyberpunk'
  ];

  const generateImage = () => {
    if (!imageDesc.trim()) {
      alert('يرجى إدخال وصف للصورة');
      return;
    }

    setShowResults(true);
    setIsLoading(true);
    setLoadingType('image');

    setTimeout(() => {
      const newResult = {
        id: Date.now(),
        type: 'image',
        prompt: imageDesc,
        style: selectedStyle || 'Default',
        dimension: imgDimension,
        quality: imgQuality,
        timestamp: new Date().toLocaleString('ar')
      };
      
      setResults(prev => [newResult, ...prev]);
      setIsLoading(false);
      setImageDesc('');
    }, 3000);
  };

  const generateVideo = () => {
    if (!videoDesc.trim()) {
      alert('يرجى إدخال وصف للفيديو');
      return;
    }

    setShowResults(true);
    setIsLoading(true);
    setLoadingType('video');

    setTimeout(() => {
      const newResult = {
        id: Date.now(),
        type: 'video',
        prompt: videoDesc,
        duration: vidDuration,
        resolution: vidResolution,
        timestamp: new Date().toLocaleString('ar')
      };
      
      setResults(prev => [newResult, ...prev]);
      setIsLoading(false);
      setVideoDesc('');
    }, 5000);
  };

  const deleteResult = (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المحتوى؟')) {
      setResults(prev => prev.filter(result => result.id !== id));
      if (results.length === 1) {
        setShowResults(false);
      }
    }
  };

  const downloadResult = () => {
    alert('سيتم تحميل المحتوى قريباً...');
  };

  const shareResult = () => {
    alert('سيتم مشاركة المحتوى قريباً...');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const Header = () => (
    <header className="bg-white bg-opacity-10 backdrop-blur-md px-8 py-4 flex justify-between items-center border-b border-white border-opacity-20">
      <div className="flex items-center gap-2 text-white text-2xl font-bold">
        <span className="text-4xl">⚡</span>
        <span>AICreate Studio</span>
      </div>
      
      <nav className="flex gap-8">
        {[
          { id: 'dashboard', label: 'Dashboard' },
          { id: 'gallery', label: 'Gallery' },
          { id: 'register', label: 'Sign Up' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`text-white text-opacity-80 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-20 hover:text-white ${
              currentPage === item.id ? 'bg-white bg-opacity-20 text-white' : ''
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="relative">
        <div 
          className="flex items-center gap-2 text-white cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(!showDropdown);
          }}
        >
          <span className="text-xl">🔔</span>
          <span className="text-xl">👤</span>
          <span>MOZFER</span>
          <span className={`transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}>▼</span>
        </div>
        
        {showDropdown && (
          <div className="absolute top-full right-0 bg-white rounded-lg p-2 min-w-[150px] shadow-lg z-50 opacity-100 transform translate-y-0 transition-all duration-300">
            <button
              onClick={() => setCurrentPage('profile')}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded transition-colors"
            >
              Profile
            </button>
            <button
              onClick={() => setCurrentPage('login')}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded transition-colors"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );

  const DashboardPage = () => (
    <div className="space-y-8">
      <section className="text-center text-white mb-12">
        <h1 className="text-5xl font-bold mb-4">
          <span className="font-bold">Create Stunning</span>{' '}
          <span className="bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
            AI Content
          </span>
        </h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          Transform your ideas into beautiful images and videos using cutting-edge AI technology. 
          Create, customize, and download professional content in minutes.
        </p>
      </section>

      {showResults && (
        <section className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Generated Content</h2>
            <button
              onClick={() => setShowResults(false)}
              className="text-white text-2xl hover:text-red-400 transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading && (
              <div className="bg-white bg-opacity-10 p-6 rounded-2xl">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-white">جاري إنشاء {loadingType === 'image' ? 'الصورة' : 'الفيديو'}...</p>
                </div>
              </div>
            )}
            
            {results.map(result => (
              <div key={result.id} className="bg-white bg-opacity-10 p-6 rounded-2xl">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">{result.type === 'image' ? '🖼️' : '🎬'}</div>
                  <span className="text-white font-semibold">
                    {result.type === 'image' ? 'صورة' : 'فيديو'}
                  </span>
                  <p className="text-white text-sm mt-2 opacity-90">{result.prompt}</p>
                  <div className="text-xs text-white opacity-70 mt-2">
                    {result.type === 'image' ? 
                      `الأبعاد: ${result.dimension} | الجودة: ${result.quality} | النمط: ${result.style}` :
                      `المدة: ${result.duration} | الدقة: ${result.resolution}`
                    }
                  </div>
                </div>
                
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={downloadResult}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                  >
                    تحميل
                  </button>
                  <button
                    onClick={shareResult}
                    className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                  >
                    مشاركة
                  </button>
                  <button
                    onClick={() => deleteResult(result.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8">
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setCurrentTab('images')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              currentTab === 'images'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'border-2 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-20'
            }`}
          >
            Generate Images
          </button>
          <button
            onClick={() => setCurrentTab('videos')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              currentTab === 'videos'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'border-2 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-20'
            }`}
          >
            Generate Videos
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white bg-opacity-10 p-8 rounded-2xl">
              {currentTab === 'images' ? (
                <>
                  <label className="block text-white mb-2 font-medium">
                    Describe the image you want to create...
                  </label>
                  <textarea
                    value={imageDesc}
                    onChange={(e) => setImageDesc(e.target.value)}
                    className="w-full p-4 border-none rounded-xl bg-white bg-opacity-90 text-gray-800 resize-none min-h-[100px] mb-4"
                    placeholder="e.g., 'A serene mountain landscape at sunset with purple clouds'"
                  />
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {styleButtons.map(style => (
                      <button
                        key={style}
                        onClick={() => setSelectedStyle(selectedStyle === style ? '' : style)}
                        className={`px-4 py-2 rounded-full transition-all duration-300 ${
                          selectedStyle === style
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : 'bg-white bg-opacity-20 border border-white border-opacity-30 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mb-4">
                    <select
                      value={imgDimension}
                      onChange={(e) => setImgDimension(e.target.value)}
                      className="flex-1 p-3 border-none rounded-lg bg-white bg-opacity-90 text-gray-800"
                    >
                      <option>Square (1024x1024)</option>
                      <option>Portrait (1024x1536)</option>
                      <option>Landscape (1536x1024)</option>
                    </select>
                    <select
                      value={imgQuality}
                      onChange={(e) => setImgQuality(e.target.value)}
                      className="flex-1 p-3 border-none rounded-lg bg-white bg-opacity-90 text-gray-800"
                    >
                      <option>Standard</option>
                      <option>High</option>
                      <option>Ultra</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={generateImage}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl text-lg font-bold hover:transform hover:-translate-y-1 transition-all duration-200"
                  >
                    Generate Image
                  </button>
                </>
              ) : (
                <>
                  <label className="block text-white mb-2 font-medium">
                    Describe the video scene...
                  </label>
                  <textarea
                    value={videoDesc}
                    onChange={(e) => setVideoDesc(e.target.value)}
                    className="w-full p-4 border-none rounded-xl bg-white bg-opacity-90 text-gray-800 resize-none min-h-[100px] mb-4"
                    placeholder="e.g., 'A time-lapse of city lights at night with moving traffic'"
                  />
                  
                  <div className="flex gap-4 mb-4">
                    <select
                      value={vidDuration}
                      onChange={(e) => setVidDuration(e.target.value)}
                      className="flex-1 p-3 border-none rounded-lg bg-white bg-opacity-90 text-gray-800"
                    >
                      <option>5 seconds</option>
                      <option>10 seconds</option>
                      <option>20 seconds</option>
                    </select>
                    <select
                      value={vidResolution}
                      onChange={(e) => setVidResolution(e.target.value)}
                      className="flex-1 p-3 border-none rounded-lg bg-white bg-opacity-90 text-gray-800"
                    >
                      <option>720p</option>
                      <option>1080p</option>
                      <option>4K</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={generateVideo}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl text-lg font-bold hover:transform hover:-translate-y-1 transition-all duration-200"
                  >
                    Generate Video
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="bg-white bg-opacity-10 p-6 rounded-2xl">
            <h3 className="text-white text-lg font-semibold mb-4">
              💡 {currentTab === 'images' ? 'Image' : 'Video'} Generation Tips
            </h3>
            <ul className="text-white text-sm space-y-2 opacity-90">
              {currentTab === 'images' ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    Be specific about colors, lighting, and composition
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    Include art style preferences (realistic, cartoon, etc.)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    Mention camera angles or perspectives
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    Add mood or atmosphere descriptions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    Try different style presets for unique looks
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    Describe motion and movement clearly
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    Specify camera movements (pan, zoom, etc.)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    Include timing references (slow motion, fast)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    Mention lighting changes or effects
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    Keep scenes simple for better results
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );

  const GalleryPage = () => (
    <div className="space-y-8">
      <section className="text-center text-white mb-8">
        <h1 className="text-4xl font-bold mb-2">Content Gallery</h1>
        <p className="text-lg opacity-90">Explore and manage your AI-generated content</p>
      </section>

      <section className="bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-2xl flex justify-between items-center">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search your content..."
            className="w-full px-6 py-3 rounded-full border-none bg-white bg-opacity-90 text-gray-800"
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-white bg-opacity-20 text-white px-4 py-3 rounded-lg hover:bg-opacity-30 transition-all">
            🔍 Newest First ▾
          </button>
          <button className="bg-white bg-opacity-20 text-white px-4 py-3 rounded-lg hover:bg-opacity-30 transition-all">
            🔲
          </button>
          <button className="bg-white bg-opacity-20 text-white px-4 py-3 rounded-lg hover:bg-opacity-30 transition-all">
            ☰
          </button>
        </div>
      </section>

      <section className="flex justify-center gap-4 mb-8">
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full">
          My Content
        </button>
        <button className="border-2 border-white border-opacity-30 text-white px-6 py-3 rounded-full hover:bg-white hover:bg-opacity-20 transition-all">
          Community
        </button>
      </section>

      <section className="text-center text-white bg-white bg-opacity-10 p-12 rounded-3xl backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4">Your Creations (0)</h2>
        <div className="text-6xl mb-8">📁</div>
        <p className="text-lg opacity-90">Start creating your first AI-generated content!</p>
      </section>
    </div>
  );

  const AuthForm = ({ isLogin = true }) => (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-3xl w-full max-w-md border border-white border-opacity-20">
        <div className="text-center text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="opacity-90">
            {isLogin ? 'Sign in to your account' : 'Join us to start your journey!'}
          </p>
        </div>

        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              required
              className="w-full p-4 border border-white border-opacity-30 rounded-xl bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-70"
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            required
            className="w-full p-4 border border-white border-opacity-30 rounded-xl bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-70"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-4 border border-white border-opacity-30 rounded-xl bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-70"
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="w-full p-4 border border-white border-opacity-30 rounded-xl bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-70"
            />
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl text-lg font-bold mt-6"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-4 text-white text-opacity-80">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setCurrentPage(isLogin ? 'register' : 'login')}
            className="text-white font-bold hover:underline"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );

  const ProfilePage = () => (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-3xl text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
            👤
          </div>
          <h2 className="text-white text-2xl font-bold mb-2">John Doe</h2>
          <p className="text-white text-opacity-80 mb-6">Content Creator</p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full">
            Edit Profile
          </button>
        </div>

        <div className="lg:col-span-2 bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-3xl">
          <h2 className="text-white text-2xl font-bold mb-8">Profile Settings</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-white mb-2 font-medium">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full p-4 border border-white border-opacity-30 rounded-xl bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-70"
              />
            </div>
            <div>
              <label className="block text-white mb-2 font-medium">Email address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-4 border border-white border-opacity-30 rounded-xl bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-70"
              />
            </div>
            <div>
              <label className="block text-white mb-2 font-medium">Bio</label>
              <textarea
                rows="4"
                placeholder="Write something about yourself..."
                className="w-full p-4 border border-white border-opacity-30 rounded-xl bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-70 resize-none"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-black bg-opacity-30 text-white p-8 mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold mb-4">⚡ AI Creator Studio</h2>
            <p className="opacity-80">منصة متطورة لإنشاء المحتوى المرئي باستخدام أحدث تقنيات الذكاء الاصطناعي</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">المنتجات</h3>
            <ul className="space-y-1 opacity-80">
              <li>مولد الصور</li>
              <li>مولد الفيديو</li>
              <li>محرر النصوص</li>
              <li>API للمطورين</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">الشركة</h3>
            <ul className="space-y-1 opacity-80">
              <li>من نحن</li>
              <li>التسعير</li>
              <li>المدونة</li>
              <li>الوظائف</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">الدعم</h3>
            <ul className="space-y-1 opacity-80">
              <li>مركز المساعدة</li>
              <li>اتصل بنا</li>
              <li>الشروط والأحكام</li>
              <li>سياسة الخصوصية</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 pt-8 text-center">
          <p className="mb-4">© 2024 AI Creator Studio. جميع الحقوق محفوظة.</p>
          <div className="flex justify-center gap-4 text-2xl">
            <span>📘</span>
            <span>📷</span>
            <span>🐦</span>
            <span>💼</span>
          </div>
        </div>
      </div>
    </footer>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'login':
        return <AuthForm isLogin={true} />;
      case 'register':
        return <AuthForm isLogin={false} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <Header />
      <main className="p-8">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
};

export default AICreateStudio;