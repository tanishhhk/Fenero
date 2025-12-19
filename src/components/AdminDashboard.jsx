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
import '../styles/AdminDashboard.css';
import { Download, Users, TrendingUp, Calendar, RefreshCw } from 'lucide-react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total_users: 0, borrowers: 0, partners: 0, today_signups: 0 });
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, statsRes] = await Promise.all([
        fetch('http://localhost:5000/api/users'),
        fetch('http://localhost:5000/api/stats')
      ]);
      
      const usersData = await usersRes.json();
      const statsData = await statsRes.json();
      
      setUsers(usersData.users || []);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await fetch('http://localhost:5000/api/export-users');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fenero_users_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <h1>Fenero Admin Dashboard</h1>
              <p>Manage user registrations and export data</p>
            </div>
            <div className="header-actions">
              <button
                onClick={fetchData}
                disabled={loading}
                className="btn btn-refresh"
              >
                <RefreshCw className={loading ? 'spinning' : ''} />
                Refresh
              </button>
              <button
                onClick={handleExport}
                disabled={exporting}
                className="btn btn-export"
              >
                <Download />
                {exporting ? 'Exporting...' : 'Export Excel'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <StatCard
            icon={<Users />}
            title="Total Users"
            value={stats.total_users}
            color="blue"
          />
          <StatCard
            icon={<TrendingUp />}
            title="Borrowers"
            value={stats.borrowers}
            color="purple"
          />
          <StatCard
            icon={<Users />}
            title="Partners"
            value={stats.partners}
            color="indigo"
          />
          <StatCard
            icon={<Calendar />}
            title="Today's Signups"
            value={stats.today_signups}
            color="green"
          />
        </div>

        {/* Users Table */}
        <div className="users-table-section">
          <div className="table-header">
            <h2>User Registrations</h2>
            <p>{users.length} total users</p>
          </div>
          
          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>Designation</th>
                  <th>Role</th>
                  <th>Registered</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8">
                      <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>Loading users...</p>
                      </div>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="8">
                      <div className="empty-state">
                        <div className="empty-state-icon">📊</div>
                        <p>No users registered yet</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.company}</td>
                      <td>{user.designation}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{new Date(user.created_at).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, color }) {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">
        {icon}
      </div>
      <div className="stat-label">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}