import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setCredentials } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import { ROUTES, STORAGE_KEYS } from '../constants';

const GoogleAuthSuccess = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const handled  = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const token = params.get('token');

    if (!token) {
      toast.error('Google sign-in failed.');
      navigate(ROUTES.LOGIN, { replace: true });
      return;
    }

    const user = {
      id:         params.get('id')         || '',
      name:       params.get('name')       || '',
      email:      params.get('email')      || '',
      avatar:     params.get('avatar')     || '',
      role:       params.get('role')       || 'employee',
      isVerified: params.get('isVerified') === 'true',
    };

    // 1. Save to localStorage
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    localStorage.setItem('im_user', JSON.stringify(user));

    // 2. Save to Redux
    dispatch(setCredentials({ user, accessToken: token }));

    // 3. Done
    toast.success(`Welcome, ${user.name || 'back'}! 🎉`);
    navigate(ROUTES.DASHBOARD, { replace: true });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#07070C] gap-4">
      <div className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      <p className="text-sm text-[#64748B]">Signing you in with Google...</p>
    </div>
  );
};

export default GoogleAuthSuccess;
