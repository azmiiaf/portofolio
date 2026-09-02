import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  return (
    <>
      <a
        href="#main-content"
        className="absolute -top-24 left-4 z-[999] rounded-sm bg-accent px-4 py-2 font-semibold text-bg transition-[top] duration-200 focus:top-4 focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
      <Footer />
    </>
  );
}
