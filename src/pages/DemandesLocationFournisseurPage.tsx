// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import MainLayout from '../layouts/MainLayout';

// interface Demande {
// id: number;
// mission_id: number;
// vehicule_id: number;
// statut: string;
// date_reception: string;
// }

// const DemandesRecuesFournisseur = () => {
// const [demandes, setDemandes] = useState<Demande[]>([]);
// const [loading, setLoading] = useState(true);

// const fetchDemandes = async () => {
//     const token = localStorage.getItem('token');
//     try {
//     const res = await axios.get('http://localhost:5000/api/locations/recues', {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//     });
//     setDemandes(res.data);
//     } catch (err) {
//     alert('Erreur lors du chargement des demandes');
//     } finally {
//     setLoading(false);
//     }
// };

// const prendreDecision = async (id: number, decision: 'ACCEPTEE' | 'REFUSEE') => {
//     const token = localStorage.getItem('token');
//     try {
//     await axios.put(`http://localhost:5000/api/locations/${id}/decision`, { decision }, {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//     });

//     fetchDemandes(); // refresh
//     } catch (err) {
//     alert('Erreur lors de la décision');
//     }
// };

// useEffect(() => {
//     fetchDemandes();
// }, []);

// return (
//     <MainLayout>
//     <h1 className="text-2xl font-bold mb-4">Demandes de location reçues</h1>
//     {loading ? (
//         <p>Chargement...</p>
//     ) : demandes.length === 0 ? (
//         <p className="text-gray-600">Aucune demande pour le moment.</p>
//     ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {demandes.map((d) => (
//             <div key={d.id} className="border rounded p-4 shadow bg-white">
//             <p><strong>ID Mission :</strong> {d.mission_id}</p>
//             <p><strong>Véhicule :</strong> {d.vehicule_id}</p>
//             <p><strong>Statut :</strong> {d.statut}</p>
//             <p><strong>Date :</strong> {d.date_reception}</p>

//             {d.statut === 'EN_ATTENTE' && (
//                 <div className="flex gap-2 mt-3">
//                 <button
//                     onClick={() => prendreDecision(d.id, 'ACCEPTEE')}
//                     className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//                 >
//                     Accepter
//                 </button>
//                 <button
//                     onClick={() => prendreDecision(d.id, 'REFUSEE')}
//                     className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                 >
//                     Refuser
//                 </button>
//                 </div>
//             )}
//             </div>
//         ))}
//         </div>
//     )}
//     </MainLayout>
// );
// };

// export default DemandesRecuesFournisseur;

import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

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
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        "http://localhost:5000/api/locations/recues",
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setDemandes(res.data);
    } catch (err) {
      alert("Erreur lors du chargement des demandes");
    } finally {
      setLoading(false);
    }
  };

  const prendreDecision = async (
    id: number,
    decision: "ACCEPTEE" | "REFUSEE"
  ) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/locations/${id}/decision`,
        { decision },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      fetchDemandes(); // refresh
    } catch (err) {
      alert("Erreur lors de la décision");
    }
  };

  const getStatutBadge = (statut: string) => {
    const base = "inline-block px-2 py-1 text-xs font-semibold rounded-full";
    switch (statut) {
      case "ACCEPTEE":
        return (
          <span className={`${base} bg-green-100 text-green-700`}>
            ✔️ Acceptée
          </span>
        );
      case "REFUSEE":
        return (
          <span className={`${base} bg-red-100 text-red-700`}>❌ Refusée</span>
        );
      default:
        return (
          <span className={`${base} bg-yellow-100 text-yellow-700`}>
            ⏳ En attente
          </span>
        );
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  return (
    <MainLayout>
      <div className="pt-4 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          📩 Demandes de location reçues
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Chargement...</p>
        ) : demandes.length === 0 ? (
          <p className="text-center text-gray-500">
            Aucune demande pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {demandes.map((d) => (
              <div key={d.id} className="border rounded-lg p-4 shadow bg-white">
                <p className="mb-1">
                  <strong>ID Mission :</strong> {d.mission_id}
                </p>
                <p className="mb-1">
                  <strong>ID Véhicule :</strong> {d.vehicule_id}
                </p>
                <p className="mb-1">
                  <strong>Date de réception :</strong> {d.date_reception}
                </p>
                <p className="mb-2">
                  <strong>Statut :</strong> {getStatutBadge(d.statut)}
                </p>

                {d.statut === "EN_ATTENTE" && (
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => prendreDecision(d.id, "ACCEPTEE")}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition"
                    >
                      ✅ Accepter
                    </button>
                    <button
                      onClick={() => prendreDecision(d.id, "REFUSEE")}
                      className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition"
                    >
                      ❌ Refuser
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DemandesRecuesFournisseur;
