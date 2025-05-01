
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import CreateQuiz from './pages/CreateQuiz';
import Results from './pages/Results';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/create-quiz" element={<PrivateRoute><CreateQuiz /></PrivateRoute>} />
          <Route path="/quiz/:id" element={<PrivateRoute><Quiz /></PrivateRoute>} />
          <Route path="/results/:id" element={<PrivateRoute><Results /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;