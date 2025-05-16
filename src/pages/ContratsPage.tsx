    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import MainLayout from '../layouts/MainLayout';

    interface Contrat {
    id: number;
    vehicule_id: number;
    utilisateur_id: number;
    date_debut: string;
    date_fin: string;
    statut: string;
    date_signature: string;
    }

    const ContratsPage = () => {
    const [contrats, setContrats] = useState<Contrat[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchContrats = async () => {
        const token = localStorage.getItem('token');
        try {
        const res = await axios.get('http://localhost:5000/api/contrats/', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        setContrats(res.data);
        } catch (err) {
        console.error('Erreur lors du chargement des contrats', err);
        } finally {
        setLoading(false);
        }
    };

    const handleDownloadPDF = async (contratId: number) => {
        const token = localStorage.getItem('token');
        try {
        const response = await axios.get(`http://localhost:5000/api/contrats/${contratId}/pdf`, {
            headers: { Authorization: `Bearer ${token}` },
            responseType: 'blob',
            withCredentials: true,
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `contrat_${contratId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        } catch (error) {
        console.error('Erreur lors du téléchargement du PDF', error);
        alert('Échec du téléchargement du contrat.');
        }
    };

    useEffect(() => {
        fetchContrats();
    }, []);

    return (
        <MainLayout>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Liste des Contrats</h1>

        {loading ? (
            <p>Chargement...</p>
        ) : contrats.length === 0 ? (
            <p className="text-gray-500">Aucun contrat trouvé.</p>
        ) : (
            <table className="min-w-full bg-white border border-gray-200 rounded shadow text-sm">
            <thead className="bg-gray-100 text-gray-600">
                <tr>
                <th className="px-4 py-2">Contrat ID</th>
                <th className="px-4 py-2">Utilisateur</th>
                <th className="px-4 py-2">Véhicule</th>
                <th className="px-4 py-2">Début</th>
                <th className="px-4 py-2">Fin</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Signé le</th>
                <th className="px-4 py-2">PDF</th>
                </tr>
            </thead>
            <tbody>
                {contrats.map((c) => (
                <tr key={c.id} className="border-t">
                    <td className="px-4 py-2">{c.id}</td>
                    <td className="px-4 py-2">{c.utilisateur_id}</td>
                    <td className="px-4 py-2">{c.vehicule_id}</td>
                    <td className="px-4 py-2">{c.date_debut}</td>
                    <td className="px-4 py-2">{c.date_fin}</td>
                    <td className="px-4 py-2">{c.statut}</td>
                    <td className="px-4 py-2">{c.date_signature}</td>
                    <td className="px-4 py-2">
                    <button
                        onClick={() => handleDownloadPDF(c.id)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded"
                    >
                        Télécharger PDF
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

    export default ContratsPage;
