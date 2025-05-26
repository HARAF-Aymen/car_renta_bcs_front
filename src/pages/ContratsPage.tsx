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
    Text,
    Flex,
    Button,
    Badge,
    useColorModeValue,
    } from "@chakra-ui/react";
    import axios from "axios";
    import MainLayout from "../layouts/MainLayout";
    import useAuthGuard from "../hooks/useAuthGuard";

    interface Contrat {
    id: number;
    vehicule: {
        id: number;
        modele: string;
    };
    utilisateur: {
        id: number;
        nom: string;
    };
    date_debut: string;
    date_fin: string;
    statut: string;
    date_signature: string;
    }

    const ContratsPage = () => {
    useAuthGuard();
    const [contrats, setContrats] = useState<Contrat[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchContrats = async () => {
        const token = localStorage.getItem("token");
        try {
        const res = await axios.get("http://localhost:5000/api/contrats/", {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        setContrats(res.data);
        } catch (err) {
        console.error("Erreur lors du chargement des contrats", err);
        } finally {
        setLoading(false);
        }
    };

    const handleDownloadPDF = async (contratId: number) => {
        const token = localStorage.getItem("token");
        try {
        const response = await axios.get(
            `http://localhost:5000/api/contrats/${contratId}/pdf`,
            {
            headers: { Authorization: `Bearer ${token}` },
            responseType: "blob",
            withCredentials: true,
            }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `contrat_${contratId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        } catch (error) {
        console.error("Erreur lors du téléchargement du PDF", error);
        alert("Échec du téléchargement du contrat.");
        }
    };

    useEffect(() => {
        fetchContrats();
    }, []);

    const cardBg = useColorModeValue("white", "gray.800");

    return (
        <MainLayout>
        <Heading textAlign="center" size="lg" mb={6}>
            Liste des Contrats
        </Heading>

        {loading ? (
            <Flex justify="center" align="center" minH="200px">
            <Spinner size="lg" />
            </Flex>
        ) : contrats.length === 0 ? (
            <Text textAlign="center" color="gray.500">
            Aucun contrat trouvé.
            </Text>
        ) : (
            <Box
            overflowX="auto"
            bg={cardBg}
            p={4}
            rounded="md"
            shadow="sm"
            border="1px solid"
            borderColor="gray.100"
            >
            <Table size="sm" variant="simple">
                <Thead bg="gray.50">
                <Tr>
                    <Th>ID</Th>
                    <Th>Utilisateur</Th>
                    <Th>Véhicule</Th>
                    <Th>Début</Th>
                    <Th>Fin</Th>
                    <Th>Statut</Th>
                    <Th>Signé le</Th>
                    <Th>PDF</Th>
                </Tr>
                </Thead>
                <Tbody>
                {contrats.map((c) => (
                    <Tr key={c.id}>
                    <Td>{c.id}</Td>
                    <Td>{c.utilisateur?.nom || "N/A"}</Td>
                    <Td>{c.vehicule?.modele || "N/A"}</Td>
                    <Td>{c.date_debut}</Td>
                    <Td>{c.date_fin}</Td>
                    <Td>
                        <Badge
                        colorScheme={c.statut === "SIGNÉ" ? "green" : "gray"}
                        >
                        {c.statut}
                        </Badge>
                    </Td>
                    <Td>{c.date_signature}</Td>
                    <Td>
                        <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() => handleDownloadPDF(c.id)}
                        >
                        Télécharger PDF
                        </Button>
                    </Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
            </Box>
        )}
        </MainLayout>
    );
    };

    export default ContratsPage;
