
            // import { Bell, FileText, HelpCircle, LogOut, Menu, Moon } from 'lucide-react';
            // import { useEffect, useState } from 'react';
            
            // interface TopbarProps {
            // toggleSidebar: () => void;
            // }
            
            // const Topbar = ({ toggleSidebar }: TopbarProps) => {
            // const [currentTime, setCurrentTime] = useState<string>("");
            
            // useEffect(() => {
            //     const updateTime = () => {
            //     const now = new Date();
            //     setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
            //     };
            //     updateTime();
            //     const interval = setInterval(updateTime, 1000);
            //     return () => clearInterval(interval);
            // }, []);
            
            // return (
            //     <header className="fixed top-0 left-0 h-16 w-full z-[999] bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm flex items-center justify-between px-6 transition-all duration-300">
            //     <div className="flex items-center gap-4 text-sm text-gray-600">
            //         <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-100">
            //         <Menu size={20} />
            //         </button>
            //         <span className="font-medium">{currentTime}</span>
            //         <button title="Aide & Documentation" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
            //         <HelpCircle size={18} />
            //         <span>Aide</span>
            //         </button>
            //     </div>
            
            //     <div className="flex items-center gap-4">
            //         <button title="Notifications" className="relative p-2 rounded-full hover:bg-gray-100 transition">
            //         <Bell size={18} />
            //         <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5">3</span>
            //         </button>
            //         <button title="Contrats en attente" className="flex items-center gap-1 text-sm text-gray-700 bg-yellow-100 px-2 py-1 rounded-full hover:bg-yellow-200 transition">
            //         <FileText size={16} />
            //         <span>2 contrats</span>
            //         </button>
            //         <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Fleet Admin</div>
            //         <button title="Mode sombre" className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition">
            //         <Moon size={18} />
            //         </button>
            //         <div className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            //         <span>Admin</span>
            //         <LogOut size={16} className="cursor-pointer" />
            //         </div>
            //     </div>
            //     </header>
            // );
            // };
            
            // export default Topbar;
            
            import { Bell, FileText, HelpCircle, LogOut, Menu, Moon } from 'lucide-react';
            import { useEffect, useState, useContext } from 'react';
            import axios from 'axios';
            import { AuthContext } from '../context/AuthContext';
            
            interface TopbarProps {
              toggleSidebar: () => void;
            }
            
            const Topbar = ({ toggleSidebar }: TopbarProps) => {
              const [currentTime, setCurrentTime] = useState<string>('');
              const [contractCount, setContractCount] = useState<number>(0);
              const { role } = useContext(AuthContext); // ✅ you only have `role`
            
              useEffect(() => {
                const updateTime = () => {
                  const now = new Date();
                  setCurrentTime(
                    now.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })
                  );
                };
                updateTime();
                const interval = setInterval(updateTime, 1000);
                return () => clearInterval(interval);
              }, []);
            
              useEffect(() => {
                const fetchContracts = async () => {
                  try {
                    const res = await axios.get('http://localhost:5000/api/contrats/', {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                      },
                    });
                    setContractCount(res.data.length);
                  } catch (err) {
                    console.error('Erreur lors du chargement des contrats:', err);
                  }
                };
            
                fetchContracts();
              }, []);
            
              return (
                <header className="fixed top-0 left-0 h-16 w-full z-[999] bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm flex items-center justify-between px-6 transition-all duration-300">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-100">
                      <Menu size={20} />
                    </button>
                    <span className="font-medium">{currentTime}</span>
                    <button
                      title="Aide & Documentation"
                      className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition"
                    >
                      <HelpCircle size={18} />
                      <span>Aide</span>
                    </button>
                  </div>
            
                  <div className="flex items-center gap-4">
                    <button
                      title="Notifications"
                      className="relative p-2 rounded-full hover:bg-gray-100 transition"
                    >
                      <Bell size={18} />
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5">
                        3
                      </span>
                    </button>
            
                    {/* ✅ Contract count from backend */}
                    <button
                      title="Contrats en attente"
                      className="flex items-center gap-1 text-sm text-gray-700 bg-yellow-100 px-2 py-1 rounded-full hover:bg-yellow-200 transition"
                    >
                      <FileText size={16} />
                      <span>{contractCount} contrats</span>
                    </button>
            
                    {/* ✅ Role from context */}
                    <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {role || 'Unknown'}
                    </div>
            
                    {/* Static user name (fallback to "Admin") */}
                    <button
                      title="Mode sombre"
                      className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition"
                    >
                      <Moon size={18} />
                    </button>
            
                    <div className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      <span>Admin</span>
                      <LogOut size={16} className="cursor-pointer" />
                    </div>
                  </div>
                </header>
              );
            };
            
            export default Topbar;
            