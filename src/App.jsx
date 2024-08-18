import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components';
import { navigation } from './globalEnv';
import { LoginPage, NotFound, SingleTask, UserPage } from './pages';

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ['/', '/404'];

  const isHideHeaderRoute = hideHeaderRoutes.includes(location.pathname);

  return (
    <>  
      {!isHideHeaderRoute && <Header />}
      <Routes>
        {navigation.map((item) => (
          <Route key={item.name} path={item.href} element={<item.component />} />
        ))}
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<UserPage />} />
        <Route path="/task/:uuid" element={<SingleTask />} />
        <Route path="/subtask/:uuid" element={<SingleTask />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
