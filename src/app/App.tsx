import React, { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/Home'
import { PredictionsPage } from './pages/PredictionsPage'
import { PredictionDetailPage } from './pages/PredictionDetail'
import { BlogPage } from './pages/Blog'
import { StatsPage } from './pages/Stats'
import { LoginPage } from './pages/Login'
import { AdminDashboard } from './pages/AdminDashboard'
import { AuthProvider, useAuth } from './context/AuthContext'

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, isAdmin, loading } = useAuth();

  // Redirect admin to dashboard on login
  useEffect(() => {
    if (user && isAdmin && currentPage === 'login') {
      setCurrentPage('admin');
    }
  }, [user, isAdmin, currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00FF88] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const renderPage = () => {
    // Basic protection for admin page
    if (currentPage === 'admin' && !isAdmin) {
      setCurrentPage('home');
      return <HomePage onNavigate={setCurrentPage} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'leagues':
      case 'predictions':
        return <PredictionsPage onNavigate={setCurrentPage} />;
      case 'detail':
        return <PredictionDetailPage />;
      case 'blog':
        return <BlogPage />;
      case 'stats':
        return <StatsPage />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  const showHeaderFooter = currentPage !== 'admin';

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-[#00FF88] selection:text-slate-950">
      {showHeaderFooter && <Header onNavigate={setCurrentPage} currentPage={currentPage} />}
      <main className={`${showHeaderFooter ? 'fade-in animate-in slide-in-from-bottom-2 duration-500' : ''}`}>
        {renderPage()}
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
