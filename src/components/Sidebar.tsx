    import { Home, Car, ClipboardList, FileText, Users } from 'lucide-react';
    import { Link, useLocation } from 'react-router-dom';
    import classNames from 'classnames';

    const navItems = [
    { to: '/dashboard', icon: <Home size={18} />, label: 'Dashboard' },
    { to: '/vehicles', icon: <Car size={18} />, label: 'Vehicles' },
    { to: '/missions', icon: <ClipboardList size={18} />, label: 'Missions' },
    { to: '/contracts', icon: <FileText size={18} />, label: 'Contracts' },
    { to: '/users', icon: <Users size={18} />, label: 'Users' },
    ];

    const Sidebar = () => {
    const location = useLocation();

    return (
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
        </nav>
        </aside>
    );
    };

    export default Sidebar;
