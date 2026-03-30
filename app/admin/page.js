'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [adminData, setAdminData] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        setAdminData(data);
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (passwordInput === adminData?.adminPassword) {
      setAuthenticated(true);
      setPasswordInput('');
    } else {
      setError('Incorrect password');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (newPassword === currentPassword) {
      setError('New password is the same as old password');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      if (res.ok) {
        setMessage('✅ Password changed successfully!');
        setNewPassword('');
        setCurrentPassword('');
        setTimeout(() => {
          setAdminData({ ...adminData, adminPassword: newPassword });
        }, 1000);
      } else {
        setError('Failed to update password');
      }
    } catch (err) {
      setError('Error updating password');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
        <div className="bg-neutral-900 border border-red-600 rounded-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-2">StreamFree Admin</h1>
          <p className="text-gray-400 mb-6">Enter your admin password to access settings</p>
          
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Admin Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:border-red-600"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">🎬 StreamFree Admin</h1>
          <p className="text-gray-400">Manage your streaming service</p>
        </div>

        {/* Admin Info */}
        <div className="bg-neutral-900 border border-red-600 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Your Admin Info</h2>
          <div className="space-y-2 text-gray-300">
            <p><span className="text-red-600 font-semibold">Owner:</span> {adminData?.siteOwner || 'Not set'}</p>
            <p><span className="text-red-600 font-semibold">Current Password:</span> ••••••••</p>
            <p><span className="text-red-600 font-semibold">Movies Uploaded:</span> {adminData?.totalUploads || 0}</p>
          </div>
        </div>

        {/* Change Password Form */}
        <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Change Admin Password</h2>
          
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">New Password</label>
              <input
                type="password"
                placeholder="Enter new password (min 6 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-2 rounded focus:outline-none focus:border-red-600"
              />
            </div>

            {message && <p className="text-green-500 text-sm">{message}</p>}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold py-2 rounded transition"
            >
              {saving ? 'Updating...' : 'Change Password'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-neutral-700">
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <div className="space-y-2">
              <a href="/upload" className="text-red-600 hover:text-red-500">→ Upload New Movie</a>
              <a href="/" className="text-red-600 hover:text-red-500">→ View Homepage</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
