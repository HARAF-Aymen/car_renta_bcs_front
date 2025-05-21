        // import React, { useEffect, useState } from 'react';
        // import axios from 'axios';
        // import MainLayout from '../layouts/MainLayout';
        
        // interface LocationItem {
        //     location_id: number;
        //     mission_id: number;
        //     vehicule_id: number;
        //     user_id: number;
        //     date_debut: string;
        //     date_fin: string;
        // }
        
        // const DemandesAccepteesPage = () => {
        // const [locations, setLocations] = useState<LocationItem[]>([]);
        // const [loading, setLoading] = useState(true);
        
        // const fetchLocations = async () => {
        //     const token = localStorage.getItem('token');
        //     try {
        //     const res = await axios.get('http://localhost:5000/api/locations/acceptees-sans-contrat', {
        //         headers: { Authorization: `Bearer ${token}` },
        //         withCredentials: true,
        //     });
        //     setLocations(res.data);
        //     } catch (err) {
        //     console.error('Erreur lors du chargement des locations :', err);
        //     } finally {
        //     setLoading(false);
        //     }
        // };
        
        // const genererContrat = async (locationId: number) => {
        //     const token = localStorage.getItem('token');
        //     try {
        //     await axios.post(
        //         `http://localhost:5000/api/locations/${locationId}/generer-contrat`,
        //         {},
        //         {
        //         headers: { Authorization: `Bearer ${token}` },
        //         withCredentials: true,
        //         }
        //     );
        //     alert('Contrat généré avec succès !');
        //     fetchLocations();
        //     } catch (err) {
        //     alert("Erreur lors de la génération du contrat.");
        //     console.error(err);
        //     }
        // };
        
        // useEffect(() => {
        //     fetchLocations();
        // }, []);
        
        // return (
        //     <MainLayout>
        //     <div className="mb-6">
        //         <h1 className="text-2xl font-bold text-gray-800">Demandes Acceptées sans Contrat</h1>
        //     </div>
        
        //     {loading ? (
        //         <p>Chargement...</p>
        //     ) : locations.length === 0 ? (
        //         <p className="text-gray-500">Aucune demande acceptée sans contrat.</p>
        //     ) : (
        //         <div className="space-y-4">
        //         {locations.map((loc) => (
        //             <div key={loc.location_id} className="bg-white p-4 rounded shadow flex justify-between items-center">
        //             <div>
        //                 <p><strong>Mission ID:</strong> {loc.mission_id}</p>
        //                 <p><strong>Utilisateur ID:</strong> {loc.user_id}</p>
        //                 <p><strong>Véhicule ID:</strong> {loc.vehicule_id}</p>
        //                 <p><strong>Du:</strong> {loc.date_debut} <strong>au</strong> {loc.date_fin}</p>
        //             </div>
        //             <button
        //                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        //                 onClick={() => genererContrat(loc.location_id)}

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
            import {
            Box,
            Button,
            Flex,
            Heading,
            Spinner,
            Text,
            VStack,
            useToast,
            } from '@chakra-ui/react';
            import axios from 'axios';
            import MainLayout from '../layouts/MainLayout';
            
            interface LocationItem {
            location_id: number;
            mission_id: number;
            date_debut: string;
            date_fin: string;
            user: {
                id: number;
                nom: string;
            };
            vehicule: {
                id: number;
                modele: string;
            };
            }
            
            const DemandesAccepteesPage = () => {
            const [locations, setLocations] = useState<LocationItem[]>([]);
            const [loading, setLoading] = useState(true);
            const toast = useToast();
            
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
                toast({
                    title: 'Contrat généré',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                fetchLocations();
                } catch (err) {
                toast({
                    title: 'Erreur lors de la génération',
                    description: "Veuillez réessayer.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
                console.error(err);
                }
            };
            
            useEffect(() => {
                fetchLocations();
            }, []);
            
            return (
                <MainLayout>
                <Heading textAlign="center" mb={6}>Demandes Acceptées sans Contrat</Heading>
            
                {loading ? (
                    <Flex justify="center" align="center" minH="200px">
                    <Spinner size="lg" />
                    </Flex>
                ) : locations.length === 0 ? (
                    <Text textAlign="center" color="gray.500">
                    Aucune demande acceptée sans contrat.
                    </Text>
                ) : (
                    <VStack spacing={4} align="stretch">
                    {locations.map((loc) => (
                        <Flex
                        key={loc.location_id}
                        justify="space-between"
                        align="center"
                        bg="white"
                        p={4}
                        rounded="md"
                        shadow="md"
                        border="1px solid"
                        borderColor="gray.100"
                        >
                        <Box>
                            <Text><strong>Mission ID :</strong> {loc.mission_id}</Text>
                            <Text><strong>Utilisateur :</strong> {loc.user.nom}</Text>
                            <Text><strong>Véhicule :</strong> {loc.vehicule.modele}</Text>
                            <Text><strong>Du :</strong> {loc.date_debut} <strong>au</strong> {loc.date_fin}</Text>
                        </Box>
                        <Button
                            colorScheme="green"
                            onClick={() => genererContrat(loc.location_id)}
                        >
                            Générer Contrat
                        </Button>
                        </Flex>
                    ))}
                    </VStack>
                )}
                </MainLayout>
            );
            };
            
            export default DemandesAccepteesPage;
            