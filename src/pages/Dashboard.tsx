    import React, { useEffect, useState } from "react";
    import {
    Box,
    Heading,
    SimpleGrid,
    Text,
    Flex,
    Spinner,
    useColorModeValue,
    } from "@chakra-ui/react";
    import { Car, FileText, ListOrdered, TrendingUp, Users } from "lucide-react";
    import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    } from "recharts";

    import MainLayout from "../layouts/MainLayout";
    import { fetchDashboardStats } from "../services/dashboardService";
    import useAuthGuard from "../hooks/useAuthGuard";
    import { StatCard } from "./StatCard";

    const Dashboard = () => {
    useAuthGuard();
    const [stats, setStats] = useState<any>(null);
    const cardBg = useColorModeValue("white", "gray.800");

    useEffect(() => {
        const loadStats = async () => {
        try {
            const data = await fetchDashboardStats();
            setStats(data);
            console.log("📊 Chart Data:", data.monthly_rentals);
        } catch (err) {
            console.error("Failed to load dashboard stats:", err);
        }
        };
        loadStats();
    }, []);

    return (
        <MainLayout>
        <Heading size="lg" mb={8} color="gray.800">
            Tableau de bord
        </Heading>

        {!stats ? (
            <Flex justify="center" align="center" minH="200px">
            <Spinner size="lg" />
            </Flex>
        ) : (
            <>
            <SimpleGrid columns={{ base: 1, sm: 2, xl: 3 }} spacing={6}>
                <StatCard
                icon={<Car size={24} color="#3182CE" />}
                label="Véhicules au total"
                value={stats.total_vehicules}
                bg="blue.100"
                />
                <StatCard
                icon={<TrendingUp size={24} color="#38A169" />}
                label="Véhicules assignés"
                value={stats.assigned}
                bg="green.100"
                />
                <StatCard
                icon={<ListOrdered size={24} color="#D69E2E" />}
                label="Véhicules non assignés"
                value={stats.unassigned}
                bg="yellow.100"
                />
                <StatCard
                icon={<FileText size={24} color="#805AD5" />}
                label="Contrats ce mois"
                value={stats.contrats_ce_mois}
                bg="purple.100"
                />
                <StatCard
                icon={<Users size={24} color="#D53F8C" />}
                label="Marques les plus louées"
                value={
                    Array.isArray(stats.top_marques) && stats.top_marques.length > 0
                    ? stats.top_marques
                        .map((b: { marque: string }) => b.marque)
                        .join(", ")
                    : "N/A"
                }
                bg="pink.100"
                />
            </SimpleGrid>

            <Box
                mt={10}
                bg={cardBg}
                p={6}
                rounded="lg"
                shadow="sm"
                border="1px solid"
                borderColor="gray.100"
            >
                <Heading size="md" mb={4} color="gray.700">
                Jours de location par mois
                </Heading>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.monthly_rentals}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="days" fill="#3182CE" radius={[6, 6, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </Box>
            </>
        )}
        </MainLayout>
    );
    };

    export default Dashboard;
