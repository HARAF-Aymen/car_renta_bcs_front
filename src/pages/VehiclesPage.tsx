    import React, { useEffect, useState } from "react";
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
    } from "@chakra-ui/react";
    import { Trash2 } from "lucide-react";
    import MainLayout from "../layouts/MainLayout";
    import axios from "axios";
    import useAuthGuard from "../hooks/useAuthGuard";

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
    const [marqueFilter, setMarqueFilter] = useState("");
    const [statutFilter, setStatutFilter] = useState("");
    const [role, setRole] = useState<string | null>(null);

    const cardBg = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.100", "gray.700");
    const headingColor = useColorModeValue("gray.800", "gray.100");

    useEffect(() => {
        const fetchVehicles = async () => {
        const token = localStorage.getItem("token");
        const roleFromStorage = localStorage.getItem("role");
        setRole(roleFromStorage);

        try {
            const res = await axios.get("http://localhost:5000/api/vehicules/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
            });

            setVehicles(res.data);
            setFiltered(res.data);
        } catch (err) {
            console.error("Failed to fetch vehicles:", err);
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
            statutFilter === "assigned" ? v.is_assigned : !v.is_assigned
        );
        }

        setFiltered(result);
    }, [marqueFilter, statutFilter, vehicles]);

    const handleDelete = async (vehiculeId: number) => {
        if (!window.confirm("Are you sure you want to delete this vehicle?"))
        return;

        const token = localStorage.getItem("token");
        try {
        await axios.delete(`http://localhost:5000/api/vehicules/${vehiculeId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setVehicles(vehicles.filter((v) => v.id !== vehiculeId));
        } catch (err) {
        alert("Delete failed.");
        console.error(err);
        }
    };

    return (
        <MainLayout>
        <Box pt={6} px={6}>
            <Heading
            size="lg"
            mb={6}
            color={headingColor}
            textAlign="center"
            fontWeight="semibold"
            >
            VEHICULES
            </Heading>

            <Flex
            direction={{ base: "column", md: "row" }}
            justify="center"
            align="center"
            gap={4}
            mb={8}
            >
            <Input
                placeholder="Rechercher par marque..."
                value={marqueFilter}
                onChange={(e) => setMarqueFilter(e.target.value)}
                w={{ base: "100%", md: "300px" }}
            />
            <Select
                value={statutFilter}
                onChange={(e) => setStatutFilter(e.target.value)}
                w={{ base: "100%", md: "200px" }}
            >
                <option value="">STATUT</option>
                <option value="assigned">Assignée</option>
                <option value="unassigned">Non Assignée</option>
            </Select>
            </Flex>

            <Box
            overflowX="auto"
            bg={cardBg}
            border="1px solid"
            borderColor={borderColor}
            borderRadius="lg"
            shadow="sm"
            >
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
                    {role === "FOURNISSEUR" && <Th>Actions</Th>}
                </Tr>
                </Thead>
                <Tbody>
                {filtered.map((v) => (
                    <Tr key={v.id} _hover={{ bg: "gray.50" }}>
                    <Td>
                        <Image
                        src={`http://localhost:5000/uploads/vehicules/${v.image_path
                            .split("\\")
                            .pop()}`}
                        alt={v.marque}
                        boxSize="56px"
                        objectFit="cover"
                        borderRadius="md"
                        />
                    </Td>
                    <Td>{v.marque}</Td>
                    <Td>{v.modele}</Td>
                    <Td>{v.carburant}</Td>
                    <Td color="blue.600" fontWeight="semibold">
                        {v.prix_jour} MAD
                    </Td>
                    <Td>{v.fournisseur.nom}</Td>
                    <Td>
                        {v.is_assigned ? (
                        <Badge colorScheme="red" variant="subtle">
                            Assignée
                        </Badge>
                        ) : (
                        <Badge colorScheme="green" variant="subtle">
                            Valable
                        </Badge>
                        )}
                    </Td>

                    {role === "FOURNISSEUR" && (
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
                        <Text color="gray.500">Aucune véhicule trouvée</Text>
                    </Td>
                    </Tr>
                )}
                </Tbody>
            </Table>
            </Box>
        </Box>
        </MainLayout>
    );
    };

    export default VehiclesPage;
