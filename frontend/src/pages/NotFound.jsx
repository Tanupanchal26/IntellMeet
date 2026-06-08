import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../constants';
import Button from '../components/ui/Button';

const NotFound = () => (
  <section className="not-found">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
    >
      <div className="not-found__code">404</div>
      <h2 className="not-found__title">Page not found</h2>
      <p className="not-found__message">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to={ROUTES.HOME}>
        <Button variant="primary" size="lg">Back to Home</Button>
      </Link>
    </motion.div>
  </section>
);

export default NotFound;
