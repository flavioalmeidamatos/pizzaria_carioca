import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { ViewState, PRELOADER_URL } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('login');
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulator loader progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random increment for realistic feel
        const increment = Math.random() * 5 + 2; 
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Small delay after 100% before showing login
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  const handleLogin = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="z-10 flex flex-col items-center w-full max-w-sm">
          {/* Logo Image */}
          <div className="w-64 h-64 mb-12 relative flex items-center justify-center">
             <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-20 animate-pulse"></div>
             <img 
               src={PRELOADER_URL} 
               alt="Loading..." 
               className="w-full h-full object-contain drop-shadow-2xl animate-float-slow"
               referrerPolicy="no-referrer"
             />
          </div>

          {/* Progress Bar Container */}
          <div className="w-full h-1.5 bg-surface border border-slate-800 rounded-full overflow-hidden relative">
            {/* Moving Shine Effect */}
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full -translate-x-full animate-shimmer z-20"></div>
            
            {/* Progress Fill */}
            <div 
              className="h-full bg-primary shadow-[0_0_10px_rgba(227,24,55,0.8)] transition-all duration-75 ease-out relative z-10"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage Text */}
          <div className="mt-4 flex items-center justify-between w-full px-1">
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Carregando Sistema</span>
            <span className="text-xs text-primary font-bold">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-300 animate-fade-in">
      {currentView === 'login' ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;