    import { ReactNode } from 'react';
    import Sidebar from '../components/Sidebar';
    import Topbar from '../components/Topbar';

    interface MainLayoutProps {
    children: ReactNode;
    }

    const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex flex-col flex-1">
            <Topbar />
            <main className="p-4 overflow-y-auto flex-1">{children}</main>
        </div>
        </div>
    );
    };

    export default MainLayout;
