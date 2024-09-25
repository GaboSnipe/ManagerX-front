import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components';
import { navigation } from './globalEnv';
import { LoginPage, NotFound, SingleTask, SettingsPage } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const location = useLocation();
  const hideHeaderRoutes = ['/login', '/404'];

  const isHideHeaderRoute = hideHeaderRoutes.includes(location.pathname);

  return (
    <>  
      {!isHideHeaderRoute && <Header />}
      <Routes>
        {navigation.map((item) => (
          <Route key={item.name} path={item.href} element={<item.component />} />
        ))}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* <Route path="/task/:uuid" element={<SingleTask />} /> */}
        {/* <Route path="/subtask/:uuid" element={<SingleTask />} /> */}
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
