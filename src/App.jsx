import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Templates from './pages/Templates';
import Auth from './pages/Auth';
import About from './pages/About';
import './App.css';

function Layout({ children, hideFooter = false }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ResumeProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/builder"
              element={
                <>
                  <Navbar />
                  <Builder />
                </>
              }
            />
            <Route
              path="/templates"
              element={
                <Layout>
                  <Templates />
                </Layout>
              }
            />
            <Route
              path="/auth"
              element={
                <>
                  <Navbar />
                  <Auth />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <Layout>
                  <About />
                </Layout>
              }
            />
            {/* 404 */}
            <Route
              path="*"
              element={
                <Layout>
                  <div style={{
                    minHeight: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    fontFamily: 'var(--font-heading)',
                  }}>
                    <div style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--gray-200)', lineHeight: 1 }}>
                      404
                    </div>
                    <h1 style={{ color: 'var(--gray-800)', fontSize: '1.5rem' }}>Page not found</h1>
                    <a href="/" className="btn btn-primary">Go Home</a>
                  </div>
                </Layout>
              }
            />
          </Routes>
        </ResumeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
