import React, { useState, useEffect } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-900 mb-2">Fenero Admin Dashboard</h1>
              <p className="text-blue-600">Manage user registrations and export data</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={fetchData}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-all shadow-md hover:shadow-lg"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleExport}
                disabled={exporting}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-all shadow-md hover:shadow-lg"
              >
                <Download className="w-5 h-5" />
                {exporting ? 'Exporting...' : 'Export Excel'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Users className="w-8 h-8" />}
            title="Total Users"
            value={stats.total_users}
            color="blue"
          />
          <StatCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Borrowers"
            value={stats.borrowers}
            color="purple"
          />
          <StatCard
            icon={<Users className="w-8 h-8" />}
            title="Partners"
            value={stats.partners}
            color="indigo"
          />
          <StatCard
            icon={<Calendar className="w-8 h-8" />}
            title="Today's Signups"
            value={stats.today_signups}
            color="green"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-blue-100">
            <h2 className="text-2xl font-bold text-blue-900">User Registrations</h2>
            <p className="text-blue-600 mt-1">{users.length} total users</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Designation</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-blue-600">
                      Loading users...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-blue-600">
                      No users registered yet
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-blue-900 font-medium">{user.id}</td>
                      <td className="px-6 py-4 text-sm text-blue-900 font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">{user.phone}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">{user.company}</td>
                      <td className="px-6 py-4 text-sm text-blue-700">{user.designation}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'borrower' 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'bg-indigo-100 text-indigo-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-600">
                        {new Date(user.created_at).toLocaleString()}
                      </td>
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
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    indigo: 'from-indigo-500 to-indigo-600',
    green: 'from-green-500 to-green-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${colors[color]} text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-blue-900">{value}</p>
    </div>
  );
}