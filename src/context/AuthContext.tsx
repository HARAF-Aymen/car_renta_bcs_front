    import { createContext, useEffect, useState } from 'react';

    interface AuthContextType {
    role: string | null;
    setRole: (role: string | null) => void;
    }

    export const AuthContext = createContext<AuthContextType>({
    role: null,
    setRole: () => {},
    });

    export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [role, setRole] = useState<string | null>(localStorage.getItem('role'));

    useEffect(() => {
        setRole(localStorage.getItem('role'));
    }, []);

    return (
        <AuthContext.Provider value={{ role, setRole }}>
        {children}
        </AuthContext.Provider>
    );
    };
