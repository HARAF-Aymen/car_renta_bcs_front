// import React, { useEffect, useState } from 'react';
// import type { JSX } from 'react'; // ✅ Fixes JSX.Element type
// import MainLayout from '../layouts/MainLayout';
// import { fetchDashboardStats } from '../services/dashboardService';
// import {
//     Car,
//     FileText,
//     ListOrdered,
//     TrendingUp,
//     Users,
// } from 'lucide-react';



//     const Dashboard = () => {
//     const [stats, setStats] = useState<any>(null);

//     useEffect(() => {
//         const loadStats = async () => {
//         try {
//             const data = await fetchDashboardStats();
//             setStats(data);
//         } catch (err) {
//             console.error('Failed to load dashboard stats:', err);
//         }
//         };

//         loadStats();
//     }, []);

//     return (
//         <MainLayout>
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">
//             Welcome to the Fleet Admin Dashboard
//         </h1>

//         {!stats ? (
//             <p className="text-gray-600">Loading...</p>
//         ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             <StatCard
//                 icon={<Car className="text-blue-600" />}
//                 label="Total Vehicles"
//                 value={stats.total_vehicules}
//             />
//             <StatCard
//                 icon={<TrendingUp className="text-green-600" />}
//                 label="Assigned Vehicles"
//                 value={stats.assigned}
//             />
//             <StatCard
//                 icon={<ListOrdered className="text-yellow-600" />}
//                 label="Unassigned Vehicles"
//                 value={stats.unassigned}
//             />
//             <StatCard
//                 icon={<FileText className="text-purple-600" />}
//                 label="Contracts This Month"
//                 value={stats.contrats_ce_mois}
//             />
//             <StatCard
//                 icon={<Users className="text-pink-600" />}
//                 label="Top Rented Brands"
//                 value={
//                 Array.isArray(stats.top_marques) && stats.top_marques.length > 0
//                     ? stats.top_marques.map((b: { marque: string }) => b.marque).join(', ')
//                     : 'N/A'
//                 }
//             />
//             </div>
//         )}
//         </MainLayout>
//     );
//     };

//     const StatCard = ({
//     label,
//     value,
//     icon,
//     }: {
//     label: string;
//     value: string | number;
//     icon: JSX.Element;
//     }) => (
//     <div className="bg-white p-5 rounded shadow border border-gray-100 flex items-center gap-4">
//         <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
//         <div>
//         <p className="text-sm text-gray-500 mb-1">{label}</p>
//         <h2 className="text-2xl font-semibold text-blue-700">{value}</h2>
//         </div>
//     </div>
//     );

//     export default Dashboard;
    import React, { useEffect, useState } from 'react';
    import type { JSX } from 'react';
    import MainLayout from '../layouts/MainLayout';
    import { fetchDashboardStats } from '../services/dashboardService';
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

    const Dashboard = () => {
    const [stats, setStats] = useState<any>(null);

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
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Welcome to the Fleet Admin Dashboard
        </h1>

        {!stats ? (
            <p className="text-gray-600">Loading...</p>
        ) : (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <StatCard
                icon={<Car className="text-blue-600" />}
                label="Total Vehicles"
                value={stats.total_vehicules}
                />
                <StatCard
                icon={<TrendingUp className="text-green-600" />}
                label="Assigned Vehicles"
                value={stats.assigned}
                />
                <StatCard
                icon={<ListOrdered className="text-yellow-600" />}
                label="Unassigned Vehicles"
                value={stats.unassigned}
                />
                <StatCard
                icon={<FileText className="text-purple-600" />}
                label="Contracts This Month"
                value={stats.contrats_ce_mois}
                />
                <StatCard
                icon={<Users className="text-pink-600" />}
                label="Top Rented Brands"
                value={
                    Array.isArray(stats.top_marques) && stats.top_marques.length > 0
                    ? stats.top_marques.map((b: { marque: string }) => b.marque).join(', ')
                    : 'N/A'
                }
                />
            </div>

            {/* Chart Section */}
            <div className="mt-10 bg-white p-6 rounded shadow border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Rental Days Per Month
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.monthly_rentals}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="days" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </div>
            </>
        )}
        </MainLayout>
    );
    };

    const StatCard = ({
    label,
    value,
    icon,
    }: {
    label: string;
    value: string | number;
    icon: JSX.Element;
    }) => (
    <div className="bg-white p-5 rounded shadow border border-gray-100 flex items-center gap-4">
        <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
        <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <h2 className="text-2xl font-semibold text-blue-700">{value}</h2>
        </div>
    </div>
    );

    export default Dashboard;
