// import { Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/auth/LoginPage';
// import RegisterPage from './pages/auth/RegisterPage';
// import Dashboard from './pages/Dashboard';

// const App = () => (
//   <Routes>
//     <Route path="/login" element={<LoginPage />} />
//     <Route path="/register" element={<RegisterPage />} />
//     <Route path="/dashboard" element={<Dashboard />} />
//   </Routes>
// );

// export default App;
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Route for Fleet Admin */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['FLEET_ADMIN']}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* More protected routes can be added here for Fournisseur, User, etc. */}
    </Routes>
  );
};

export default App;
