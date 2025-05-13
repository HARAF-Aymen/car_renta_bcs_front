    import { Moon, Search } from 'lucide-react';

    const Topbar = () => {
    return (
        <header className="w-full h-16 bg-white border-b shadow-sm pl-64 fixed top-0 z-40 flex items-center justify-between px-6">
        <div className="flex items-center gap-3 w-full max-w-md">
            <Search size={18} className="text-gray-500" />
            <input
            type="text"
            placeholder="Search..."
            className="w-full text-sm px-3 py-2 bg-gray-100 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div className="flex items-center gap-4">
            {/* Dark mode toggle */}
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <Moon size={18} />
            </button>

            {/* Profile badge */}
            <div className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            <span>Admin</span>
            </div>
        </div>
        </header>
    );
    };

    export default Topbar;
