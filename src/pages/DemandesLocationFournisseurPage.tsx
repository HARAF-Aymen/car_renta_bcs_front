    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import MainLayout from '../layouts/MainLayout';

    interface Demande {
    id: number;
    mission_id: number;
    vehicule_id: number;
    statut: string;
    date_reception: string;
    }

    const DemandesRecuesFournisseur = () => {
    const [demandes, setDemandes] = useState<Demande[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDemandes = async () => {
        const token = localStorage.getItem('token');
        try {
        const res = await axios.get('http://localhost:5000/api/locations/recues', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        setDemandes(res.data);
        } catch (err) {
        alert('Erreur lors du chargement des demandes');
        } finally {
        setLoading(false);
        }
    };

    const prendreDecision = async (id: number, decision: 'ACCEPTEE' | 'REFUSEE') => {
        const token = localStorage.getItem('token');
        try {
        await axios.put(`http://localhost:5000/api/locations/${id}/decision`, { decision }, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });

        

        fetchDemandes(); // refresh
        } catch (err) {
        alert('Erreur lors de la décision');
        }
    };

    useEffect(() => {
        fetchDemandes();
    }, []);

    return (
        <MainLayout>
        <h1 className="text-2xl font-bold mb-4">Demandes de location reçues</h1>
        {loading ? (
            <p>Chargement...</p>
        ) : demandes.length === 0 ? (
            <p className="text-gray-600">Aucune demande pour le moment.</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demandes.map((d) => (
                <div key={d.id} className="border rounded p-4 shadow bg-white">
                <p><strong>ID Mission :</strong> {d.mission_id}</p>
                <p><strong>Véhicule :</strong> {d.vehicule_id}</p>
                <p><strong>Statut :</strong> {d.statut}</p>
                <p><strong>Date :</strong> {d.date_reception}</p>

                {d.statut === 'EN_ATTENTE' && (
                    <div className="flex gap-2 mt-3">
                    <button
                        onClick={() => prendreDecision(d.id, 'ACCEPTEE')}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                        Accepter
                    </button>
                    <button
                        onClick={() => prendreDecision(d.id, 'REFUSEE')}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                        Refuser
                    </button>
                    </div>
                )}
                </div>
            ))}
            </div>
        )}
        </MainLayout>
    );
    };

    export default DemandesRecuesFournisseur;
        