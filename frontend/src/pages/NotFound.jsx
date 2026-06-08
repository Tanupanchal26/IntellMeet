import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';

const NotFound = () => (
  <section className="not-found">
    <h1 className="not-found__code">404</h1>
    <p className="not-found__message">Oops! Page not found.</p>
    <Link to={ROUTES.HOME} className="btn btn--primary">
      Back to Home
    </Link>
  </section>
);

export default NotFound;
