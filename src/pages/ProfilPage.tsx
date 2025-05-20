    import React, { useEffect, useState } from 'react';
    import MainLayout from '../layouts/MainLayout';
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom';

    interface Profil {
    nom: string;
    email: string;
    role: string;
    }

    const ProfilPage = () => {
    const [profil, setProfil] = useState<Profil | null>(null);
    const navigate = useNavigate();

    const fetchProfil = async () => {
        const token = localStorage.getItem('token');
        try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        setProfil(res.data);
        } catch (err) {
        console.error('Erreur récupération du profil', err);
        }
    };

    useEffect(() => {
        fetchProfil();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <MainLayout>
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Profil utilisateur</h2>
            {profil ? (
            <div className="space-y-2">
                <p><strong>Nom :</strong> {profil.nom}</p>
                <p><strong>Email :</strong> {profil.email}</p>
                <p><strong>Rôle :</strong> {profil.role}</p>
                <button
                onClick={handleLogout}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                Se déconnecter
                </button>
            </div>
            ) : (
            <p>Chargement du profil...</p>
            )}
        </div>
        </MainLayout>
    );
    };

    export default ProfilPage;
