    import { useState, useContext } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { login } from '../../services/authService';
    import { AuthContext } from '../../context/AuthContext';

    const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { setRole } = useContext(AuthContext); // ✅ utiliser le contexte réel

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const res = await login(email, password);
        console.log("Réponse backend : ", res);

        localStorage.setItem('token', res.access_token);
        localStorage.setItem('role', res.role);
        setRole(res.role); // ✅ ici le vrai setter

        // Redirection selon le rôle
        if (res.role === 'FLEET_ADMIN') navigate('/dashboard');
        else if (res.role === 'FOURNISSEUR') navigate('/mes-vehicles-fournisseur');
        else navigate('/vehicules-disponibles');
        } catch (error) {
        alert('Login failed. Please check credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-purple-200">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-96">
            <h2 className="text-2xl font-bold text-center mb-6">Se connecter</h2>
            <input
            type="email"
            placeholder="Adresse email"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-2 border rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
            Connexion
            </button>
            <p className="text-center text-sm mt-4">
            Pas de compte ? <a href="/register" className="text-blue-600 underline">Inscrivez-vous</a>
            </p>
        </form>
        </div>
    );
    };

    export default LoginPage;
