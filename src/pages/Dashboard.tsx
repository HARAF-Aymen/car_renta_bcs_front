        // import React, { useEffect, useState } from 'react';
        // import type { JSX } from 'react';
        // import MainLayout from '../layouts/MainLayout';
        // import { fetchDashboardStats } from '../services/dashboardService';
        // import useAuthGuard from '../hooks/useAuthGuard';
        
        // import {
        // Car,
        // FileText,
        // ListOrdered,
        // TrendingUp,
        // Users,
        // } from 'lucide-react';
        
        // import {
        // BarChart,
        // Bar,
        // XAxis,
        // YAxis,
        // Tooltip,
        // ResponsiveContainer,
        // CartesianGrid,
        // } from 'recharts';
        
        // const Dashboard = () => {
        // useAuthGuard();
        // const [stats, setStats] = useState<any>(null);
        
        // useEffect(() => {
        //     const loadStats = async () => {
        //     try {
        //         const data = await fetchDashboardStats();
        //         setStats(data);
        //         console.log('📊 Chart Data:', data.monthly_rentals);
        //     } catch (err) {
        //         console.error('Failed to load dashboard stats:', err);
        //     }
        //     };
        
        //     loadStats();
        // }, []);
        
        // return (
        //     <MainLayout>
        //     <h1 className="text-3xl font-bold mb-8 text-gray-900">Tableau de bord - Fleet Admin</h1>
        
        //     {!stats ? (
        //         <p className="text-gray-600">Chargement des statistiques...</p>
        //     ) : (
        //         <>
        //         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        //             <StatCard
        //             icon={<Car className="text-blue-600" />}
        //             label="Véhicules au total"
        //             value={stats.total_vehicules}
        //             iconBg="bg-blue-100"
        //             />
        //             <StatCard
        //             icon={<TrendingUp className="text-green-600" />}
        //             label="Véhicules assignés"
        //             value={stats.assigned}
        //             iconBg="bg-green-100"
        //             />
        //             <StatCard
        //             icon={<ListOrdered className="text-yellow-600" />}
        //             label="Véhicules non assignés"
        //             value={stats.unassigned}
        //             iconBg="bg-yellow-100"
        //             />
        //             <StatCard
        //             icon={<FileText className="text-purple-600" />}
        //             label="Contrats ce mois"
        //             value={stats.contrats_ce_mois}
        //             iconBg="bg-purple-100"
        //             />
        //             <StatCard
        //             icon={<Users className="text-pink-600" />}
        //             label="Marques les plus louées"
        //             value={
        //                 Array.isArray(stats.top_marques) && stats.top_marques.length > 0
        //                 ? stats.top_marques.map((b: { marque: string }) => b.marque).join(', ')
        //                 : 'N/A'
        //             }
        //             iconBg="bg-pink-100"
        //             />
        //         </div>
        
        //         <div className="mt-10 bg-white p-6 rounded-xl shadow border border-gray-100">
        //             <h3 className="text-lg font-semibold mb-4 text-gray-800">
        //             Jours de location par mois
        //             </h3>
        //             <ResponsiveContainer width="100%" height={300}>
        //             <BarChart data={stats.monthly_rentals}>
        //                 <CartesianGrid strokeDasharray="3 3" />
        //                 <XAxis dataKey="month" />
        //                 <YAxis />
        //                 <Tooltip />
        //                 <Bar dataKey="days" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        //             </BarChart>
        //             </ResponsiveContainer>
        //         </div>
        //         </>
        //     )}
        //     </MainLayout>
        // );
        // };
        
        // const StatCard = ({
        // label,
        // value,
        // icon,
        // iconBg,
        // }: {
        // label: string;
        // value: string | number;
        // icon: JSX.Element;
        // iconBg: string;
        // }) => (
        // <div className="bg-white p-5 rounded-xl shadow hover:shadow-md border border-gray-100 flex items-center gap-4 transition-all duration-200">
        //     <div className={`p-3 ${iconBg} rounded-full`}>
        //     {icon}
        //     </div>
        //     <div>
        //     <p className="text-sm text-gray-500 mb-1">{label}</p>
        //     <h2 className="text-2xl font-semibold text-gray-900">{value}</h2>
        //     </div>
        // </div>
        // );
        
        // export default Dashboard;
        

        import React, { useEffect, useState } from 'react';
        import {
          Box,
          Heading,
          SimpleGrid,
          Text,
          Flex,
          Spinner,
          useColorModeValue,
        } from '@chakra-ui/react';
        import {
          Car,
          FileText,
          ListOrdered,
          TrendingUp,
          Users,
        } from 'lucide-react';
        import {
          BarChart,
          Bar,
          XAxis,
          YAxis,
          Tooltip,
          ResponsiveContainer,
          CartesianGrid,
        } from 'recharts';
        
        import MainLayout from '../layouts/MainLayout';
        import { fetchDashboardStats } from '../services/dashboardService';
        import useAuthGuard from '../hooks/useAuthGuard';
        import { StatCard } from './StatCard';
        
        const Dashboard = () => {
          useAuthGuard();
          const [stats, setStats] = useState<any>(null);
          const cardBg = useColorModeValue('white', 'gray.800');
        
          useEffect(() => {
            const loadStats = async () => {
              try {
                const data = await fetchDashboardStats();
                setStats(data);
                console.log('📊 Chart Data:', data.monthly_rentals);
              } catch (err) {
                console.error('Failed to load dashboard stats:', err);
              }
            };
            loadStats();
          }, []);
        
          return (
            <MainLayout>
              <Heading size="lg" mb={8} color="gray.800">
                Tableau de bord - Fleet Admin
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
                          ? stats.top_marques.map((b: { marque: string }) => b.marque).join(', ')
                          : 'N/A'
                      }
                      bg="pink.100"
                    />
                  </SimpleGrid>
        
                  <Box mt={10} bg={cardBg} p={6} rounded="lg" shadow="sm" border="1px solid" borderColor="gray.100">
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
        