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

    const MesContratsFournisseurPage = () => {
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
        console.error("Erreur chargement contrats", err);
        } finally {
        setLoading(false);
        }
    };

    const downloadPdf = async (id: number) => {
        const token = localStorage.getItem('token');
        try {
        const res = await axios.get(`http://localhost:5000/api/contrats/${id}/pdf-fournisseur`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
            responseType: 'blob',
        });

        const blob = new Blob([res.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `contrat_fournisseur_${id}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
        } catch (err) {
        alert("Erreur lors du téléchargement du PDF");
        }
    };

    useEffect(() => {
        fetchContrats();
    }, []);

    return (
        <MainLayout>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Mes Contrats de Location (Fournisseur)</h1>

        {loading ? (
            <p>Chargement...</p>
        ) : contrats.length === 0 ? (
            <p className="text-gray-500">Aucun contrat lié à vos véhicules.</p>
        ) : (
            <div className="overflow-x-auto bg-white rounded shadow border border-gray-100">
            <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium">
                <tr>
                    <th className="px-4 py-2">Véhicule</th>
                    <th className="px-4 py-2">Utilisateur</th>
                    <th className="px-4 py-2">Période</th>
                    <th className="px-4 py-2">Statut</th>
                    <th className="px-4 py-2">Signé le</th>
                    <th className="px-4 py-2">PDF</th>
                </tr>
                </thead>
                <tbody>
                {contrats.map((c) => (
                    <tr key={c.id} className="border-t">
                    <td className="px-4 py-2">{c.vehicule_id}</td>
                    <td className="px-4 py-2">{c.utilisateur_id}</td>
                    <td className="px-4 py-2">{c.date_debut} → {c.date_fin}</td>
                    <td className="px-4 py-2">
                        <span className={c.statut === 'TERMINE' ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'}>
                        {c.statut}
                        </span>
                    </td>
                    <td className="px-4 py-2">{c.date_signature}</td>
                    <td className="px-4 py-2">
                        <button
                        onClick={() => downloadPdf(c.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                        Télécharger
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </MainLayout>
    );
    };

    export default MesContratsFournisseurPage;
