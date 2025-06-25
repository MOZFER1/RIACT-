import React, { useState, useEffect } from 'react';
import { User, Image, Video, Bell, UserCircle, ChevronDown, Users, Edit, Trash2, Eye, UserPlus, Bolt } from 'lucide-react';
import './admin.css';

const AdminDashboard = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 1247,
    imagesGenerated: 8934,
    videosCreated: 2156
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [contentFilter, setContentFilter] = useState('All Types');

  const userData = [
    { name: 'John Smith', email: 'john@email.com', status: 'Active', joinDate: '2024-05-15' },
    { name: 'Sarah Johnson', email: 'sarah@email.com', status: 'Pending', joinDate: '2024-05-12' },
    { name: 'Mike Wilson', email: 'mike@email.com', status: 'Inactive', joinDate: '2024-05-10' }
  ];

  const contentData = [
    { title: 'Beautiful Landscape', type: 'Image', creator: 'John Smith', date: '2024-06-01' },
    { title: 'Marketing Video', type: 'Video', creator: 'Sarah Johnson', date: '2024-05-30' },
    { title: 'Tech Article', type: 'Text', creator: 'Mike Wilson', date: '2024-05-28' }
  ];

  const openModal = (modalId) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'status-badge status-active';
      case 'inactive': return 'status-badge status-inactive';
      case 'pending': return 'status-badge status-pending';
      default: return 'status-badge status-active';
    }
  };

  const updateStats = () => {
    setStats(prev => ({
      totalUsers: prev.totalUsers + Math.floor(Math.random() * 10) - 5,
      imagesGenerated: prev.imagesGenerated + Math.floor(Math.random() * 10) - 5,
      videosCreated: prev.videosCreated + Math.floor(Math.random() * 10) - 5
    }));
  };

  useEffect(() => {
    const interval = setInterval(updateStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <Bolt />
          AICreate Studio - Admin
        </div>
        <div className="header-profile">
          <Bell />
          <UserCircle />
          <span>Admin</span>
          <ChevronDown />
        </div>
      </header>

      <div className="main-content-wrapper">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            AICreate Studio Admin Dashboard
          </h1>
          <p className="dashboard-subtitle">
            Comprehensive management for users and AI-generated content. Control all aspects of your system from one centralized location.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div 
            className="stat-card"
          >
            <Users size={48} className="stat-card-icon" />
            <div className="stat-card-value">
              {stats.totalUsers.toLocaleString()}
            </div>
            <div className="stat-card-label">Total Users</div>
          </div>

          <div
            className="stat-card"
          >
            <Image size={48} className="stat-card-icon" />
            <div className="stat-card-value">
              {stats.imagesGenerated.toLocaleString()}
            </div>
            <div className="stat-card-label">Images Generated</div>
          </div>

          <div
            className="stat-card"
          >
            <Video size={48} className="stat-card-icon" />
            <div className="stat-card-value">
              {stats.videosCreated.toLocaleString()}
            </div>
            <div className="stat-card-label">Videos Created</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* User Management */}
          <div className="management-card">
            <h2 className="management-header">
              <Users />
              User Management
            </h2>
            
            <div className="filter-controls">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Banned</option>
              </select>
            </div>

            <div className="table-container">
              <table className="management-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Join Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user, index) => (
                    <tr 
                      key={index} 
                    >
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={getStatusBadgeClass(user.status)}>
                          {user.status}
                        </span>
                      </td>
                      <td>{user.joinDate}</td>
                      <td>
                        <button 
                          className="action-button edit-button"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className="action-button delete-button"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Content Management */}
          <div className="management-card">
            <h2 className="management-header">
              <Image />
              Content Management
            </h2>
            
            <div className="filter-controls">
              <input
                type="text"
                placeholder="Search content..."
                className="search-input"
              />
              <select
                value={contentFilter}
                onChange={(e) => setContentFilter(e.target.value)}
                className="filter-select"
              >
                <option>All Types</option>
                <option>Images</option>
                <option>Videos</option>
                <option>Text</option>
              </select>
            </div>

            <div className="table-container">
              <table className="management-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Creator</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contentData.map((content, index) => (
                    <tr 
                      key={index}
                    >
                      <td>{content.title}</td>
                      <td>{content.type}</td>
                      <td>{content.creator}</td>
                      <td>{content.date}</td>
                      <td>
                        <button 
                          className="action-button edit-button"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="action-button delete-button"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-grid">
          <div 
            onClick={() => openModal('userModal')}
            className="quick-action-card"
          >
            <UserPlus size={48} style={{ marginBottom: '1rem', opacity: 0.8 }} />
            <h3>Add New User</h3>
            <p>Create a new user account with specific permissions</p>
          </div>
        </div>
      </div>

      {/* User Modal */}
      {activeModal === 'userModal' && (
        <div 
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="modal-content">
            <span 
              onClick={closeModal}
              className="modal-close-button"
            >
              ×
            </span>
            <h2 className="modal-title">Add New User</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('User added successfully!');
              closeModal();
            }}>
              <div className="modal-form-group">
                <label className="modal-label">
                  Add New User
                </label>
                <input 
                  type="User Name"
                  placeholder="Enter User Name"
                  required
                  className="modal-input"
                />
                <input 
                  type="Email"
                  placeholder="Enter Email"
                  required
                  className="modal-input"
                />
                <input 
                  type="password"
                  placeholder="Enter password"
                  required
                  className="modal-input"
                />
              

              </div>
              <div className="modal-form-group">
                <label className="modal-label">
                  Account Type
                </label>
                <select className="modal-select">
                  <option value="regular">Regular User</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              <button 
                type="submit"
                className="modal-submit-button"
              >
                Add User
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;