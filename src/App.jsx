import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components';
import { navigation } from './globalEnv';
import { LoginPage } from './pages';

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ['/'];


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
