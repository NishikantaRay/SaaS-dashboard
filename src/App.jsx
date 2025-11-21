import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { NotificationsSidebar } from './components/NotificationsSidebar';
import { Dashboard } from './components/Dashboard';
import { UserProfile } from './pages/UserProfile';
import { Loader } from './components/Loader';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
      />
      
      <NotificationsSidebar
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
      
      <div className="lg:ml-64 lg:mr-80">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onNotificationsClick={() => setNotificationsOpen(!notificationsOpen)}
        />
        
        <main className="min-h-[calc(100vh-73px)]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ecommerce" element={<Dashboard />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
