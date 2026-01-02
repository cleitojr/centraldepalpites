import React, { useState } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/Home'
import { PredictionsPage } from './pages/PredictionsPage'
import { PredictionDetailPage } from './pages/PredictionDetail'
import { BlogPage } from './pages/Blog'
import { StatsPage } from './pages/Stats'
import { LoginPage } from './pages/Login'
import { AuthProvider } from './context/AuthContext'

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'leagues': // Reuse predictions for leagues for MVP
      case 'predictions':
        return <PredictionsPage onNavigate={setCurrentPage} />;
      case 'detail':
        return <PredictionDetailPage />;
      case 'blog':
        return <BlogPage />;
      case 'stats': // Mapping "reports" to stats page as well for MVP
        return <StatsPage />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-[#00FF88] selection:text-slate-950">
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
        <main className="fade-in animate-in slide-in-from-bottom-2 duration-500">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
