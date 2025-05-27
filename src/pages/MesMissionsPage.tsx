    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import MainLayout from "../layouts/MainLayout";
    import useAuthGuard from "../hooks/useAuthGuard";
    import {
    Box,
    Heading,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    Spinner,
    Flex,
    useColorModeValue,
    } from "@chakra-ui/react";

    interface Mission {
    id: number;
    vehicule_id: number;
    vehicule_modele: string;
    date_debut: string;
    date_fin: string;
    status: string;
    motif: string;
    created_at: string;
    }

    const MesMissionsPage = () => {
    useAuthGuard();
    const [missions, setMissions] = useState<Mission[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMissions = async () => {
        const token = localStorage.getItem("token");
        try {
        const res = await axios.get("http://localhost:5000/api/missions/mes", {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        setMissions(res.data);
        } catch (error) {
        console.error("Erreur chargement missions :", error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchMissions();
    }, []);

    const getStatusBadge = (status: string) => {
        switch (status) {
        case "APPROUVEE":
            return <Badge colorScheme="green">Approuvée</Badge>;
        case "REFUSEE":
            return <Badge colorScheme="red">Refusée</Badge>;
        default:
            return <Badge colorScheme="yellow">En attente</Badge>;
        }
    };

    const cardBg = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.100", "gray.700");
    const headingColor = useColorModeValue("gray.800", "gray.100");

    return (
        <MainLayout>
        <Box pt={6} px={6}>
            <Box textAlign="center" mb={6}>
            <Heading size="lg" mb={2} fontWeight="semibold" color={headingColor}>
                Mes Demandes de Mission
            </Heading>
            <Text color="gray.500">Liste de toutes vos demandes effectuées</Text>
            </Box>

            {loading ? (
            <Flex justify="center" align="center" minH="200px">
                <Spinner size="lg" />
            </Flex>
            ) : missions.length === 0 ? (
            <Text textAlign="center" color="gray.500">
                Aucune demande de mission trouvée.
            </Text>
            ) : (
            <Box
                overflowX="auto"
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="lg"
                shadow="sm"
                maxW="6xl"
                mx="auto"
            >
                <Table size="sm" variant="simple">
                <Thead bg="gray.50">
                    <Tr>
                    <Th>Motif</Th>
                    <Th>Modèle Véhicule</Th>
                    <Th>Date début</Th>
                    <Th>Date fin</Th>
                    <Th>Statut</Th>
                    <Th>Créée le</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {missions.map((m) => (
                    <Tr key={m.id} _hover={{ bg: "gray.50" }}>
                        <Td>{m.motif}</Td>
                        <Td>{m.vehicule_modele}</Td>
                        <Td>{m.date_debut}</Td>
                        <Td>{m.date_fin}</Td>
                        <Td>{getStatusBadge(m.status)}</Td>
                        <Td>{m.created_at}</Td>
                    </Tr>
                    ))}
                </Tbody>
                </Table>
            </Box>
            )}
        </Box>
        </MainLayout>
    );
    };

    export default MesMissionsPage;
