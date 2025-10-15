import React, { useState, useEffect } from 'react';
import { User, Image, Video, Bell, UserCircle, ChevronDown, Users, Edit, Trash2, Eye, UserPlus, Bolt, DollarSign } from 'lucide-react';
import './admin.css';

const AdminDashboard = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 1247,
    imagesGenerated: 8934,
    videosCreated: 2156,
    totalRevenue: 45890
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [contentFilter, setContentFilter] = useState('All Types');
  const [subscriptionFilter, setSubscriptionFilter] = useState('All Status');
  const [paymentFilter, setPaymentFilter] = useState('All Status');

  // User Data
  const userData = [
    { name: 'Mozfer mohmed', email: 'mozfer524@gmail.com.com', status: 'Active', joinDate: '2024-05-15' },
    { name: 'Sarah Johnson', email: 'sarah@email.com', status: 'Pending', joinDate: '2024-05-12' },
    { name: 'Mike Wilson', email: 'mike@email.com', status: 'Inactive', joinDate: '2024-05-10' }
  ];

  const contentData = [
    { title: 'Beautiful Landscape', type: 'Image', creator: 'John Smith', date: '2024-06-01' },
    { title: 'Marketing Video', type: 'Video', creator: 'Sarah Johnson', date: '2024-05-30' },
    { title: 'Tech Article', type: 'Text', creator: 'Mike Wilson', date: '2024-05-28' }
  ];

  // Subscription and Payment Data
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, user: 'John Smith', plan: 'AI Plus', status: 'Active', startDate: '2024-05-15', endDate: '2025-05-15' },
    { id: 2, user: 'Sarah Johnson', plan: 'AI Plus', status: 'Active', startDate: '2024-06-01', endDate: '2025-06-01' },
    { id: 3, user: 'Mike Wilson', plan: 'AI Plus', status: 'Expired', startDate: '2024-01-10', endDate: '2024-07-10' },
    { id: 4, user: 'Emily Davis', plan: 'AI Plus', status: 'Canceled', startDate: '2024-03-20', endDate: '2024-09-20' }
  ]);

  const [payments, setPayments] = useState([
    { id: 1, user: 'John Smith', amount: '$10.00', method: 'Visa', status: 'Completed', date: '2024-05-15' },
    { id: 2, user: 'Sarah Johnson', amount: '$10.00', method: 'PayPal', status: 'Completed', date: '2024-06-01' },
    { id: 3, user: 'Mike Wilson', amount: '$10.00', method: 'MasterCard', status: 'Failed', date: '2024-07-10' },
    { id: 4, user: 'Emily Davis', amount: '$10.00', method: 'Visa', status: 'Pending', date: '2024-09-20' },
    { id: 5, user: 'John Smith', amount: '$10.00', method: 'Visa', status: 'Completed', date: '2024-06-15' }
  ]);

  const [editingSubscription, setEditingSubscription] = useState(null);
  const [newSubscriptionStatus, setNewSubscriptionStatus] = useState('');

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
      case 'expired': return 'status-badge status-inactive';
      case 'canceled': return 'status-badge status-inactive';
      case 'completed': return 'status-badge status-active';
      case 'failed': return 'status-badge status-inactive';
      default: return 'status-badge status-active';
    }
  };

  const updateStats = () => {
    setStats(prev => ({
      totalUsers: prev.totalUsers + Math.floor(Math.random() * 10) - 5,
      imagesGenerated: prev.imagesGenerated + Math.floor(Math.random() * 10) - 5,
      videosCreated: prev.videosCreated + Math.floor(Math.random() * 10) - 5,
      totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 100) - 50
    }));
  };

  // API Functions
  const fetchSubscriptions = async () => {
    try {
      const response = await fetch('/api/subscriptions');
      const data = await response.json();
      setSubscriptions(data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/payments');
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const updateSubscriptionStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/subscriptions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setSubscriptions(prev => 
          prev.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub)
        );
        alert('Subscription status updated successfully!');
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
      setSubscriptions(prev => 
        prev.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub)
      );
      alert('Subscription status updated successfully! (Demo Mode)');
    }
  };

  const deleteSubscription = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      try {
        const response = await fetch(`/api/subscriptions/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setSubscriptions(prev => prev.filter(sub => sub.id !== id));
          alert('Subscription deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting subscription:', error);
        setSubscriptions(prev => prev.filter(sub => sub.id !== id));
        alert('Subscription deleted successfully! (Demo Mode)');
      }
    }
  };

  const handleEditSubscription = (subscription) => {
    setEditingSubscription(subscription);
    setNewSubscriptionStatus(subscription.status);
  };

  const handleUpdateSubscription = () => {
    if (editingSubscription && newSubscriptionStatus) {
      updateSubscriptionStatus(editingSubscription.id, newSubscriptionStatus);
      setEditingSubscription(null);
      setNewSubscriptionStatus('');
    }
  };

  useEffect(() => {
    const interval = setInterval(updateStats, 30000);
    fetchSubscriptions();
    fetchPayments();
    return () => clearInterval(interval);
  }, []);

  const filteredSubscriptions = subscriptions.filter(sub => {
    if (subscriptionFilter !== 'All Status' && sub.status !== subscriptionFilter) {
      return false;
    }
    return true;
  });

  const filteredPayments = payments.filter(payment => {
    if (paymentFilter !== 'All Status' && payment.status !== paymentFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="admin-dashboard">
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
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            AICreate Studio Admin Dashboard
          </h1>
          <p className="dashboard-subtitle">
            Comprehensive management for users, content, subscriptions, and payments. Control all aspects of your system from one centralized location.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <Users size={48} className="stat-card-icon" />
            <div className="stat-card-value">
              {stats.totalUsers.toLocaleString()}
            </div>
            <div className="stat-card-label">Total Users</div>
          </div>

          <div className="stat-card">
            <Image size={48} className="stat-card-icon" />
            <div className="stat-card-value">
              {stats.imagesGenerated.toLocaleString()}
            </div>
            <div className="stat-card-label">Images Generated</div>
          </div>

          <div className="stat-card">
            <Video size={48} className="stat-card-icon" />
            <div className="stat-card-value">
              {stats.videosCreated.toLocaleString()}
            </div>
            <div className="stat-card-label">Videos Created</div>
          </div>

          <div className="stat-card">
            <DollarSign size={48} className="stat-card-icon" />
            <div className="stat-card-value">
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <div className="stat-card-label">Total Revenue</div>
          </div>
        </div>

        <div className="main-content">
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
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={getStatusBadgeClass(user.status)}>
                          {user.status}
                        </span>
                      </td>
                      <td>{user.joinDate}</td>
                      <td>
                        <button className="action-button edit-button">
                          <Edit size={16} />
                        </button>
                        <button className="action-button delete-button">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

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
                    <tr key={index}>
                      <td>{content.title}</td>
                      <td>{content.type}</td>
                      <td>{content.creator}</td>
                      <td>{content.date}</td>
                      <td>
                        <button className="action-button edit-button">
                          <Eye size={16} />
                        </button>
                        <button className="action-button delete-button">
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

        <div className="management-card" style={{ marginTop: '2rem' }}>
          <h2 className="management-header">
            <Bolt />
            Subscription Management
          </h2>
          
          <div className="filter-controls">
            <input
              type="text"
              placeholder="Search subscriptions..."
              className="search-input"
            />
            <select
              value={subscriptionFilter}
              onChange={(e) => setSubscriptionFilter(e.target.value)}
              className="filter-select"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Expired</option>
              <option>Canceled</option>
            </select>
          </div>

          <div className="table-container">
            <table className="management-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscriptions.map((subscription) => (
                  <tr key={subscription.id}>
                    <td>{subscription.user}</td>
                    <td>{subscription.plan}</td>
                    <td>
                      <span className={getStatusBadgeClass(subscription.status)}>
                        {subscription.status}
                      </span>
                    </td>
                    <td>{subscription.startDate}</td>
                    <td>{subscription.endDate}</td>
                    <td>
                      <button 
                        className="action-button edit-button"
                        onClick={() => handleEditSubscription(subscription)}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="action-button delete-button"
                        onClick={() => deleteSubscription(subscription.id)}
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

        <div className="management-card" style={{ marginTop: '2rem' }}>
          <h2 className="management-header">
            <DollarSign />
            Payment Logs
          </h2>
          
          <div className="filter-controls">
            <input
              type="text"
              placeholder="Search payments..."
              className="search-input"
            />
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="filter-select"
            >
              <option>All Status</option>
              <option>Completed</option>
              <option>Failed</option>
              <option>Pending</option>
            </select>
          </div>

          <div className="table-container">
            <table className="management-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.user}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.method}</td>
                    <td>
                      <span className={getStatusBadgeClass(payment.status)}>
                        {payment.status}
                      </span>
                    </td>
                    <td>{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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
            <div>
              <div className="modal-form-group">
                <label className="modal-label">User Name</label>
                <input 
                  type="text"
                  placeholder="Enter User Name"
                  className="modal-input"
                />
              </div>
              <div className="modal-form-group">
                <label className="modal-label">Email</label>
                <input 
                  type="email"
                  placeholder="Enter Email"
                  className="modal-input"
                />
              </div>
              <div className="modal-form-group">
                <label className="modal-label">Password</label>
                <input 
                  type="password"
                  placeholder="Enter Password"
                  className="modal-input"
                />
              </div>
              <div className="modal-form-group">
                <label className="modal-label">Account Type</label>
                <select className="modal-select">
                  <option value="regular">Regular User</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              <button 
                className="modal-submit-button"
                onClick={() => {
                  alert('User added successfully!');
                  closeModal();
                }}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {editingSubscription && (
        <div 
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setEditingSubscription(null);
            }
          }}
        >
          <div className="modal-content">
            <span 
              onClick={() => setEditingSubscription(null)}
              className="modal-close-button"
            >
              ×
            </span>
            <h2 className="modal-title">Edit Subscription Status</h2>
            <div>
              <div className="modal-form-group">
                <label className="modal-label">User</label>
                <input 
                  type="text"
                  value={editingSubscription.user}
                  disabled
                  className="modal-input"
                  style={{ opacity: 0.7 }}
                />
              </div>
              <div className="modal-form-group">
                <label className="modal-label">Plan</label>
                <input 
                  type="text"
                  value={editingSubscription.plan}
                  disabled
                  className="modal-input"
                  style={{ opacity: 0.7 }}
                />
              </div>
              <div className="modal-form-group">
                <label className="modal-label">Subscription Status</label>
                <select 
                  value={newSubscriptionStatus}
                  onChange={(e) => setNewSubscriptionStatus(e.target.value)}
                  className="modal-select"
                >
                  <option value="Active">Active</option>
                  <option value="Expired">Expired</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>
              <button 
                className="modal-submit-button"
                onClick={handleUpdateSubscription}
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
