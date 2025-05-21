    // import React, { useEffect, useState } from 'react';
    // import axios from 'axios';
    // import MainLayout from '../layouts/MainLayout';

    // interface Mission {
    // id: number;
    // vehicule_id: number;
    // user_id: number;
    // date_debut: string;
    // date_fin: string;
    // created_at: string;
    // }

    // const DemandesAccepteesPage = () => {
    // const [missions, setMissions] = useState<Mission[]>([]);
    // const [loading, setLoading] = useState(true);

    // const fetchMissions = async () => {
    //     const token = localStorage.getItem('token');
    //     try {
    //     const res = await axios.get('http://localhost:5000/api/missions/approved_without_contract', {
    //         headers: { Authorization: `Bearer ${token}` },
    //         withCredentials: true,
    //     });
    //     setMissions(res.data);
    //     } catch (err) {
    //     console.error('Erreur lors du chargement des missions :', err);
    //     } finally {
    //     setLoading(false);
    //     }
    // };

    // const genererContrat = async (locationId: number) => {
    //     const token = localStorage.getItem('token');
    //     try {
    //     const res = await axios.post(
    //         `http://localhost:5000/api/locations/${locationId}/generer-contrat`,
    //         {},
    //         {
    //         headers: { Authorization: `Bearer ${token}` },
    //         withCredentials: true,
    //         }
    //     );
    //     alert('Contrat généré avec succès !');
    //     fetchMissions(); // Refresh list
    //     } catch (err) {
    //     alert("Erreur lors de la génération du contrat.");
    //     console.error(err);
    //     }
    // };

    // useEffect(() => {
    //     fetchMissions();
    // }, []);

    // return (
    //     <MainLayout>
    //     <div className="mb-6">
    //         <h1 className="text-2xl font-bold text-gray-800">Missions approuvées sans contrat</h1>
    //     </div>

    //     {loading ? (
    //         <p>Chargement...</p>
    //     ) : missions.length === 0 ? (
    //         <p className="text-gray-500">Aucune mission approuvée sans contrat.</p>
    //     ) : (
    //         <div className="space-y-4">
    //         {missions.map((m) => (
    //             <div key={m.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
    //             <div>
    //                 <p><strong>Mission ID:</strong> {m.id}</p>
    //                 <p><strong>Utilisateur ID:</strong> {m.user_id}</p>
    //                 <p><strong>Véhicule ID:</strong> {m.vehicule_id}</p>
    //                 <p><strong>Du:</strong> {m.date_debut} <strong>au</strong> {m.date_fin}</p>
    //             </div>
    //             <button
    //                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    //                 onClick={() => genererContrat(m.id)}
    //             >
    //                 Générer Contrat
    //             </button>
    //             </div>
    //         ))}
    //         </div>
    //     )}
    //     </MainLayout>
    // );
    // };

    // export default DemandesAccepteesPage;


    import React, { useEffect, useState } from 'react';
        import axios from 'axios';
        import MainLayout from '../layouts/MainLayout';
        
        interface LocationItem {
            location_id: number;
            mission_id: number;
            vehicule_id: number;
            user_id: number;
            date_debut: string;
            date_fin: string;
        }
        
        const DemandesAccepteesPage = () => {
        const [locations, setLocations] = useState<LocationItem[]>([]);
        const [loading, setLoading] = useState(true);
        
        const fetchLocations = async () => {
            const token = localStorage.getItem('token');
            try {
            const res = await axios.get('http://localhost:5000/api/locations/acceptees-sans-contrat', {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setLocations(res.data);
            } catch (err) {
            console.error('Erreur lors du chargement des locations :', err);
            } finally {
            setLoading(false);
            }
        };
        
        const genererContrat = async (locationId: number) => {
            const token = localStorage.getItem('token');
            try {
            await axios.post(
                `http://localhost:5000/api/locations/${locationId}/generer-contrat`,
                {},
                {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
                }
            );
            alert('Contrat généré avec succès !');
            fetchLocations();
            } catch (err) {
            alert("Erreur lors de la génération du contrat.");
            console.error(err);
            }
        };
        
        useEffect(() => {
            fetchLocations();
        }, []);
        
        return (
            <MainLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Demandes Acceptées sans Contrat</h1>
            </div>
        
            {loading ? (
                <p>Chargement...</p>
            ) : locations.length === 0 ? (
                <p className="text-gray-500">Aucune demande acceptée sans contrat.</p>
            ) : (
                <div className="space-y-4">
                {locations.map((loc) => (
                    <div key={loc.location_id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                    <div>
                        <p><strong>Mission ID:</strong> {loc.mission_id}</p>
                        <p><strong>Utilisateur ID:</strong> {loc.user_id}</p>
                        <p><strong>Véhicule ID:</strong> {loc.vehicule_id}</p>
                        <p><strong>Du:</strong> {loc.date_debut} <strong>au</strong> {loc.date_fin}</p>
                    </div>
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={() => genererContrat(loc.location_id)}

                    >
                        Générer Contrat
                    </button>
                    </div>
                ))}
                </div>
            )}
            </MainLayout>
        );
        };
        
        export default DemandesAccepteesPage;
        