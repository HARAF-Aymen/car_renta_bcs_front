    import React, { useEffect, useState } from "react";
    import {
    Box,
    Button,
    Flex,
    Heading,
    Spinner,
    Text,
    VStack,
    useToast,
    } from "@chakra-ui/react";
    import axios from "axios";
    import MainLayout from "../layouts/MainLayout";

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
        const token = localStorage.getItem("token");
        try {
        const res = await axios.get(
            "http://localhost:5000/api/locations/acceptees-sans-contrat",
            {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
            }
        );
        setLocations(res.data);
        } catch (err) {
        console.error("Erreur lors du chargement des locations :", err);
        } finally {
        setLoading(false);
        }
    };

    const genererContrat = async (locationId: number) => {
        const token = localStorage.getItem("token");
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
            title: "Contrat généré",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        fetchLocations();
        } catch (err) {
        toast({
            title: "Erreur lors de la génération",
            description: "Veuillez réessayer.",
            status: "error",
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
        <Heading textAlign="center" mb={6}>
            Demandes Acceptées sans Contrat
        </Heading>

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
                    <Text>
                    <strong>Mission ID :</strong> {loc.mission_id}
                    </Text>
                    <Text>
                    <strong>Utilisateur :</strong> {loc.user.nom}
                    </Text>
                    <Text>
                    <strong>Véhicule :</strong> {loc.vehicule.modele}
                    </Text>
                    <Text>
                    <strong>Du :</strong> {loc.date_debut} <strong>au</strong>{" "}
                    {loc.date_fin}
                    </Text>
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
