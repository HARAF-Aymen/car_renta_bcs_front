
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import VehiclesPage from './pages/VehiclesPage';
import MissionsPage from './pages/MissionsPage';
import ContratsPage from './pages/ContratsPage';
import AvailableVehiclesPage from './pages/AvailableVehiclesPage';
import MesMissionsPage from './pages/MesMissionsPage';
import MesContratsPage from './pages/MesContratsPage';
import MesContratsFournisseurPage from './pages/MesContratsFournisseurPage';
import MesVehiculesPage from './pages/MesVehiculesPage';
import ProfilPage from './pages/ProfilPage';
import DemandesRecuesFournisseur from './pages/DemandesLocationFournisseurPage';
import DemandesAccepteesPage from './pages/DemandesAccepteesPage';

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

      <Route
        path="/vehicles"
        element={
          <ProtectedRoute allowedRoles={['FLEET_ADMIN', 'FOURNISSEUR']}>
            <VehiclesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/missions"
        element={
          <ProtectedRoute allowedRoles={['FLEET_ADMIN']}>
            <MissionsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contracts"
        element={
          <ProtectedRoute allowedRoles={['FLEET_ADMIN']}>
            <ContratsPage />
          </ProtectedRoute>
        }
      />

      <Route 
        path='/vehicules-disponibles'
        element={
          <ProtectedRoute allowedRoles={['USER']}>
            <AvailableVehiclesPage />
          </ProtectedRoute>
        }
      
      />

      <Route 
        path='/mes-missions'
        element={
          <ProtectedRoute allowedRoles={['USER']}>
            <MesMissionsPage />
          </ProtectedRoute>
        }
      
      />

      <Route 
        path='/mes-contrats'
        element={
          <ProtectedRoute allowedRoles={['USER']}>
            <MesContratsPage />
          </ProtectedRoute>
        }
      
      />

      <Route 
        path='/mes-contrats-fournisseur'
        element={
          <ProtectedRoute allowedRoles={['FOURNISSEUR']}>
            <MesContratsFournisseurPage />
          </ProtectedRoute>
        }
      
      />

      <Route 
        path='/mes-vehicles-fournisseur'
        element={
          <ProtectedRoute allowedRoles={['FOURNISSEUR']}>
            <MesVehiculesPage />
          </ProtectedRoute>
        }
      
      />

      <Route
        path="/profil"
        element={
          <ProtectedRoute allowedRoles={['USER', 'FLEET_ADMIN', 'FOURNISSEUR']}>
            <ProfilPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/demandes-locations-reçues"
        element={
          <ProtectedRoute allowedRoles={['FOURNISSEUR']}>
            <DemandesRecuesFournisseur />
          </ProtectedRoute>
        }
      />

      <Route
        path="/missions-approuvees"
        element={
          <ProtectedRoute allowedRoles={['FLEET_ADMIN']}>
            <DemandesAccepteesPage />
          </ProtectedRoute>
        }
      />




      {/* More protected routes can be added here for Fournisseur, User, etc. */}
    </Routes>
  );
};

export default App;
