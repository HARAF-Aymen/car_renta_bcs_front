
        import React, { useEffect, useState } from 'react';
        import axios from 'axios';
        import MainLayout from '../layouts/MainLayout';
        import AjouterVehiculeModal from './AjouterVehiculeModal';
        import ModifierVehiculeModal from './ModifierVehiculeModal';
        import useAuthGuard from '../hooks/useAuthGuard';
        
        interface Vehicule {
        id: number;
        marque: string;
        modele: string;
        carburant: string;
        kilometrage: number;
        prix_jour: number;
        image_path: string;
        }
        
        const MesVehiculesPage = () => {
            useAuthGuard();
        const [vehicules, setVehicules] = useState<Vehicule[]>([]);
        const [loading, setLoading] = useState(true);
        const [showModal, setShowModal] = useState(false);
        const [vehiculeAModifier, setVehiculeAModifier] = useState<Vehicule | null>(null);
        
        const fetchVehicules = async () => {
            const token = localStorage.getItem('token');
            try {
            const res = await axios.get('http://localhost:5000/api/vehicules/', {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setVehicules(res.data);
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
            setVehicules(vehicules.filter((v) => v.id !== id));
            } catch (err) {
            alert("Erreur lors de la suppression.");
            }
        };
        
        useEffect(() => {
            fetchVehicules();
        }, []);
        
        return (
            <MainLayout>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Mes Véhicules</h1>
                <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                + Ajouter
                </button>
            </div>
        
            {loading ? (
                <p>Chargement...</p>
            ) : vehicules.length === 0 ? (
                <p className="text-gray-500">Aucun véhicule enregistré pour le moment.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicules.map((v) => (
                    <div key={v.id} className="bg-white shadow rounded-lg p-4">
                    <img
                        src={`http://localhost:5000/uploads/vehicules/${v.image_path.split('\\').pop()}`}
                        alt={`${v.marque} ${v.modele}`}
                        className="w-full h-40 object-cover rounded"
                    />
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-gray-800">{v.marque} {v.modele}</h2>
                        <p className="text-sm text-gray-600">Carburant : {v.carburant}</p>
                        <p className="text-sm text-gray-600">Kilométrage : {v.kilometrage} km</p>
                        <p className="text-sm text-gray-600">Prix / jour : {v.prix_jour} MAD</p>
                    </div>
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
                ))}
                </div>
            )}
        
            {/* Modal d'ajout */}
            {showModal && (
                <AjouterVehiculeModal
                onClose={() => {
                    setShowModal(false);
                    fetchVehicules();
                }}
                />
            )}
        
            {/* Modal de modification */}
            {vehiculeAModifier && (
                <ModifierVehiculeModal
                vehicule={vehiculeAModifier}
                onClose={() => {
                    setVehiculeAModifier(null);
                    fetchVehicules();
                }}
                />
            )}
            </MainLayout>
        );
        };
        
        export default MesVehiculesPage;
        