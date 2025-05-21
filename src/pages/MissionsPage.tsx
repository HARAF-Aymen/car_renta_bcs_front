    // import React, { useEffect, useState } from 'react';
    // import MainLayout from '../layouts/MainLayout';
    // import axios from 'axios';
    // import useAuthGuard from '../hooks/useAuthGuard';

    // interface Mission {
    // id: number;
    // vehicule_id: number;
    // user_id: number;
    // date_debut: string;
    // date_fin: string;
    // status: string;
    // created_at: string;
    // }

    // const MissionsPage = () => {
    //     useAuthGuard();
    // const [missions, setMissions] = useState<Mission[]>([]);
    // const [loading, setLoading] = useState(true);
    // const [pendingLocationRequest, setPendingLocationRequest] = useState<{ mission_id: number; vehicule_id: number } | null>(null);

    

    // const fetchMissions = async () => {
    //     const token = localStorage.getItem('token');
    //     try {
    //     const res = await axios.get('http://localhost:5000/api/missions/', {
    //         headers: { Authorization: `Bearer ${token}` },
    //         withCredentials: true,
    //     });
    //     setMissions(res.data);
    //     } catch (err) {
    //     console.error('Failed to fetch missions:', err);
    //     } finally {
    //     setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchMissions();
    // }, []);

    // // const handleDecision = async (missionId: number, decision: 'APPROUVEE' | 'REFUSEE') => {
    // //     const token = localStorage.getItem('token');
    // //     try {
    // //     await axios.put(
    // //         `http://localhost:5000/api/missions/${missionId}/decision`,
    // //         { decision },
    // //         {
    // //         headers: { Authorization: `Bearer ${token}` },
    // //         withCredentials: true,
    // //         }
    // //     );
    // //     fetchMissions(); // Refresh list after decision
    // //     } catch (err) {
    // //     alert('Erreur lors de la prise de décision.');
    // //     console.error(err);
    // //     }
    // // };

    // const handleDecision = async (missionId: number, decision: 'APPROUVEE' | 'REFUSEE') => {
    //     const token = localStorage.getItem('token');
    //     try {
    //       const res = await axios.put(
    //         `http://localhost:5000/api/missions/${missionId}/decision`,
    //         { decision },
    //         {
    //           headers: { Authorization: `Bearer ${token}` },
    //           withCredentials: true,
    //         }
    //       );
    //       if (decision === 'APPROUVEE' && res.data.vehicule_id) {
    //         // Show rental form/modal
    //         setPendingLocationRequest({ mission_id: missionId, vehicule_id: res.data.vehicule_id });
    //       } else {
    //         fetchMissions(); // Just refresh the list
    //       }
    //     } catch (err) {
    //       alert('Erreur lors de la prise de décision.');
    //       console.error(err);
    //     }
    //   };
      

    // return (
    //     <MainLayout>
    //     <div className="mb-6">
    //         <h1 className="text-2xl font-bold text-gray-800">Mission Requests</h1>
    //     </div>

    //     {loading ? (
    //         <p>Loading...</p>
    //     ) : (
    //         <div className="overflow-x-auto bg-white rounded shadow border border-gray-100">
    //         <table className="min-w-full text-sm text-left">
    //             <thead className="bg-gray-50 text-gray-600 font-medium">
    //             <tr>
    //                 <th className="px-4 py-2">User ID</th>
    //                 <th className="px-4 py-2">Vehicle ID</th>
    //                 <th className="px-4 py-2">Start Date</th>
    //                 <th className="px-4 py-2">End Date</th>
    //                 <th className="px-4 py-2">Status</th>
    //                 <th className="px-4 py-2">Created At</th>
    //                 <th className="px-4 py-2">Actions</th>
    //             </tr>
    //             </thead>
    //             <tbody>
    //             {missions.map((m) => (
    //                 <tr key={m.id} className="border-t">
    //                 <td className="px-4 py-2">{m.user_id}</td>
    //                 <td className="px-4 py-2">{m.vehicule_id}</td>
    //                 <td className="px-4 py-2">{m.date_debut}</td>
    //                 <td className="px-4 py-2">{m.date_fin}</td>
    //                 <td className="px-4 py-2">{m.status}</td>
    //                 <td className="px-4 py-2">{m.created_at}</td>
    //                 <td className="px-4 py-2">
    //                 {m.status === 'EN_ATTENTE' ? (
    //                     <div className="flex gap-2">
    //                     <button
    //                         onClick={() => handleDecision(m.id, 'APPROUVEE')}
    //                         className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
    //                     >
    //                         Approve
    //                     </button>
    //                     <button
    //                         onClick={() => handleDecision(m.id, 'REFUSEE')}
    //                         className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
    //                     >
    //                         Refuse
    //                     </button>
    //                     </div>
    //                 ) : (
    //                     <span className="text-gray-500 italic">No actions</span>
    //                 )}
    //                 </td>

    //                 </tr>
    //             ))}
    //             {missions.length === 0 && (
    //                 <tr>
    //                 <td colSpan={7} className="text-center py-6 text-gray-500">
    //                     No mission requests found.
    //                 </td>
    //                 </tr>
    //             )}
    //             </tbody>
    //         </table>
    //         </div>

            
    //     )}
    //     </MainLayout>
    // );
    // };

    // export default MissionsPage;

    import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import axios from 'axios';
import useAuthGuard from '../hooks/useAuthGuard';

interface Mission {
  id: number;
  vehicule_id: number;
  user_id: number;
  date_debut: string;
  date_fin: string;
  status: string;
  created_at: string;
}

const MissionsPage = () => {
  useAuthGuard();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingLocationRequest, setPendingLocationRequest] = useState<{ mission_id: number; vehicule_id: number } | null>(null);

  const fetchMissions = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/missions/', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setMissions(res.data);
    } catch (err) {
      console.error('Failed to fetch missions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const handleDecision = async (missionId: number, decision: 'APPROUVEE' | 'REFUSEE') => {
    const token = localStorage.getItem('token');
    
    
    try {
      const res = await axios.put(
        `http://localhost:5000/api/missions/${missionId}/decision`,
        { decision },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
        
      );
      
      console.log("Decision response:", res.data);

      if (decision === 'APPROUVEE' && res.data.vehicule_id) {
        setPendingLocationRequest({ mission_id: missionId, vehicule_id: res.data.vehicule_id });
      } else {
        fetchMissions();
      }
    } catch (err) {
      alert('Erreur lors de la prise de décision.');
      console.error(err);
    }
    
    
  };

  const createLocationRequest = async () => {
    if (!pendingLocationRequest) return;
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/locations/',
        { mission_id: pendingLocationRequest.mission_id },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      alert('Demande de location créée avec succès.');
      setPendingLocationRequest(null);
      fetchMissions();
    } catch (err) {
      alert('Erreur lors de la création de la demande de location.');
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mission Requests</h1>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow border border-gray-100">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Vehicle ID</th>
                <th className="px-4 py-2">Start Date</th>
                <th className="px-4 py-2">End Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {missions.map((m) => (
                <tr key={m.id} className="border-t">
                  <td className="px-4 py-2">{m.user_id}</td>
                  <td className="px-4 py-2">{m.vehicule_id}</td>
                  <td className="px-4 py-2">{m.date_debut}</td>
                  <td className="px-4 py-2">{m.date_fin}</td>
                  <td className="px-4 py-2">{m.status}</td>
                  <td className="px-4 py-2">{m.created_at}</td>
                  <td className="px-4 py-2">
                    {m.status === 'EN_ATTENTE' ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDecision(m.id, 'APPROUVEE')}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDecision(m.id, 'REFUSEE')}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Refuse
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500 italic">No actions</span>
                    )}
                  </td>
                </tr>
              ))}
              {missions.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No mission requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* 📌 Modal for rental request */}
      {pendingLocationRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Créer une demande de location</h2>
            <p className="text-gray-700 mb-4">
              Voulez-vous créer une demande de location pour le véhicule{' '}
              <strong>{pendingLocationRequest.vehicule_id}</strong> ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={() => setPendingLocationRequest(null)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={createLocationRequest}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default MissionsPage;
