import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import './styles/global.css';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#111827',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 16px rgba(109,40,217,0.10)',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '0.9rem',
          },
        }}
      />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
