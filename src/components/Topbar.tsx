
    import axios from "axios";
import { Bell, FileText, HelpCircle, LogOut, Menu, Moon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
    
    interface TopbarProps {
      toggleSidebar: () => void;
    }
    
    const Topbar = ({ toggleSidebar }: TopbarProps) => {
      const [currentTime, setCurrentTime] = useState<string>("");
      const [contractCount, setContractCount] = useState<number>(0);
      const { role } = useContext(AuthContext);
    
      useEffect(() => {
        const updateTime = () => {
          const now = new Date();
          setCurrentTime(
            now.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          );
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
      }, []);
    
      // useEffect(() => {
      //   const fetchContracts = async () => {
      //     try {
      //       const res = await axios.get("http://localhost:5000/api/contrats/", {
      //         headers: {
      //           Authorization: `Bearer ${localStorage.getItem("token")}`,
      //         },
      //       });
      //       setContractCount(res.data.length);
      //     } catch (err) {
      //       console.error("Erreur lors du chargement des contrats:", err);
      //     }
      //   };
    
      //   fetchContracts();
      // }, []);
    useEffect(() => {
    const fetchContracts = async () => {
      try {
        const token = localStorage.getItem("token");
        let url = "http://localhost:5000/api/contrats/";

        if (role === "USER") {
          url += "mes";
        }

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setContractCount(res.data.length);
      } catch (err) {
        console.error("Erreur lors du chargement des contrats:", err);
      }
    };

    fetchContracts();
  }, [role]);

      return (
        <header className="fixed top-0 left-0 h-16 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm flex items-center justify-between px-6">
          {/* Left side: menu, clock, help */}
          <div className="flex items-center gap-5 text-sm text-gray-600">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 transition"
            >
              <Menu size={20} />
            </button>
    
            <span className="font-medium text-gray-800">{currentTime}</span>
    
            <button
              title="Aide & Documentation"
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition"
            >
              <HelpCircle size={18} />
              <span>Aide</span>
            </button>
          </div>
    
          {/* Right side: notifications, contracts, user info */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button
              title="Notifications"
              className="relative p-2 rounded-full hover:bg-gray-100 transition"
            >
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full px-1.5">
                3
              </span>
            </button>
    
            {/* Contract count */}
            <div className="flex items-center gap-1 text-sm text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full font-medium">
              <FileText size={16} />
              <span>{contractCount} contrats</span>
            </div>
    
            {/* Role */}
            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              {role || "Unknown"}
            </span>
    
            {/* Dark mode toggle */}
            <button
              title="Mode sombre"
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition"
            >
              <Moon size={18} />
            </button>
    
            {/* Admin + Logout */}
            <div className="flex items-center gap-2 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              <span>Admin</span>
              <LogOut size={16} className="cursor-pointer" />
            </div>
          </div>
        </header>
      );
    };
    
    export default Topbar;
    