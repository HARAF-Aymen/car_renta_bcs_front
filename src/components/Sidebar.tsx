
        import { Home, Car, ClipboardList, FileText, Users, LogOut } from 'lucide-react';
        import { Link, useLocation, useNavigate } from 'react-router-dom';
        import classNames from 'classnames';
        import { useState } from 'react';
        
        const navItems = [
        { to: '/dashboard', icon: <Home size={18} />, label: 'Dashboard' },
        { to: '/vehicles', icon: <Car size={18} />, label: 'Vehicles' },
        { to: '/missions', icon: <ClipboardList size={18} />, label: 'Missions' },
        { to: '/contracts', icon: <FileText size={18} />, label: 'Contracts' },
        { to: '/users', icon: <Users size={18} />, label: 'Users' },
        ];
        
        const Sidebar = () => {
        const location = useLocation();
        const navigate = useNavigate();
        const [showLogoutModal, setShowLogoutModal] = useState(false);
        
        const handleConfirmLogout = () => {
            localStorage.removeItem('token');
            setShowLogoutModal(false);
            navigate('/login');
        };
        
        return (
            <>
            <aside className="w-64 bg-white border-r shadow-md h-screen fixed left-0 top-0 z-50">
                <div className="py-6 px-4 text-2xl font-extrabold text-blue-600 tracking-wide text-center">
                BC Skills
                </div>
                <nav className="mt-6 flex flex-col gap-1 px-3">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.to;
                    return (
                    <Link
                        key={item.to}
                        to={item.to}
                        className={classNames(
                        'flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        isActive
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        )}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                    );
                })}
                <button
                    onClick={() => setShowLogoutModal(true)}
                    className="mt-6 flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 transition-all"
                >
                    <LogOut size={18} />
                    Logout
                </button>
                </nav>
            </aside>
        
            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Logout</h2>
                    <p className="text-sm text-gray-600 mb-6">Are you sure you want to logout?</p>
                    <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setShowLogoutModal(false)}
                        className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirmLogout}
                        className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                        Logout
                    </button>
                    </div>
                </div>
                </div>
            )}
            </>
        );
        };
        
        export default Sidebar;
        