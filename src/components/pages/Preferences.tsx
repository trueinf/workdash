import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, Zap } from 'lucide-react';

export function Preferences() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2">Preferences</h1>
        <p className="text-text-secondary">Customize your WorkDash experience</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Profile Settings */}
        <div 
          className="bg-card border border-border rounded-lg p-6"
          style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-level1)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-primary" />
            <h2>Profile Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-text-secondary">Full Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                style={{ borderRadius: 'var(--radius-md)' }}
              />
            </div>
            <div>
              <label className="block mb-2 text-text-secondary">Email</label>
              <input
                type="email"
                defaultValue="john.doe@company.com"
                className="w-full px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                style={{ borderRadius: 'var(--radius-md)' }}
              />
            </div>
            <div>
              <label className="block mb-2 text-text-secondary">Role</label>
              <input
                type="text"
                defaultValue="Product Manager"
                className="w-full px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                style={{ borderRadius: 'var(--radius-md)' }}
              />
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div 
          className="bg-card border border-border rounded-lg p-6"
          style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-level1)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-5 h-5 text-primary" />
            <h2>Appearance</h2>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <div className="mb-1">Dark Mode</div>
              <div className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                Switch between light and dark theme
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                darkMode ? 'bg-primary' : 'bg-text-muted'
              }`}
              style={{ borderRadius: 'var(--radius-pill)' }}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  darkMode ? 'translate-x-7' : 'translate-x-1'
                }`}
                style={{ borderRadius: 'var(--radius-pill)' }}
              />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div 
          className="bg-card border border-border rounded-lg p-6"
          style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-level1)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-primary" />
            <h2>Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <div className="mb-1">Push Notifications</div>
                <div className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                  Receive notifications for important updates
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  notifications ? 'bg-primary' : 'bg-text-muted'
                }`}
                style={{ borderRadius: 'var(--radius-pill)' }}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications ? 'translate-x-7' : 'translate-x-1'
                  }`}
                  style={{ borderRadius: 'var(--radius-pill)' }}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <div className="mb-1">Email Digest</div>
                <div className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                  Daily summary of activities
                </div>
              </div>
              <button
                onClick={() => setEmailDigest(!emailDigest)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  emailDigest ? 'bg-primary' : 'bg-text-muted'
                }`}
                style={{ borderRadius: 'var(--radius-pill)' }}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    emailDigest ? 'translate-x-7' : 'translate-x-1'
                  }`}
                  style={{ borderRadius: 'var(--radius-pill)' }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* AI Agent Settings */}
        <div 
          className="bg-card border border-border rounded-lg p-6"
          style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-level1)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-5 h-5 text-primary" />
            <h2>AI Agent Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <div className="mb-1">Auto-Schedule Meetings</div>
                <div className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                  Allow AI to automatically schedule meetings
                </div>
              </div>
              <button
                onClick={() => setAutoSchedule(!autoSchedule)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  autoSchedule ? 'bg-primary' : 'bg-text-muted'
                }`}
                style={{ borderRadius: 'var(--radius-pill)' }}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    autoSchedule ? 'translate-x-7' : 'translate-x-1'
                  }`}
                  style={{ borderRadius: 'var(--radius-pill)' }}
                />
              </button>
            </div>

            <div className="py-3">
              <label className="block mb-2 text-text-secondary">Working Hours</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="time"
                  defaultValue="09:00"
                  className="px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  style={{ borderRadius: 'var(--radius-md)' }}
                />
                <input
                  type="time"
                  defaultValue="17:00"
                  className="px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  style={{ borderRadius: 'var(--radius-md)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div 
          className="bg-card border border-border rounded-lg p-6"
          style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-level1)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <h2>Privacy & Security</h2>
          </div>
          
          <div className="space-y-3">
            <button 
              className="w-full bg-secondary text-primary px-4 py-3 rounded-lg hover:bg-secondary/80 transition-colors text-left"
              style={{ 
                borderRadius: 'var(--radius-md)',
                transition: 'var(--transition-fast)'
              }}
            >
              Change Password
            </button>
            <button 
              className="w-full bg-secondary text-primary px-4 py-3 rounded-lg hover:bg-secondary/80 transition-colors text-left"
              style={{ 
                borderRadius: 'var(--radius-md)',
                transition: 'var(--transition-fast)'
              }}
            >
              Two-Factor Authentication
            </button>
            <button 
              className="w-full bg-secondary text-primary px-4 py-3 rounded-lg hover:bg-secondary/80 transition-colors text-left"
              style={{ 
                borderRadius: 'var(--radius-md)',
                transition: 'var(--transition-fast)'
              }}
            >
              Connected Apps
            </button>
          </div>
        </div>

        {/* Language & Region */}
        <div 
          className="bg-card border border-border rounded-lg p-6"
          style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-level1)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-primary" />
            <h2>Language & Region</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-text-secondary">Language</label>
              <select
                className="w-full px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-text-secondary">Timezone</label>
              <select
                className="w-full px-4 py-3 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <option>Pacific Time (PT)</option>
                <option>Mountain Time (MT)</option>
                <option>Central Time (CT)</option>
                <option>Eastern Time (ET)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <button 
            className="bg-secondary text-primary px-6 py-3 rounded-lg hover:bg-secondary/80 transition-colors"
            style={{ 
              borderRadius: 'var(--radius-md)',
              transition: 'var(--transition-fast)'
            }}
          >
            Cancel
          </button>
          <button 
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            style={{ 
              borderRadius: 'var(--radius-md)',
              transition: 'var(--transition-fast)'
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
