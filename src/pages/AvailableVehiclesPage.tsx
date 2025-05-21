
            // import React, { useEffect, useState } from 'react';
            // import axios from 'axios';
            // import MainLayout from '../layouts/MainLayout';
            // import useAuthGuard from '../hooks/useAuthGuard';
            
            // interface Vehicule {
            //     id: number;
            //     marque: string;
            //     modele: string;
            //     carburant: string;
            //     prix_jour: number;
            //     image_path?: string;
            // }
            
            // const AvailableVehiclesPage = () => {
            //     useAuthGuard();
            //     const [vehicules, setVehicules] = useState<Vehicule[]>([]);
            //     const [loading, setLoading] = useState(true);
                
            //     const [marque, setMarque] = useState('');
            //     const [carburant, setCarburant] = useState('');
            //     const [prixMax, setPrixMax] = useState('');
                
            //     const [selectedVehicule, setSelectedVehicule] = useState<Vehicule | null>(null);
            //     const [dateDebut, setDateDebut] = useState('');
            //     const [dateFin, setDateFin] = useState('');
            //     const [motif, setMotif] = useState('');
                
            //     const fetchVehicules = async (filters = {}) => {
            //         const token = localStorage.getItem('token');
            //         setLoading(true);
            //         try {
            //         const res = await axios.get('http://localhost:5000/api/vehicules/disponibles', {
            //             headers: { Authorization: `Bearer ${token}` },
            //             params: filters,
            //             withCredentials: true,
            //         });
            //         setVehicules(res.data);
            //         } catch (err) {
            //         console.error('Erreur chargement véhicules', err);
            //         } finally {
            //         setLoading(false);
            //         }
            //     };
                
                
            //     useEffect(() => {
            //         fetchVehicules();
            //     }, []);
                
                
            //     const handleFilter = (e: React.FormEvent) => {
            //         e.preventDefault();
                
            //         const filters: any = {};
            //         if (marque.trim()) filters.marque = marque;
            //         if (carburant) filters.carburant = carburant;
            //         if (prixMax.trim()) filters.prix_jour = prixMax;
                
            //         fetchVehicules(filters);
            //     };
                
                
            //     const handleSubmit = async () => {
            //         if (!dateDebut || !dateFin || !selectedVehicule) return;
                
            //         const token = localStorage.getItem('token');
            //         try {
            //         await axios.post(
            //             'http://localhost:5000/api/missions/',
            //             {
            //             vehicule_id: selectedVehicule.id,
            //             date_debut: dateDebut,
            //             date_fin: dateFin,
            //             motif,
            //             },
            //             {
            //             headers: { Authorization: `Bearer ${token}` },
            //             withCredentials: true,
            //             }
            //         );
            //         alert('Demande envoyée avec succès');
            //         setSelectedVehicule(null);
            //         setDateDebut('');
            //         setDateFin('');
            //         setMotif('');
            //         } catch (error) {
            //         alert("Erreur lors de l'envoi");
            //         console.error(error);
            //         }
            //     };
                
            //     return (
            //         <MainLayout>
            //         <h1 className="text-2xl font-bold mb-4">Véhicules disponibles</h1>
                
            //         {/* 🔍 Filtre */}
            //         <form onSubmit={handleFilter} className="mb-6 flex flex-wrap gap-4 items-end">
            //             <div>
            //             <label className="text-sm">Marque</label>
            //             <input
            //                 type="text"
            //                 value={marque}
            //                 onChange={(e) => setMarque(e.target.value)}
            //                 placeholder="Ex: Renault"
            //                 className="block border px-3 py-1 rounded"
            //             />
            //             </div>
            //             <div>
            //             <label className="text-sm">Carburant</label>
            //             <select
            //                 value={carburant}
            //                 onChange={(e) => setCarburant(e.target.value)}
            //                 className="block border px-3 py-1 rounded"
            //             >
            //                 <option value="">-- Tous --</option>
            //                 <option value="Essence">Essence</option>
            //                 <option value="Diesel">Diesel</option>
            //                 <option value="Électrique">Électrique</option>
            //             </select>
            //             </div>
            //             <div>
            //             <label className="text-sm">Prix max</label>
            //             <input
            //                 type="number"
            //                 value={prixMax}
            //                 onChange={(e) => setPrixMax(e.target.value)}
            //                 placeholder="Ex: 500"
            //                 className="block border px-3 py-1 rounded"
            //             />
            //             </div>
            //             <button
            //             type="submit"
            //             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            //             >
            //             Rechercher
            //             </button>
            //         </form>
                
            //         {loading ? (
            //             <p>Chargement...</p>
            //         ) : (
            //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            //             {vehicules.map((v) => (
            //                 <div key={v.id} className="bg-white border rounded shadow p-4">
            //                 {v.image_path && (
            //                     <img
            //                     src={`http://localhost:5000/uploads/vehicules/${v.image_path.split('\\').pop()?.split('/').pop()}`}
            //                     alt={`${v.marque} ${v.modele}`}
            //                     className="w-full h-40 object-cover rounded mb-3"
            //                     />
            //                 )}
            //                 <h2 className="text-lg font-semibold">{v.marque} {v.modele}</h2>
            //                 <p className="text-sm text-gray-600">{v.carburant}</p>
            //                 <p className="text-sm text-gray-600">Prix/Jour : {v.prix_jour} MAD</p>
            //                 <button
            //                     onClick={() => setSelectedVehicule(v)}
            //                     className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            //                 >
            //                     Demander
            //                 </button>
            //                 </div>
            //             ))}
            //             </div>
            //         )}
                
            //         {/* 📝 Modal demande de mission */}
            //         {selectedVehicule && (
            //             <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            //             <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            //                 <h2 className="text-xl font-bold mb-4">
            //                 Demande pour {selectedVehicule.marque} {selectedVehicule.modele}
            //                 </h2>
            //                 <div className="mb-3">
            //                 <label className="text-sm">Date début</label>
            //                 <input
            //                     type="date"
            //                     className="w-full border px-3 py-2 rounded mt-1"
            //                     value={dateDebut}
            //                     onChange={(e) => setDateDebut(e.target.value)}
            //                 />
            //                 </div>
            //                 <div className="mb-3">
            //                 <label className="text-sm">Date fin</label>
            //                 <input
            //                     type="date"
            //                     className="w-full border px-3 py-2 rounded mt-1"
            //                     value={dateFin}
            //                     onChange={(e) => setDateFin(e.target.value)}
            //                 />
            //                 </div>
            //                 <div className="mb-4">
            //                 <label className="text-sm">Motif</label>
            //                 <textarea
            //                     className="w-full border px-3 py-2 rounded mt-1"
            //                     rows={3}
            //                     placeholder="Ex : Réunion à Agadir"
            //                     value={motif}
            //                     onChange={(e) => setMotif(e.target.value)}
            //                 />
            //                 </div>
            //                 <div className="flex justify-end gap-3">
            //                 <button
            //                     className="px-4 py-2 bg-gray-300 rounded"
            //                     onClick={() => setSelectedVehicule(null)}
            //                 >
            //                     Annuler
            //                 </button>
            //                 <button
            //                     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            //                     onClick={handleSubmit}
            //                 >
            //                     Envoyer
            //                 </button>
            //                 </div>
            //             </div>
            //             </div>
            //         )}
            //         </MainLayout>
            //     );
            //     };
                
            //     export default AvailableVehiclesPage;
                
            import React, { useEffect, useState } from 'react';
            import axios from 'axios';
            import MainLayout from '../layouts/MainLayout';
            import useAuthGuard from '../hooks/useAuthGuard';
            import {
            Box,
            Heading,
            Input,
            Select,
            SimpleGrid,
            Image,
            Text,
            Button,
            Stack,
            Modal,
            ModalOverlay,
            ModalContent,
            ModalHeader,
            ModalBody,
            ModalFooter,
            ModalCloseButton,
            useDisclosure,
            Textarea,
            Slider,
            SliderTrack,
            SliderFilledTrack,
            SliderThumb,
            Center,
            } from '@chakra-ui/react';
            import { debounce } from 'lodash';
            
            interface Vehicule {
            id: number;
            marque: string;
            modele: string;
            carburant: string;
            prix_jour: number;
            image_path?: string;
            }
            
            const AvailableVehiclesPage = () => {
            useAuthGuard();
            
            const [vehicules, setVehicules] = useState<Vehicule[]>([]);
            const [loading, setLoading] = useState(true);
            
            const [marque, setMarque] = useState('');
            const [carburant, setCarburant] = useState('');
            const [prixMax, setPrixMax] = useState(1000);
            
            const [selectedVehicule, setSelectedVehicule] = useState<Vehicule | null>(null);
            const [dateDebut, setDateDebut] = useState('');
            const [dateFin, setDateFin] = useState('');
            const [motif, setMotif] = useState('');
            
            const { isOpen, onOpen, onClose } = useDisclosure();
            
            const fetchVehicules = async (filters = {}) => {
                const token = localStorage.getItem('token');
                setLoading(true);
                try {
                const res = await axios.get('http://localhost:5000/api/vehicules/disponibles', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: filters,
                    withCredentials: true,
                });
                setVehicules(res.data);
                } catch (err) {
                console.error('Erreur chargement véhicules', err);
                } finally {
                setLoading(false);
                }
            };
            
            const debouncedFetch = debounce(() => {
                const filters: any = {};
                if (marque.trim()) filters.marque = marque;
                if (carburant) filters.carburant = carburant;
                if (prixMax) filters.prix_jour = prixMax;
                fetchVehicules(filters);
            }, 400);
            
            useEffect(() => {
                debouncedFetch();
            }, [marque, carburant, prixMax]);
            
            useEffect(() => {
                fetchVehicules();
            }, []);
            
            const handleSubmit = async () => {
                if (!dateDebut || !dateFin || !selectedVehicule) return;
            
                const token = localStorage.getItem('token');
                try {
                await axios.post(
                    'http://localhost:5000/api/missions/',
                    {
                    vehicule_id: selectedVehicule.id,
                    date_debut: dateDebut,
                    date_fin: dateFin,
                    motif,
                    },
                    {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                    }
                );
                alert('Demande envoyée avec succès');
                setSelectedVehicule(null);
                onClose();
                setDateDebut('');
                setDateFin('');
                setMotif('');
                } catch (error) {
                alert("Erreur lors de l'envoi");
                console.error(error);
                }
            };
            
            return (
                <MainLayout>
                <Box>
                    <Heading as="h1" size="xl" mb={6} textAlign="center">
                    Véhicules disponibles
                    </Heading>
            
                    <Center mb={10}>
                    <Stack direction={['column', 'row']} spacing={6} align="center" width="100%" maxW="5xl">
                        <Box>
                        <Text fontSize="sm" mb={1}>Marque</Text>
                        <Input
                            placeholder="Ex: Renault"
                            value={marque}
                            onChange={(e) => setMarque(e.target.value)}
                        />
                        </Box>
                        <Box>
                        <Text fontSize="sm" mb={1}>Carburant</Text>
                        <Select value={carburant} onChange={(e) => setCarburant(e.target.value)}>
                            <option value="">-- Tous --</option>
                            <option value="Essence">Essence</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Électrique">Électrique</option>
                        </Select>
                        </Box>
                        <Box maxW="300px">
                            <Text fontSize="sm" mb={1}>
                                Prix max : {prixMax} MAD
                            </Text>
                            <Slider
                                aria-label="slider-ex"
                                min={100}
                                max={1000}
                                step={50}
                                value={prixMax}
                                onChange={(val) => setPrixMax(val)}
                            >
                                <SliderTrack>
                                <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </Box>


                    </Stack>
                    </Center>
            
                    {loading ? (
                    <Text>Chargement...</Text>
                    ) : (
                    <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                        {vehicules.map((v) => (
                        <Box key={v.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                            {v.image_path && (
                            <Image
                                src={`http://localhost:5000/uploads/vehicules/${v.image_path.split('\\').pop()?.split('/').pop()}`}
                                alt={`${v.marque} ${v.modele}`}
                                borderRadius="md"
                                mb={3}
                                h="160px"
                                w="100%"
                                objectFit="cover"
                            />
                            )}
                            <Text fontWeight="bold" fontSize="lg">{v.marque} {v.modele}</Text>
                            <Text fontSize="sm">{v.carburant}</Text>
                            <Text fontSize="sm" color="blue.600">Prix/Jour : {v.prix_jour} MAD</Text>
                            <Button mt={4} colorScheme="blue" size="sm" onClick={() => {
                            setSelectedVehicule(v);
                            onOpen();
                            }}>
                            Demander
                            </Button>
                        </Box>
                        ))}
                    </SimpleGrid>
                    )}
            
                    {/* Modal Demande */}
                    {selectedVehicule && (
                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                        <ModalHeader>Demande pour {selectedVehicule.marque} {selectedVehicule.modele}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={4}>
                            <Box>
                                <Text fontSize="sm">Date début</Text>
                                <Input
                                type="date"
                                value={dateDebut}
                                onChange={(e) => setDateDebut(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <Text fontSize="sm">Date fin</Text>
                                <Input
                                type="date"
                                value={dateFin}
                                onChange={(e) => setDateFin(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <Text fontSize="sm">Motif</Text>
                                <Textarea
                                value={motif}
                                onChange={(e) => setMotif(e.target.value)}
                                placeholder="Ex : Réunion à Agadir"
                                />
                            </Box>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="ghost" mr={3} onClick={onClose}>
                            Annuler
                            </Button>
                            <Button colorScheme="green" onClick={handleSubmit}>
                            Envoyer
                            </Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
                    )}
                </Box>
                </MainLayout>
            );
            };
            
            export default AvailableVehiclesPage;
            