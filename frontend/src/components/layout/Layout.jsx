import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';

const Layout = () => (
  <div className="app-shell">
    <Navbar />
    <main className="main-content">
      <Outlet />
    </main>
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__brand">IntelMeet</div>
          <div className="footer__brand-tagline">Smart meetings, real-time collaboration.</div>
        </div>
        <nav className="footer__links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </nav>
      </div>
      <div className="footer__bottom">
        © {new Date().getFullYear()} IntelMeet. All rights reserved.
      </div>
    </footer>
  </div>
);

export default Layout;
