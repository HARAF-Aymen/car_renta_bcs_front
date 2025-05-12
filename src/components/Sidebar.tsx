    const Sidebar = () => {
        return (
        <aside className="w-64 bg-white shadow-lg h-full">
            <div className="p-4 font-bold text-xl text-center border-b">BC Skills</div>
            <nav className="mt-4">
            <ul className="space-y-2 px-4">
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Dashboard</li>
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Vehicles</li>
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Missions</li>
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Contracts</li>
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Users</li>
            </ul>
            </nav>
        </aside>
        );
    };
    
    export default Sidebar;
    