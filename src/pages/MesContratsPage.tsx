    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import MainLayout from "../layouts/MainLayout";
    import useAuthGuard from "../hooks/useAuthGuard";

    interface Contrat {
    id: number;
    vehicule_id: number;
    vehicule_modele: string;
    date_debut: string;
    date_fin: string;
    statut: string;
    date_signature: string;
    }

    const MesContratsPage = () => {
    useAuthGuard();
    const [contrats, setContrats] = useState<Contrat[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchContrats = async () => {
        const token = localStorage.getItem("token");
        try {
        const res = await axios.get("http://localhost:5000/api/contrats/mes", {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        setContrats(res.data);
        } catch (err) {
        console.error("Erreur lors du chargement des contrats", err);
        } finally {
        setLoading(false);
        }
    };

    const downloadPDF = async (id: number) => {
        const token = localStorage.getItem("token");
        try {
        const res = await axios.get(
            `http://localhost:5000/api/contrats/${id}/pdf`,
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
        link.download = `contrat_${id}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
        } catch (err) {
        alert("Erreur lors du téléchargement du PDF");
        }
    };

    useEffect(() => {
        fetchContrats();
    }, []);

    const getStatutBadge = (statut: string) => {
        const base =
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold";
        return statut === "TERMINE" ? (
        <span className={`${base} bg-emerald-100 text-emerald-700`}>
            ✅ Terminé
        </span>
        ) : (
        <span className={`${base} bg-yellow-100 text-yellow-800`}>
            ⏳ En cours
        </span>
        );
    };

    return (
        <MainLayout>
        <div className="flex flex-col items-center mb-8 mt-6 px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Mes Contrats de Location
            </h1>
            <p className="text-gray-500 text-sm">
            Consultez vos contrats signés et téléchargez-les
            </p>
        </div>

        {loading ? (
            <div className="text-center text-gray-500">Chargement...</div>
        ) : contrats.length === 0 ? (
            <div className="text-center text-gray-500">Aucun contrat trouvé.</div>
        ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100 mx-auto w-full max-w-6xl">
            <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-50 border-b text-xs text-gray-500 uppercase tracking-wider">
                <tr>
                    <th className="px-6 py-3 text-left">Modèle</th>
                    <th className="px-6 py-3 text-left">Début</th>
                    <th className="px-6 py-3 text-left">Fin</th>
                    <th className="px-6 py-3 text-left">Statut</th>
                    <th className="px-6 py-3 text-left">Signé le</th>
                    <th className="px-6 py-3 text-left">Téléchargement</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {contrats.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{c.vehicule_modele}</td>
                    <td className="px-6 py-4">{c.date_debut}</td>
                    <td className="px-6 py-4">{c.date_fin}</td>
                    <td className="px-6 py-4">{getStatutBadge(c.statut)}</td>
                    <td className="px-6 py-4">{c.date_signature}</td>
                    <td className="px-6 py-4">
                        <button
                        onClick={() => downloadPDF(c.id)}
                        className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm"
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

    export default MesContratsPage;
