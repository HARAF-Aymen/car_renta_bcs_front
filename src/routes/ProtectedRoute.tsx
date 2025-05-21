    import React from 'react'; // ✅ Required for type declarations
import { Navigate } from 'react-router-dom';

    interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[]; 
    }

    const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role || '')) {
        if (role === 'FOURNISSEUR') return <Navigate to="/contracts" replace />;
        if (role === 'FLEET_ADMIN') return <Navigate to="/dashboard" replace />;
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
    };

    export default ProtectedRoute;
