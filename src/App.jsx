import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components';
import { navigation } from './globalEnv';
import { LoginPage } from './pages';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from './features/auth/loginThunk';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const hideHeaderRoutes = ['/'];

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        {navigation.map((item) => (
          <Route key={item.name} path={item.href} element={<item.component />} />
        ))}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
