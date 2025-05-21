        import { ReactNode, useState } from 'react';
        import Sidebar from '../components/Sidebar';
        import Topbar from '../components/Topbar';
        
        interface MainLayoutProps {
        children: ReactNode;
        }
        
        const MainLayout = ({ children }: MainLayoutProps) => {
        const [isSidebarOpen, setIsSidebarOpen] = useState(true);
        
        return (
            <div className="bg-gray-50 min-h-screen">
            <Sidebar isOpen={isSidebarOpen} />
            <Topbar toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
            <main className={`pt-16 transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-20'}`}>
                {children}
            </main>
            </div>
        );
        };
        
        export default MainLayout;
        