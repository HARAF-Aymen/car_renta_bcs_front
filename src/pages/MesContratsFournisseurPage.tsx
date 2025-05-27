    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import MainLayout from "../layouts/MainLayout";
    import useAuthGuard from "../hooks/useAuthGuard";
    import { Download } from "lucide-react";

    // interface Contrat {
    // id: number;
    // vehicule_id: number;
    // vehicule_modele: string;
    // utilisateur_id: number;
    // utilisateur_nom: string;
    // date_debut: string;
    // date_fin: string;
    // statut: string;
    // date_signature: string;
    // }

    interface Contrat {
        id: number;
        vehicule: {
        id: number;
        modele: string;
        };
        utilisateur: {
        id: number;
        nom: string;
        };
        date_debut: string;
        date_fin: string;
        statut: string;
        date_signature: string;
    }
    
    const MesContratsFournisseurPage = () => {
    useAuthGuard();
    const [contrats, setContrats] = useState<Contrat[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchContrats = async () => {
        const token = localStorage.getItem("token");
        try {
        const res = await axios.get("http://localhost:5000/api/contrats/", {
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
        const token = localStorage.getItem("token");
        try {
        const res = await axios.get(
            `http://localhost:5000/api/contrats/${id}/pdf-fournisseur`,
            {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
            responseType: "blob",
            }
        );

        const blob = new Blob([res.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `contrat_fournisseur_${id}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
        } catch (err) {
        alert("Erreur lors du téléchargement du PDF");
        }
    };

    const getStatutBadge = (statut: string) => {
        const base = "inline-block px-2 py-1 text-xs font-semibold rounded-full";
        return statut === "TERMINE" ? (
        <span className={`${base} bg-green-100 text-green-700`}> Terminé</span>
        ) : (
        <span className={`${base} bg-yellow-100 text-yellow-700`}>
            En cours
        </span>
        );
    };

    useEffect(() => {
        fetchContrats();
    }, []);

    return (
        <MainLayout>
        <div className="pt-4 px-4">
            <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
                Mes Contrats de Location (Fournisseur)
            </h1>
            <p className="text-gray-500 mt-1">
                Liste des contrats liés à vos véhicules
            </p>
            </div>

            {loading ? (
            <p className="text-center text-gray-500">Chargement...</p>
            ) : contrats.length === 0 ? (
            <p className="text-center text-gray-500">
                Aucun contrat lié à vos véhicules.
            </p>
            ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200 max-w-6xl mx-auto">
                <table className="min-w-full divide-y divide-gray-100 text-sm text-gray-700">
                <thead className="bg-gray-50 text-gray-600 text-left">
                    <tr>
                    <th className="px-6 py-3">Véhicule</th>
                    <th className="px-6 py-3">Utilisateur</th>
                    <th className="px-6 py-3">Période</th>
                    <th className="px-6 py-3">Statut</th>
                    <th className="px-6 py-3">Signé le</th>
                    <th className="px-6 py-3">PDF</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {contrats.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50">
                        {/* <td className="px-6 py-4">
                        {c.vehicule_modele || `ID ${c.vehicule_id}`}
                        </td>
                        <td className="px-6 py-4">
                        {c.utilisateur_nom || `ID ${c.utilisateur_id}`}
                        </td>
                        <td className="px-6 py-4">
                        {c.date_debut} → {c.date_fin}
                        </td> */}
                        <td className="px-6 py-4">
                        {c.vehicule?.modele || `ID ${c.vehicule?.id}`}
                        </td>
                        <td className="px-6 py-4">
                        {c.utilisateur?.nom || `ID ${c.utilisateur?.id}`}
                        </td>

                        <td className="px-6 py-4">{getStatutBadge(c.statut)}</td>
                        <td className="px-6 py-4">{c.date_signature}</td>
                        <td className="px-6 py-4">
                        <button
                            onClick={() => downloadPdf(c.id)}
                            className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                        >
                            <Download size={16} /> Télécharger
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </div>
        </MainLayout>
    );
    };

    export default MesContratsFournisseurPage;
