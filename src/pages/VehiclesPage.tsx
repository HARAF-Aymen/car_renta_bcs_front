    // import React, { useEffect, useState } from 'react';
    // import MainLayout from '../layouts/MainLayout';
    // import axios from 'axios';
    // import { ShieldCheck, Trash2 } from 'lucide-react';
    // import useAuthGuard from '../hooks/useAuthGuard';

    // interface Vehicle {
    // id: number;
    // marque: string;
    // modele: string;
    // carburant: string;
    // kilometrage: number;
    // prix_jour: number;
    // image_path: string;
    // is_assigned: boolean;
    // fournisseur: {
    //     id: number;
    //     nom: string;
    //     email: string;
    // };
    // }

    // const VehiclesPage = () => {
    //     useAuthGuard();
    // const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    // const [filtered, setFiltered] = useState<Vehicle[]>([]);
    // const [marqueFilter, setMarqueFilter] = useState('');
    // const [statutFilter, setStatutFilter] = useState('');
    // const [role, setRole] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchVehicles = async () => {
    //     const token = localStorage.getItem('token');
    //     const roleFromStorage = localStorage.getItem('role');
    //     setRole(roleFromStorage);

    //     try {
    //         const res = await axios.get('http://localhost:5000/api/vehicules/', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //             withCredentials: true, // ✅ Needed to send the token cross-origin
    //         });
                
    //         setVehicles(res.data);
    //         setFiltered(res.data);
    //     } catch (err) {
    //         console.error('Failed to fetch vehicles:', err);
    //     }
    //     };

    //     fetchVehicles();
    // }, []);

    // useEffect(() => {
    //     let result = vehicles;

    //     if (marqueFilter.trim()) {
    //     result = result.filter((v) =>
    //         v.marque.toLowerCase().includes(marqueFilter.toLowerCase())
    //     );
    //     }

    //     if (statutFilter) {
    //     result = result.filter((v) =>
    //         statutFilter === 'assigned' ? v.is_assigned : !v.is_assigned
    //     );
    //     }

    //     setFiltered(result);
    // }, [marqueFilter, statutFilter, vehicles]);

    // const handleDelete = async (vehiculeId: number) => {
    //     if (!window.confirm('Are you sure you want to delete this vehicle?')) return;

    //     const token = localStorage.getItem('token');
    //     try {
    //     await axios.delete(`http://localhost:5000/api/vehicules/${vehiculeId}`, {
    //         headers: { Authorization: `Bearer ${token}` },
    //     });
    //     setVehicles(vehicles.filter((v) => v.id !== vehiculeId));
    //     } catch (err) {
    //     alert('Delete failed.');
    //     console.error(err);
    //     }
    // };

    // return (
    //     <MainLayout>
    //     <div className="mb-6">
    //         <h1 className="text-2xl font-bold text-gray-800">Vehicles</h1>
    //         <div className="mt-4 flex flex-col md:flex-row gap-4">
    //         <input
    //             type="text"
    //             placeholder="Search by marque..."
    //             className="border p-2 rounded w-full md:w-1/3"
    //             value={marqueFilter}
    //             onChange={(e) => setMarqueFilter(e.target.value)}
    //         />
    //         <select
    //             className="border p-2 rounded w-full md:w-1/3"
    //             value={statutFilter}
    //             onChange={(e) => setStatutFilter(e.target.value)}
    //         >
    //             <option value="">All statuses</option>
    //             <option value="assigned">Assigned</option>
    //             <option value="unassigned">Unassigned</option>
    //         </select>
    //         </div>
    //     </div>

    //     <div className="overflow-x-auto bg-white rounded shadow border border-gray-100">
    //         <table className="min-w-full text-sm text-left">
    //         <thead className="bg-gray-50 text-gray-600 font-medium">
    //             <tr>
    //             <th className="px-4 py-2">Image</th>
    //             <th className="px-4 py-2">Marque</th>
    //             <th className="px-4 py-2">Modèle</th>
    //             <th className="px-4 py-2">Carburant</th>
    //             <th className="px-4 py-2">Prix/Jour</th>
    //             <th className="px-4 py-2">Fournisseur</th>
    //             <th className="px-4 py-2">Statut</th>
    //             {role === 'FOURNISSEUR' && <th className="px-4 py-2">Actions</th>}
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {filtered.map((v) => (
    //             <tr key={v.id} className="border-t">
    //                 <td className="px-4 py-2">
    //                 <img
    //                     src={`http://localhost:5000/uploads/vehicules/${v.image_path.split('\\').pop()}`}
    //                     alt={v.marque}
    //                     className="w-20 h-14 object-cover rounded"
    //                 />
    //                 </td>
    //                 <td className="px-4 py-2">{v.marque}</td>
    //                 <td className="px-4 py-2">{v.modele}</td>
    //                 <td className="px-4 py-2">{v.carburant}</td>
    //                 <td className="px-4 py-2 text-blue-600">{v.prix_jour} MAD</td>
    //                 <td className="px-4 py-2">{v.fournisseur.nom}</td>
    //                 <td className="px-4 py-2">
    //                 {v.is_assigned ? (
    //                     <span className="text-red-500">Assigned</span>
    //                 ) : (
    //                     <span className="text-green-600">Available</span>
    //                 )}
    //                 </td>
    //                 {role === 'FOURNISSEUR' && (
    //                 <td className="px-4 py-2 flex gap-2">
    //                     {/* You can later add an edit modal here */}
    //                     <button
    //                     onClick={() => handleDelete(v.id)}
    //                     className="text-red-500 hover:text-red-700"
    //                     >
    //                     <Trash2 size={18} />
    //                     </button>
    //                 </td>
    //                 )}
    //             </tr>
    //             ))}
    //             {filtered.length === 0 && (
    //             <tr>
    //                 <td colSpan={8} className="text-center text-gray-500 py-6">
    //                 No vehicles found.
    //                 </td>
    //             </tr>
    //             )}
    //         </tbody>
    //         </table>
    //     </div>
    //     </MainLayout>
    // );
    // };

    // export default VehiclesPage;

    import React, { useEffect, useState } from 'react';
    import {
    Box,
    Heading,
    Input,
    Select,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Image,
    Text,
    Flex,
    IconButton,
    Badge,
    useColorModeValue,
    } from '@chakra-ui/react';
    import { Trash2 } from 'lucide-react';
    import MainLayout from '../layouts/MainLayout';
    import axios from 'axios';
    import useAuthGuard from '../hooks/useAuthGuard';

    interface Vehicle {
    id: number;
    marque: string;
    modele: string;
    carburant: string;
    kilometrage: number;
    prix_jour: number;
    image_path: string;
    is_assigned: boolean;
    fournisseur: {
        id: number;
        nom: string;
        email: string;
    };
    }

    const VehiclesPage = () => {
    useAuthGuard();
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [filtered, setFiltered] = useState<Vehicle[]>([]);
    const [marqueFilter, setMarqueFilter] = useState('');
    const [statutFilter, setStatutFilter] = useState('');
    const [role, setRole] = useState<string | null>(null);

    const cardBg = useColorModeValue('white', 'gray.800');

    useEffect(() => {
        const fetchVehicles = async () => {
        const token = localStorage.getItem('token');
        const roleFromStorage = localStorage.getItem('role');
        setRole(roleFromStorage);

        try {
            const res = await axios.get('http://localhost:5000/api/vehicules/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
            });

            setVehicles(res.data);
            setFiltered(res.data);
        } catch (err) {
            console.error('Failed to fetch vehicles:', err);
        }
        };

        fetchVehicles();
    }, []);

    useEffect(() => {
        let result = vehicles;

        if (marqueFilter.trim()) {
        result = result.filter((v) =>
            v.marque.toLowerCase().includes(marqueFilter.toLowerCase())
        );
        }

        if (statutFilter) {
        result = result.filter((v) =>
            statutFilter === 'assigned' ? v.is_assigned : !v.is_assigned
        );
        }

        setFiltered(result);
    }, [marqueFilter, statutFilter, vehicles]);

    const handleDelete = async (vehiculeId: number) => {
        if (!window.confirm('Are you sure you want to delete this vehicle?')) return;

        const token = localStorage.getItem('token');
        try {
        await axios.delete(`http://localhost:5000/api/vehicules/${vehiculeId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setVehicles(vehicles.filter((v) => v.id !== vehiculeId));
        } catch (err) {
        alert('Delete failed.');
        console.error(err);
        }
    };

    return (
        <MainLayout>
        <Box mb={6}>
        <Heading size="lg" mb={6} color="gray.800" textAlign="center" fontFamily="heading">
            VEHICULES
        </Heading>


        <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="center"
            gap={4}
            mb={8}
            >
            <Input
                placeholder="Search by marque..."
                value={marqueFilter}
                onChange={(e) => setMarqueFilter(e.target.value)}
                w={{ base: '100%', md: '300px' }}
            />
            <Select
                value={statutFilter}
                onChange={(e) => setStatutFilter(e.target.value)}
                w={{ base: '100%', md: '200px' }}
            >
                <option value="">STATUT</option>
                <option value="assigned">Assigned</option>
                <option value="unassigned">Unassigned</option>
            </Select>
        </Flex>

        </Box>

        <Box overflowX="auto" bg={cardBg} border="1px solid" borderColor="gray.100" borderRadius="md" shadow="sm">
            <Table size="sm" variant="simple">
            <Thead bg="gray.50">
                <Tr>
                <Th>Image</Th>
                <Th>Marque</Th>
                <Th>Modèle</Th>
                <Th>Carburant</Th>
                <Th>Prix/Jour</Th>
                <Th>Fournisseur</Th>
                <Th>Statut</Th>
                {role === 'FOURNISSEUR' && <Th>Actions</Th>}
                </Tr>
            </Thead>
            <Tbody>
                {filtered.map((v) => (
                <Tr key={v.id}>
                    <Td>
                    <Image
                        src={`http://localhost:5000/uploads/vehicules/${v.image_path.split('\\').pop()}`}
                        alt={v.marque}
                        boxSize="56px"
                        objectFit="cover"
                        borderRadius="md"
                    />
                    </Td>
                    <Td>{v.marque}</Td>
                    <Td>{v.modele}</Td>
                    <Td>{v.carburant}</Td>
                    <Td color="blue.600">{v.prix_jour} MAD</Td>
                    <Td>{v.fournisseur.nom}</Td>
                    <Td>
                        {v.is_assigned ? (
                            <Badge colorScheme="red" variant="subtle">
                            Assigned
                            </Badge>
                        ) : (
                            <Badge colorScheme="green" variant="subtle">
                            Available
                            </Badge>
                        )}
                    </Td>

                    {role === 'FOURNISSEUR' && (
                    <Td>
                        <IconButton
                        icon={<Trash2 size={16} />}
                        variant="ghost"
                        colorScheme="red"
                        aria-label="Delete vehicle"
                        onClick={() => handleDelete(v.id)}
                        />
                    </Td>
                    )}
                </Tr>
                ))}
                {filtered.length === 0 && (
                <Tr>
                    <Td colSpan={8} textAlign="center" py={6}>
                    <Text color="gray.500">No vehicles found.</Text>
                    </Td>
                </Tr>
                )}
            </Tbody>
            </Table>
        </Box>
        </MainLayout>
    );
    };

    export default VehiclesPage;
