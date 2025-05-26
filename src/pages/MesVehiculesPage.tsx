    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import MainLayout from '../layouts/MainLayout';
    import AjouterVehiculeModal from './AjouterVehiculeModal';
    import ModifierVehiculeModal from './ModifierVehiculeModal';
    import useAuthGuard from '../hooks/useAuthGuard';
    import { PlusCircle, Download } from 'lucide-react';

    interface Vehicule {
    id: number;
    marque: string;
    modele: string;
    carburant: string;
    kilometrage: number;
    prix_jour: number;
    image_path: string;
    is_assigned: boolean;
    }

    const MesVehiculesPage = () => {
    useAuthGuard();
    const [vehicules, setVehicules] = useState<Vehicule[]>([]);
    const [filteredVehicules, setFilteredVehicules] = useState<Vehicule[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [vehiculeAModifier, setVehiculeAModifier] = useState<Vehicule | null>(null);
    const [search, setSearch] = useState('');

    const fetchVehicules = async () => {
        const token = localStorage.getItem('token');
        try {
        const res = await axios.get('http://localhost:5000/api/vehicules/', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        setVehicules(res.data);
        setFilteredVehicules(res.data);
        } catch (err) {
        console.error("Erreur lors du chargement des véhicules :", err);
        } finally {
        setLoading(false);
        }
    };

    const supprimerVehicule = async (id: number) => {
        const confirmation = window.confirm("Voulez-vous vraiment supprimer ce véhicule ?");
        if (!confirmation) return;

        const token = localStorage.getItem('token');
        try {
        await axios.delete(`http://localhost:5000/api/vehicules/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        const updated = vehicules.filter((v) => v.id !== id);
        setVehicules(updated);
        setFilteredVehicules(applySearch(updated, search));
        } catch (err) {
        alert("Erreur lors de la suppression.");
        }
    };

    const applySearch = (list: Vehicule[], query: string) => {
        return list.filter(
        (v) =>
            v.marque.toLowerCase().includes(query.toLowerCase()) ||
            v.modele.toLowerCase().includes(query.toLowerCase()) ||
            v.carburant.toLowerCase().includes(query.toLowerCase())
        );
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearch(query);
        setFilteredVehicules(applySearch(vehicules, query));
    };

    const exportToCSV = () => {
        const headers = ["ID", "Marque", "Modèle", "Carburant", "Kilométrage", "Prix / Jour", "Statut"];
        const rows = filteredVehicules.map((v) => [
        v.id,
        v.marque,
        v.modele,
        v.carburant,
        v.kilometrage,
        v.prix_jour,
        v.is_assigned ? "Assigné" : "Disponible"
        ]);

        const csvContent =
        "data:text/csv;charset=utf-8," +
        [headers, ...rows].map((e) => e.join(";")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "vehicules.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getStatusBadge = (assigned: boolean) => (
        <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold rounded-full 
        ${assigned ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
        {assigned ? '🔒 Assigné' : '✅ Disponible'}
        </span>
    );

    useEffect(() => {
        fetchVehicules();
    }, []);

    return (
        <MainLayout>
        <div className="pt-4 px-4">
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Mes Véhicules</h1>
            <div className="flex items-center gap-2">
                <button
                onClick={exportToCSV}
                className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                >
                <Download size={16} /> Export CSV
                </button>
                <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition"
                >
                <PlusCircle size={18} /> Ajouter
                </button>
            </div>
            </div>

            <div className="mb-6 max-w-md mx-auto">
            <input
                type="text"
                placeholder=" Rechercher par marque, modèle ou carburant..."
                value={search}
                onChange={handleSearch}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
            />
            </div>

            {loading ? (
            <div className="text-center text-gray-500">Chargement...</div>
            ) : filteredVehicules.length === 0 ? (
            <div className="text-center text-gray-500">Aucun véhicule trouvé.</div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicules.map((v) => (
                <div key={v.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                    <div className="relative">
                    {getStatusBadge(v.is_assigned)}
                    <img
                        src={`http://localhost:5000/uploads/vehicules/${v.image_path.split('\\').pop()}`}
                        alt={`${v.marque} ${v.modele}`}
                        className="w-full h-44 object-cover"
                    />
                    </div>
                    <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800">{v.marque} {v.modele}</h2>
                    <p className="text-sm text-gray-600 mt-1"> <strong>Carburant :</strong> {v.carburant}</p>
                    <p className="text-sm text-gray-600"> <strong>Kilométrage :</strong> {v.kilometrage.toLocaleString()} km</p>
                    <p className="text-sm text-gray-600"> <strong>Prix / jour :</strong> {v.prix_jour} MAD</p>

                    <div className="mt-4 flex justify-between">
                        <button
                        onClick={() => setVehiculeAModifier(v)}
                        className="text-sm px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                        Modifier
                        </button>
                        <button
                        onClick={() => supprimerVehicule(v.id)}
                        className="text-sm px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                        Supprimer
                        </button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            )}

            {showModal && (
            <AjouterVehiculeModal
                onClose={() => {
                setShowModal(false);
                fetchVehicules();
                }}
            />
            )}

            {vehiculeAModifier && (
            <ModifierVehiculeModal
                vehicule={vehiculeAModifier}
                onClose={() => {
                setVehiculeAModifier(null);
                fetchVehicules();
                }}
            />
            )}
        </div>
        </MainLayout>
    );
    };

    export default MesVehiculesPage;
