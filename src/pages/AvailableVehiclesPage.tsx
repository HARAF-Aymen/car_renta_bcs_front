    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import MainLayout from "../layouts/MainLayout";
    import useAuthGuard from "../hooks/useAuthGuard";
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
    } from "@chakra-ui/react";
    import { debounce } from "lodash";

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

    const [marque, setMarque] = useState("");
    const [carburant, setCarburant] = useState("");
    const [prixMax, setPrixMax] = useState(1000);

    const [selectedVehicule, setSelectedVehicule] = useState<Vehicule | null>(
        null
    );
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [motif, setMotif] = useState("");

    const { isOpen, onOpen, onClose } = useDisclosure();

    const fetchVehicules = async (filters = {}) => {
        const token = localStorage.getItem("token");
        setLoading(true);
        try {
        const res = await axios.get(
            "http://localhost:5000/api/vehicules/disponibles",
            {
            headers: { Authorization: `Bearer ${token}` },
            params: filters,
            withCredentials: true,
            }
        );
        setVehicules(res.data);
        } catch (err) {
        console.error("Erreur chargement véhicules", err);
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

        const token = localStorage.getItem("token");
        try {
        await axios.post(
            "http://localhost:5000/api/missions/",
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
        alert("Demande envoyée avec succès");
        setSelectedVehicule(null);
        onClose();
        setDateDebut("");
        setDateFin("");
        setMotif("");
        } catch (error) {
        alert("Erreur lors de l'envoi");
        console.error(error);
        }
    };

    return (
        <MainLayout>
        <Box pt={6} px={6}>
            <Heading
            as="h1"
            size="lg"
            mb={8}
            textAlign="center"
            fontWeight="semibold"
            >
            Véhicules disponibles
            </Heading>

            {/* Filter bar */}
            <Center mb={10}>
            <Stack
                direction={{ base: "column", md: "row" }}
                spacing={6}
                align="center"
                width="100%"
                maxW="6xl"
                justify="center"
            >
                <Box w={{ base: "100%", md: "200px" }}>
                <Text fontSize="sm" mb={1}>
                    Marque
                </Text>
                <Input
                    placeholder="Ex: Renault"
                    value={marque}
                    onChange={(e) => setMarque(e.target.value)}
                />
                </Box>
                <Box w={{ base: "100%", md: "200px" }}>
                <Text fontSize="sm" mb={1}>
                    Carburant
                </Text>
                <Select
                    value={carburant}
                    onChange={(e) => setCarburant(e.target.value)}
                >
                    <option value=""> Tous</option>
                    <option value="Essence">Essence</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Électrique">Électrique</option>
                </Select>
                </Box>
                <Box w={{ base: "100%", md: "250px" }}>
                <Text fontSize="sm" mb={1}>
                    Prix max : {prixMax} MAD
                </Text>
                <Slider
                    aria-label="prix-slider"
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

            {/* Cards */}
            {loading ? (
            <Text textAlign="center" color="gray.500">
                Chargement...
            </Text>
            ) : (
            <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                {vehicules.map((v) => (
                <Box
                    key={v.id}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p={4}
                    bg="white"
                    shadow="sm"
                    transition="all 0.2s"
                    _hover={{ shadow: "md" }}
                >
                    {v.image_path && (
                    <Image
                        src={`http://localhost:5000/uploads/vehicules/${v.image_path
                        .split("\\")
                        .pop()
                        ?.split("/")
                        .pop()}`}
                        alt={`${v.marque} ${v.modele}`}
                        borderRadius="md"
                        mb={3}
                        h="160px"
                        w="100%"
                        objectFit="cover"
                    />
                    )}
                    <Text fontWeight="bold" fontSize="md" mb={1}>
                    {v.marque} {v.modele}
                    </Text>
                    <Text fontSize="sm" mb={1}>
                    {v.carburant}
                    </Text>
                    <Text fontSize="sm" color="blue.600" fontWeight="medium">
                    Prix/Jour : {v.prix_jour} MAD
                    </Text>
                    <Button
                    mt={4}
                    colorScheme="blue"
                    size="sm"
                    onClick={() => {
                        setSelectedVehicule(v);
                        onOpen();
                    }}
                    >
                    Demander
                    </Button>
                </Box>
                ))}
            </SimpleGrid>
            )}

            {/* Modal for mission request */}
            {selectedVehicule && (
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>
                    Demande pour {selectedVehicule.marque} {selectedVehicule.modele}
                </ModalHeader>
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
