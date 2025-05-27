    // import {
    // Home,
    // Car,
    // ClipboardList,
    // FileText,
    // Users,
    // LogOut,
    // } from "lucide-react";
    // import { Link, useLocation, useNavigate } from "react-router-dom";
    // import classNames from "classnames";
    // import { useContext, useState } from "react";
    // import { AuthContext } from "../context/AuthContext";

    // interface SidebarProps {
    // isOpen: boolean;
    // }

    // const Sidebar = ({ isOpen }: SidebarProps) => {
    // const { role } = useContext(AuthContext);
    // const location = useLocation();
    // const navigate = useNavigate();
    // const [showLogoutModal, setShowLogoutModal] = useState(false);

    // const handleConfirmLogout = () => {
    //     localStorage.removeItem("token");
    //     setShowLogoutModal(false);
    //     navigate("/");
    // };

    // const navItems =
    //     role === "FLEET_ADMIN"
    //     ? [
    //         { to: "/dashboard", icon: <Home size={18} />, label: "Dashboard" },
    //         { to: "/vehicles", icon: <Car size={18} />, label: "Véhicules" },
    //         {
    //             to: "/missions",
    //             icon: <ClipboardList size={18} />,
    //             label: "Demandes Missions",
    //         },
    //         { to: "/contracts", icon: <FileText size={18} />, label: "Contrats" },
    //         {
    //             to: "/missions-approuvees",
    //             icon: <Users size={18} />,
    //             label: "Missions Approuvées",
    //         },
    //         ]
    //     : role === "USER"
    //     ? [
    //         {
    //             to: "/vehicules-disponibles",
    //             icon: <Car size={18} />,
    //             label: "Véhicules disponibles",
    //         },
    //         {
    //             to: "/mes-missions",
    //             icon: <ClipboardList size={18} />,
    //             label: "Mes missions",
    //         },
    //         {
    //             to: "/mes-contrats",
    //             icon: <FileText size={18} />,
    //             label: "Mes contrats",
    //         },
    //         ]
    //     : role === "FOURNISSEUR"
    //     ? [
    //         {
    //             to: "/mes-vehicles-fournisseur",
    //             icon: <Car size={18} />,
    //             label: "Mes véhicules",
    //         },
    //         {
    //             to: "/mes-contrats-fournisseur",
    //             icon: <FileText size={18} />,
    //             label: "Contrats loués",
    //         },
    //         {
    //             to: "/demandes-locations-reçues",
    //             icon: <FileText size={18} />,
    //             label: "Demandes de location reçues",
    //         },
    //         ]
    //     : [];

    // const sidebarClasses = classNames(
    //     "fixed top-0 left-0 h-screen bg-white border-r shadow-md z-40 transition-transform duration-300",
    //     isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
    // );

    // return (
    //     <>
    //     <aside className={`${sidebarClasses} flex flex-col justify-between`}>
    //         {/* Top Section: Logo + Nav */}
    //         <div>
    //         <div className="py-6 px-4 text-2xl font-extrabold text-blue-600 tracking-wide text-center border-b">
    //             BC Skills
    //         </div>

    //         <nav className="mt-4 px-3 space-y-1">
    //             {navItems.map((item) => {
    //             const isActive = location.pathname === item.to;
    //             return (
    //                 <Link
    //                 key={item.to}
    //                 to={item.to}
    //                 className={classNames(
    //                     "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
    //                     isActive
    //                     ? "bg-blue-100 text-blue-700"
    //                     : "text-gray-700 hover:bg-gray-100"
    //                 )}
    //                 >
    //                 {item.icon}
    //                 {item.label}
    //                 </Link>
    //             );
    //             })}
    //         </nav>
    //         </div>

    //         {/* Bottom Section: Logout */}
    //         <div className="p-3">
    //         <button
    //             onClick={() => setShowLogoutModal(true)}
    //             className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 transition-all"
    //         >
    //             <LogOut size={18} />
    //             Logout
    //         </button>
    //         </div>
    //     </aside>

    //     {showLogoutModal && (
    //         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    //         <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
    //             <h2 className="text-lg font-semibold text-gray-800 mb-2">
    //             Confirmer la déconnexion
    //             </h2>
    //             <p className="text-sm text-gray-600 mb-6">
    //             Êtes-vous sûr de vouloir vous déconnecter ?
    //             </p>
    //             <div className="flex justify-end gap-3">
    //             <button
    //                 onClick={() => setShowLogoutModal(false)}
    //                 className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded"
    //             >
    //                 Annuler
    //             </button>
    //             <button
    //                 onClick={handleConfirmLogout}
    //                 className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
    //             >
    //                 Déconnexion
    //             </button>
    //             </div>
    //         </div>
    //         </div>
    //     )}
    //     </>
    // );
    // };

    // export default Sidebar;
    import {
        Home,
        Car,
        ClipboardList,
        FileText,
        Users,
        LogOut,
      } from 'lucide-react';
      import { Link, useLocation, useNavigate } from 'react-router-dom';
      import classNames from 'classnames';
      import { useContext, useState } from 'react';
      import { AuthContext } from '../context/AuthContext';
      
      interface SidebarProps {
        isOpen: boolean;
      }
      
      const Sidebar = ({ isOpen }: SidebarProps) => {
        const { role } = useContext(AuthContext);
        const location = useLocation();
        const navigate = useNavigate();
        const [showLogoutModal, setShowLogoutModal] = useState(false);
      
        const handleConfirmLogout = () => {
          localStorage.removeItem('token');
          setShowLogoutModal(false);
          navigate('/');
        };
      
        const navItems =
          role === 'FLEET_ADMIN'
            ? [
                { to: '/dashboard', icon: <Home size={18} />, label: 'Dashboard' },
                { to: '/vehicles', icon: <Car size={18} />, label: 'Véhicules' },
                { to: '/missions', icon: <ClipboardList size={18} />, label: 'Demandes Missions' },
                { to: '/contracts', icon: <FileText size={18} />, label: 'Contrats' },
                { to: '/missions-approuvees', icon: <Users size={18} />, label: 'Missions Approuvées' },
              ]
            : role === 'USER'
            ? [
                { to: '/vehicules-disponibles', icon: <Car size={18} />, label: 'Véhicules disponibles' },
                { to: '/mes-missions', icon: <ClipboardList size={18} />, label: 'Mes missions' },
                { to: '/mes-contrats', icon: <FileText size={18} />, label: 'Mes contrats' },
              ]
            : role === 'FOURNISSEUR'
            ? [
                { to: '/mes-vehicles-fournisseur', icon: <Car size={18} />, label: 'Mes véhicules' },
                { to: '/mes-contrats-fournisseur', icon: <FileText size={18} />, label: 'Contrats loués' },
                { to: '/demandes-locations-reçues', icon: <FileText size={18} />, label: 'Demandes de location reçues' }
              ]
            : [];
      
        const sidebarClasses = classNames(
          'fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-sm z-40 transition-transform duration-300',
          isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'
        );
      
        return (
          <>
            <aside className={`${sidebarClasses} flex flex-col justify-between`}>
              {/* Logo + Navigation */}
              <div>
                <div className="py-6 px-4 text-2xl font-bold text-teal-700 text-center border-b border-gray-200">
                  BC Skills
                </div>
      
                <nav className="mt-6 px-3 space-y-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.to;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        className={classNames(
                          'flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-teal-100 text-teal-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        )}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
      
              {/* Logout */}
              <div className="p-4">
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 transition-all"
                >
                  <LogOut size={18} />
                  Déconnexion
                </button>
              </div>
            </aside>
      
            {/* Logout Modal */}
            {showLogoutModal && (
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">Confirmer la déconnexion</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Êtes-vous sûr de vouloir vous déconnecter ?
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowLogoutModal(false)}
                      className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleConfirmLogout}
                      className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      };
      
      export default Sidebar;
      