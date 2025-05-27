    import React, { useEffect, useState } from "react";
    import {
    Box,
    Heading,
    Spinner,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Flex,
    Text,
    Button,
    Badge,
    useColorModeValue,
    } from "@chakra-ui/react";
    import MainLayout from "../layouts/MainLayout";
    import axios from "axios";
    import useAuthGuard from "../hooks/useAuthGuard";

    interface Mission {
    id: number;
    vehicule: {
        id: number;
        modele: string;
    };
    user: {
        id: number;
        nom: string;
    };
    date_debut: string;
    date_fin: string;
    status: string;
    created_at: string;
    }

    const MissionsPage = () => {
    useAuthGuard();
    const [missions, setMissions] = useState<Mission[]>([]);
    const [loading, setLoading] = useState(true);
    const [pendingLocationRequest, setPendingLocationRequest] = useState<{
        mission_id: number;
        vehicule_id: number;
    } | null>(null);

    const cardBg = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.100", "gray.700");

    const fetchMissions = async () => {
        const token = localStorage.getItem("token");
        try {
        const res = await axios.get("http://localhost:5000/api/missions/", {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        setMissions(res.data);
        } catch (err) {
        console.error("Failed to fetch missions:", err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchMissions();
    }, []);

    const handleDecision = async (
        missionId: number,
        decision: "APPROUVEE" | "REFUSEE"
    ) => {
        const token = localStorage.getItem("token");
        try {
        const res = await axios.put(
            `http://localhost:5000/api/missions/${missionId}/decision`,
            { decision },
            {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
            }
        );

        if (decision === "APPROUVEE" && res.data.vehicule_id) {
            setPendingLocationRequest({
            mission_id: missionId,
            vehicule_id: res.data.vehicule_id,
            });
        } else {
            fetchMissions();
        }
        } catch (err) {
        alert("Erreur lors de la prise de décision.");
        console.error(err);
        }
    };

    const createLocationRequest = async () => {
        if (!pendingLocationRequest) return;
        const token = localStorage.getItem("token");
        try {
        await axios.post(
            "http://localhost:5000/api/locations/",
            { mission_id: pendingLocationRequest.mission_id },
            {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
            }
        );
        alert("Demande de location créée avec succès.");
        setPendingLocationRequest(null);
        fetchMissions();
        } catch (err) {
        alert("Erreur lors de la création de la demande de location.");
        console.error(err);
        }
    };

    return (
        <MainLayout>
        <Box pt={6} px={6}>
            <Heading textAlign="center" size="lg" mb={6} fontWeight="semibold">
            Demandes de mission
            </Heading>

            {loading ? (
            <Flex justify="center" align="center" minH="200px">
                <Spinner size="lg" />
            </Flex>
            ) : (
            <Box
                overflowX="auto"
                bg={cardBg}
                p={4}
                borderRadius="lg"
                shadow="sm"
                border="1px solid"
                borderColor={borderColor}
            >
                <Table size="sm" variant="simple">
                <Thead bg="gray.50">
                    <Tr>
                    <Th>Utilisateur</Th>
                    <Th>Véhicule</Th>
                    <Th>Date début</Th>
                    <Th>Date fin</Th>
                    <Th>Statut</Th>
                    <Th>Créée le</Th>
                    <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {missions.map((m) => (
                    <Tr key={m.id} _hover={{ bg: "gray.50" }}>
                        <Td>{m.user?.nom || "N/A"}</Td>
                        <Td>{m.vehicule?.modele || "N/A"}</Td>
                        <Td>{m.date_debut}</Td>
                        <Td>{m.date_fin}</Td>
                        <Td>
                        <Badge
                            colorScheme={
                            m.status === "EN_ATTENTE"
                                ? "yellow"
                                : m.status === "APPROUVEE"
                                ? "green"
                                : m.status === "REFUSEE"
                                ? "red"
                                : "gray"
                            }
                            variant="subtle"
                        >
                            {m.status}
                        </Badge>
                        </Td>
                        <Td>{m.created_at}</Td>
                        <Td>
                        {m.status === "EN_ATTENTE" ? (
                            <Flex gap={2}>
                            <Button
                                size="sm"
                                colorScheme="green"
                                onClick={() => handleDecision(m.id, "APPROUVEE")}
                            >
                                Approuver
                            </Button>
                            <Button
                                size="sm"
                                colorScheme="red"
                                onClick={() => handleDecision(m.id, "REFUSEE")}
                            >
                                Refuser
                            </Button>
                            </Flex>
                        ) : (
                            <Text fontStyle="italic" color="gray.500">
                            Traitée
                            </Text>
                        )}
                        </Td>
                    </Tr>
                    ))}
                    {missions.length === 0 && (
                    <Tr>
                        <Td colSpan={7}>
                        <Text textAlign="center" color="gray.500" py={6}>
                            Aucune demande de mission trouvée.
                        </Text>
                        </Td>
                    </Tr>
                    )}
                </Tbody>
                </Table>
            </Box>
            )}

            {pendingLocationRequest && (
            <Flex
                position="fixed"
                inset={0}
                bg="blackAlpha.600"
                justify="center"
                align="center"
                zIndex={999}
            >
                <Box bg="white" p={6} rounded="xl" shadow="xl" maxW="md" w="full">
                <Heading size="md" mb={3}>
                    Créer une demande de location
                </Heading>
                <Text mb={4}>
                    Voulez-vous créer une demande de location pour le véhicule{" "}
                    <strong>{pendingLocationRequest.vehicule_id}</strong> ?
                </Text>
                <Flex justify="end" gap={3}>
                    <Button
                    variant="ghost"
                    onClick={() => setPendingLocationRequest(null)}
                    >
                    Annuler
                    </Button>
                    <Button colorScheme="blue" onClick={createLocationRequest}>
                    Confirmer
                    </Button>
                </Flex>
                </Box>
            </Flex>
            )}
        </Box>
        </MainLayout>
    );
    };

    export default MissionsPage;
