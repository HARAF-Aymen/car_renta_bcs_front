    import { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { register } from '../../services/authService';

    const RegisterPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        await register(formData);
        navigate('/login');
        } catch (error) {
        alert('Erreur lors de l’inscription');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-200 to-blue-100">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-96">
            <h2 className="text-2xl font-bold text-center mb-6">Créer un compte</h2>
            <input
            type="text"
            placeholder="Nom complet"
            className="w-full p-2 border rounded mb-4"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            />
            <input
            type="email"
            placeholder="Adresse email"
            className="w-full p-2 border rounded mb-4"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            />
            <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-2 border rounded mb-4"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            />
            <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
            >
            S'inscrire
            </button>
            <p className="text-center text-sm mt-4">
            Déjà inscrit ? <a href="/login" className="text-purple-600 underline">Se connecter</a>
            </p>
        </form>
        </div>
    );
    };

    export default RegisterPage;
