
        // import { Bell, FileText, HelpCircle, LogOut, Menu, Moon } from 'lucide-react';
        // import { useEffect, useState } from 'react';
        
        // const Topbar = () => {
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
        //     <header className="fixed top-0 left-[16rem] w-[calc(100%-16rem)] h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm flex items-center justify-between px-6 z-[999]">


        //     {/* Left side: Time + Help */}
        //     <div className="flex items-center gap-6 text-sm text-gray-600">
        //         <span className="font-medium">{currentTime}</span>
        
        //         <button
        //         title="Aide & Documentation"
        //         className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition"
        //         >
        //         <HelpCircle size={18} />
        //         <span>Aide</span>
        //         </button>
        //     </div>
        
        //     {/* Right side: Actions */}
        //     <div className="flex items-center gap-4">
        //         {/* Notifications */}
        //         <button title="Notifications" className="relative p-2 rounded-full hover:bg-gray-100 transition">
        //         <Bell size={18} />
        //         <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5">
        //             3
        //         </span>
        //         </button>
        
        //         {/* Contracts Pending */}
        //         <button
        //         title="Contrats en attente"
        //         className="flex items-center gap-1 text-sm text-gray-700 bg-yellow-100 px-2 py-1 rounded-full hover:bg-yellow-200 transition"
        //         >
        //         <FileText size={16} />
        //         <span>2 contrats</span>
        //         </button>
        
        //         {/* Quick Links Dropdown (static for now) */}
        //         <div className="relative group">
        //         <button
        //             title="Liens rapides"
        //             className="p-2 rounded-full hover:bg-gray-100 transition"
        //         >
        //             <Menu size={18} />
        //         </button>
        //         <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
        //             <a href="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100">Dashboard</a>
        //             <a href="/missions" className="block px-4 py-2 text-sm hover:bg-gray-100">Missions</a>
        //             <a href="/vehicules" className="block px-4 py-2 text-sm hover:bg-gray-100">Véhicules</a>
        //         </div>
        //         </div>
        
        //         {/* Role */}
        //         <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Fleet Admin</div>
        
        //         {/* Dark mode toggle */}
        //         <button
        //         title="Mode sombre"
        //         className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition"
        //         >
        //         <Moon size={18} />
        //         </button>
        
        //         {/* Profile / Logout */}
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
        import { useEffect, useState } from 'react';
        
        interface TopbarProps {
          toggleSidebar: () => void;
        }
        
        const Topbar = ({ toggleSidebar }: TopbarProps) => {
          const [currentTime, setCurrentTime] = useState<string>("");
        
          useEffect(() => {
            const updateTime = () => {
              const now = new Date();
              setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
            };
            updateTime();
            const interval = setInterval(updateTime, 1000);
            return () => clearInterval(interval);
          }, []);
        
          return (
            <header className="fixed top-0 left-0 h-16 w-full z-[999] bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm flex items-center justify-between px-6 transition-all duration-300">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-100">
                  <Menu size={20} />
                </button>
                <span className="font-medium">{currentTime}</span>
                <button title="Aide & Documentation" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
                  <HelpCircle size={18} />
                  <span>Aide</span>
                </button>
              </div>
        
              <div className="flex items-center gap-4">
                <button title="Notifications" className="relative p-2 rounded-full hover:bg-gray-100 transition">
                  <Bell size={18} />
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1.5">3</span>
                </button>
                <button title="Contrats en attente" className="flex items-center gap-1 text-sm text-gray-700 bg-yellow-100 px-2 py-1 rounded-full hover:bg-yellow-200 transition">
                  <FileText size={16} />
                  <span>2 contrats</span>
                </button>
                <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Fleet Admin</div>
                <button title="Mode sombre" className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition">
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
        