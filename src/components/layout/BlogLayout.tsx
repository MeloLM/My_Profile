/**
 * 📝 BlogLayout Component
 */
'use client';

import NavBar from './Navbar';
import Footer from './Footer';
import ScrollProgressBar from '../common/ScrollProgressBar';
import BackToTop from '../common/BackToTop';
import WhatsAppFloat from '../common/WhatsAppFloat';
import '../../App.css';
import '../../styles/global.css';
import '../../styles/components/index.css';
import './BlogLayout.css';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgressBar />
      <BackToTop />
      <WhatsAppFloat />
      <NavBar />
      <main className="blog-main" id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}
