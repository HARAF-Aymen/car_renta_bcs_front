    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import MainLayout from '../layouts/MainLayout';
    import useAuthGuard from '../hooks/useAuthGuard';

    interface Mission {
        id: number;
        vehicule_id: number;
        vehicule_modele: string; // ✅ nouveau champ
        date_debut: string;
        date_fin: string;
        status: string;
        motif: string;
        created_at: string;
    }
    

    const MesMissionsPage = () => {
    useAuthGuard();
    const [missions, setMissions] = useState<Mission[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMissions = async () => {
        const token = localStorage.getItem('token');
        try {
        const res = await axios.get('http://localhost:5000/api/missions/mes', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        setMissions(res.data);
        } catch (error) {
        console.error("Erreur chargement missions :", error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchMissions();
    }, []);

    const getStatusBadge = (status: string) => {
        const base = "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold";
        switch (status) {
        case 'APPROUVEE':
            return <span className={`${base} bg-green-100 text-green-700`}>🟢 Approuvée</span>;
        case 'REFUSEE':
            return <span className={`${base} bg-red-100 text-red-700`}>🔴 Refusée</span>;
        default:
            return <span className={`${base} bg-yellow-100 text-yellow-700`}>🟡 En attente</span>;
        }
    };

    return (
        <MainLayout>
        <div className="flex flex-col items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2"> Mes Demandes de Mission</h1>
            <p className="text-gray-500">Liste de toutes vos demandes effectuées</p>
        </div>

        {loading ? (
            <div className="text-center text-gray-500">Chargement...</div>
        ) : missions.length === 0 ? (
            <div className="text-center text-gray-500">Aucune demande de mission trouvée.</div>
        ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200 mx-auto w-full max-w-5xl">
            <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                    <th className="px-6 py-3 text-left">Motif</th>
                    <th className="px-6 py-3 text-left">Modèle Véhicule</th>
                    <th className="px-6 py-3 text-left">Date début</th>
                    <th className="px-6 py-3 text-left">Date fin</th>
                    <th className="px-6 py-3 text-left">Statut</th>
                    <th className="px-6 py-3 text-left">Créée le</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {missions.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{m.motif}</td>
                    <td className="px-6 py-4">{m.vehicule_modele}</td>
                    <td className="px-6 py-4">{m.date_debut}</td>
                    <td className="px-6 py-4">{m.date_fin}</td>
                    <td className="px-6 py-4">{getStatusBadge(m.status)}</td>
                    <td className="px-6 py-4">{m.created_at}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </MainLayout>
    );
    };

    export default MesMissionsPage;
