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
    useColorModeValue,
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

    const cardBg = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.100", "gray.700");
    const headingColor = useColorModeValue("gray.800", "gray.100");

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
        <Box pt={6} px={6}>
            <Heading
            textAlign="center"
            size="lg"
            mb={6}
            fontWeight="semibold"
            color={headingColor}
            >
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
                    align={{ base: "start", md: "center" }}
                    direction={{ base: "column", md: "row" }}
                    bg={cardBg}
                    p={5}
                    borderRadius="lg"
                    shadow="sm"
                    border="1px solid"
                    borderColor={borderColor}
                    gap={3}
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
                    alignSelf={{ base: "end", md: "center" }}
                    onClick={() => genererContrat(loc.location_id)}
                    >
                    Générer Contrat
                    </Button>
                </Flex>
                ))}
            </VStack>
            )}
        </Box>
        </MainLayout>
    );
    };

    export default DemandesAccepteesPage;
