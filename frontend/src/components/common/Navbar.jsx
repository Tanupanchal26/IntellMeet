import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

const Navbar = () => (
  <header className="navbar">
    <Link to={ROUTES.HOME} className="navbar__brand">
      IntelMeet
    </Link>
    <nav className="navbar__links">
      <Link to={ROUTES.HOME}>Home</Link>
    </nav>
  </header>
);

export default Navbar;
