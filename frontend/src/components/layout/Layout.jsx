import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';

const Layout = () => (
  <div className="app-shell">
    <Navbar />
    <main className="main-content">
      <Outlet />
    </main>
    <footer className="footer">
      <p>© {new Date().getFullYear()} IntelMeet. All rights reserved.</p>
    </footer>
  </div>
);

export default Layout;
