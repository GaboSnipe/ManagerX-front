import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components';
import { navigation } from './globalEnv';
import { LoginPage, NotFound, SingleTask, SettingsPage, NotificationsList, SingleSubTask } from './pages';
import { ToastContainer } from 'react-toastify';
import { Blocks } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { checkAuth } from './features/auth/loginThunk';

function PrivateRoute({ children, withLoader = true }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const isAuthorized = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    const verifyAuth = async () => {
      await dispatch(checkAuth());
      setLoading(false);
    };

    verifyAuth();
  }, [dispatch]);

  if (loading && withLoader) {
    return (
      <div className="flex justify-center items-center w-full h-96">
        <Blocks
          height="40"
          width="40"
          color="#630044"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        />
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ['/', '/404'];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && (
        <PrivateRoute withLoader={false}>
          <Header />
        </PrivateRoute>
      )}

      <Routes>
        <Route path="/" element={<LoginPage />} />

        {navigation.map((item) => (
          <Route key={item.name} path={item.href} element={
            <PrivateRoute>
              <item.component />
            </PrivateRoute>
          } />
        ))}

        <Route path="/settings" element={
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        } />

        <Route path="/notifications" element={
          <PrivateRoute>
            <NotificationsList />
          </PrivateRoute>
        } />

        <Route path="/subtask/:uuid" element={
          <PrivateRoute>
            <SingleSubTask />
          </PrivateRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        draggable
        pauseOnFocusLoss={false}
        pauseOnHover
        containerId="error"
      />
      <ToastContainer
        position="bottom-right"
        closeButton={false}
        stacked
        containerId="notification"
      />
    </>
  );
}

export default App;
