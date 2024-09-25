import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '../../features/auth/loginThunk';

const useAuthCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    const checkAuthentication = async () => {
      await dispatch(checkAuth());
      setLoading(false);
    };
    checkAuthentication();
  }, [dispatch]);

  useEffect(() => {
    if (!loading && !isAuth) {
      navigate('/login');
    }
  }, [navigate]);

  return loading;
};

export default useAuthCheck;
