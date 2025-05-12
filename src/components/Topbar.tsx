    const Topbar = () => {
        return (
        <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-700">Car Rental Dashboard</div>
            <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-blue-600">🔍</button>
            <button className="text-gray-600 hover:text-blue-600">🌙</button>
            <div className="rounded-full bg-blue-600 text-white px-3 py-1">Admin</div>
            </div>
        </header>
        );
    };
    
    export default Topbar;
    