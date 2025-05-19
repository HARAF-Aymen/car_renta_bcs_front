    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import MainLayout from '../layouts/MainLayout';

    interface Mission {
    id: number;
    vehicule_id: number;
    date_debut: string;
    date_fin: string;
    status: string;
    motif: string;
    created_at: string;
    }

    const MesMissionsPage = () => {
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

    return (
        <MainLayout>
        <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Mes Demandes de Mission</h1>
        </div>

        {loading ? (
            <p>Chargement...</p>
        ) : missions.length === 0 ? (
            <p className="text-gray-500">Aucune demande de mission trouvée.</p>
        ) : (
            <div className="overflow-x-auto bg-white rounded shadow border border-gray-100">
            <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium">
                <tr>
                    <th className="px-4 py-2">Motif</th>
                    <th className="px-4 py-2">ID Véhicule</th>
                    <th className="px-4 py-2">Date début</th>
                    <th className="px-4 py-2">Date fin</th>
                    <th className="px-4 py-2">Statut</th>
                    <th className="px-4 py-2">Créée le</th>
                </tr>
                </thead>
                <tbody>
                {missions.map((m) => (
                    <tr key={m.id} className="border-t">
                    <td className="px-4 py-2">{m.motif}</td>
                    <td className="px-4 py-2">{m.vehicule_id}</td>
                    <td className="px-4 py-2">{m.date_debut}</td>
                    <td className="px-4 py-2">{m.date_fin}</td>
                    <td className="px-4 py-2">
                        <span
                        className={
                            m.status === 'APPROUVEE'
                            ? 'text-green-600 font-semibold'
                            : m.status === 'REFUSEE'
                            ? 'text-red-600 font-semibold'
                            : 'text-yellow-600 font-semibold'
                        }
                        >
                        {m.status}
                        </span>
                    </td>
                    <td className="px-4 py-2">{m.created_at}</td>
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
