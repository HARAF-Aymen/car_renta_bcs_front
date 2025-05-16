    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import MainLayout from '../layouts/MainLayout';

    interface Mission {
    id: number;
    vehicule_id: number;
    user_id: number;
    date_debut: string;
    date_fin: string;
    created_at: string;
    }

    const ContractAssignmentPage = () => {
    const [missions, setMissions] = useState<Mission[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchApprovedMissions = async () => {
        const token = localStorage.getItem('token');
        try {
        const res = await axios.get('http://localhost:5000/api/missions/approved_without_contract', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        setMissions(res.data);
        } catch (err) {
        console.error('Erreur lors du chargement des missions approuvées', err);
        } finally {
        setLoading(false);
        }
    };

    const handleGenerateContract = async (mission: Mission) => {
        const token = localStorage.getItem('token');
        try {
        await axios.post(
            'http://localhost:5000/api/contrats',
            {
            mission_id: mission.id,
            vehicule_id: mission.vehicule_id,
            },
            {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
            }
        );
        alert('Contrat généré avec succès');
        fetchApprovedMissions(); // Refresh
        } catch (err) {
        alert("Échec de la génération du contrat");
        console.error(err);
        }
    };

    useEffect(() => {
        fetchApprovedMissions();
    }, []);

    return (
        <MainLayout>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Missions Approuvées - Générer Contrats</h1>

        {loading ? (
            <p>Chargement...</p>
        ) : missions.length === 0 ? (
            <p className="text-gray-500">Aucune mission approuvée sans contrat.</p>
        ) : (
            <table className="min-w-full bg-white border border-gray-200 rounded shadow text-sm">
            <thead className="bg-gray-100 text-gray-600">
                <tr>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Véhicule ID</th>
                <th className="px-4 py-2">Date début</th>
                <th className="px-4 py-2">Date fin</th>
                <th className="px-4 py-2">Créée le</th>
                <th className="px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody>
                {missions.map((mission) => (
                <tr key={mission.id} className="border-t">
                    <td className="px-4 py-2">{mission.user_id}</td>
                    <td className="px-4 py-2">{mission.vehicule_id}</td>
                    <td className="px-4 py-2">{mission.date_debut}</td>
                    <td className="px-4 py-2">{mission.date_fin}</td>
                    <td className="px-4 py-2">{mission.created_at}</td>
                    <td className="px-4 py-2">
                    <button
                        onClick={() => handleGenerateContract(mission)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                        Générer Contrat
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </MainLayout>
    );
    };

    export default ContractAssignmentPage;
