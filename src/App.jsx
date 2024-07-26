import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { Dashboard, Projects, WorkPlace, Tasks } from './pages';

function App() {


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workplace" element={<WorkPlace />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export default App;
