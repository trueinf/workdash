import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Shield, 
  Zap, Brain, CheckCircle, Sparkles, Network
} from 'lucide-react';

interface LoginProps {
  onLogin?: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      if (onLogin) {
        onLogin();
      }
    }, 1500);
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: '12 autonomous agents working 24/7 to optimize your workflow'
    },
    {
      icon: Zap,
      title: 'Instant Automation',
      description: 'Save 8+ hours weekly with smart task orchestration'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: '100% policy compliance with built-in guardrails'
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand/Visual */}
      <motion.div 
        className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-12"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white/5 backdrop-blur-sm"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-48 h-48 rounded-full bg-white/5 backdrop-blur-sm"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Logo/Brand */}
            <div className="flex items-center gap-3 mb-8">
              <div 
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <Network className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-white">WorkDash</h1>
                <p className="text-white/80" style={{ fontSize: 'var(--text-sm)' }}>
                  Agentic AI Virtual Admin
                </p>
              </div>
            </div>

            {/* Main Headline */}
            <div className="mb-12">
              <h1 className="text-white mb-4" style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>
                Your AI Team,
                <br />
                Always Working
              </h1>
              <p className="text-white/80 text-lg max-w-md" style={{ lineHeight: '1.6' }}>
                Experience the future of executive assistance with 12 intelligent agents 
                orchestrating your inbox, calendar, meetings, and tasks.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                >
                  <div 
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ borderRadius: 'var(--radius-md)' }}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white mb-1">{feature.title}</h3>
                    <p className="text-white/70" style={{ fontSize: 'var(--text-sm)' }}>
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Stats */}
        <motion.div
          className="relative z-10 grid grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {[
            { value: '8.2h', label: 'Saved Weekly' },
            { value: '94%', label: 'AI Accuracy' },
            { value: '1200+', label: 'Decisions/Month' },
          ].map((stat, idx) => (
            <div key={idx}>
              <p className="text-white text-2xl mb-1">{stat.value}</p>
              <p className="text-white/60" style={{ fontSize: 'var(--text-xs)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div
          className="w-full max-w-md"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div 
              className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center"
              style={{ borderRadius: 'var(--radius-md)' }}
            >
              <Network className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h2 className="text-foreground">WorkDash</h2>
              <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
                Agentic AI Virtual Admin
              </p>
            </div>
          </div>

          {/* Welcome Text */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-foreground mb-2">Welcome back</h2>
            <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
              Sign in to access your AI-powered workspace
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-foreground mb-2"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dana.martinez@generalmills.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  style={{ 
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-sm)'
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-foreground mb-2"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-11 pr-12 py-3 bg-surface border border-border rounded-lg text-foreground placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  style={{ 
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-sm)'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 cursor-pointer"
                  style={{ borderRadius: 'var(--radius-sm)' }}
                />
                <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-primary hover:underline"
                style={{ fontSize: 'var(--text-sm)' }}
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              style={{ borderRadius: 'var(--radius-md)' }}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {/* Button Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              {isLoading ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in to WorkDash</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-background text-text-muted" style={{ fontSize: 'var(--text-sm)' }}>
                  or continue with
                </span>
              </div>
            </div>

            {/* SSO Options */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="py-3 px-4 bg-surface border border-border rounded-lg hover:bg-secondary transition-all flex items-center justify-center gap-2"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z" fill="#4285F4"/>
                  <path d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24Z" fill="#34A853"/>
                  <path d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09Z" fill="#FBBC05"/>
                  <path d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96Z" fill="#EA4335"/>
                </svg>
                <span style={{ fontSize: 'var(--text-sm)' }}>Google</span>
              </button>
              <button
                type="button"
                className="py-3 px-4 bg-surface border border-border rounded-lg hover:bg-secondary transition-all flex items-center justify-center gap-2"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.4 24C5.1 24 0 18.6 0 12S5.1 0 11.4 0C15 0 18 1.4 20.3 3.7l-2.8 2.9c-1.6-1.5-3.7-2.4-6.1-2.4-5 0-9 4.1-9 9.1s4 9.1 9 9.1c3.7 0 6.2-1.5 7.6-3.7 1.1-1.7 1.8-4.2 1.9-6h-9.5v-3.9h13.3c.1.8.2 1.7.2 2.7 0 3.3-1 6.1-2.9 8.2C19.4 22.2 15.9 24 11.4 24Z" fill="currentColor"/>
                </svg>
                <span style={{ fontSize: 'var(--text-sm)' }}>Microsoft</span>
              </button>
            </div>
          </motion.form>

          {/* Footer Links */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-text-secondary" style={{ fontSize: 'var(--text-sm)' }}>
              Don't have an account?{' '}
              <button className="text-primary hover:underline">
                Request access
              </button>
            </p>
            <div className="mt-4 flex items-center justify-center gap-6 text-text-muted">
              <button className="hover:text-foreground transition-colors" style={{ fontSize: 'var(--text-xs)' }}>
                Privacy Policy
              </button>
              <span>•</span>
              <button className="hover:text-foreground transition-colors" style={{ fontSize: 'var(--text-xs)' }}>
                Terms of Service
              </button>
              <span>•</span>
              <button className="hover:text-foreground transition-colors" style={{ fontSize: 'var(--text-xs)' }}>
                Help
              </button>
            </div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            className="mt-8 p-4 bg-surface border border-border rounded-lg"
            style={{ borderRadius: 'var(--radius-lg)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ borderRadius: 'var(--radius-md)' }}
              >
                <Shield className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-foreground mb-1" style={{ fontSize: 'var(--text-sm)' }}>
                  Enterprise-grade security
                </p>
                <p className="text-text-muted" style={{ fontSize: 'var(--text-xs)' }}>
                  Your data is encrypted and protected with industry-leading security protocols
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
