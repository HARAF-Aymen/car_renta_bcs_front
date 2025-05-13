    import { ReactNode } from 'react';
    import Sidebar from '../components/Sidebar';
    import Topbar from '../components/Topbar';

    interface MainLayoutProps {
    children: ReactNode;
    }

    const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="bg-gray-50 min-h-screen">
        <Sidebar />
        <Topbar />
        <main className="pt-20 pl-64 px-6">{children}</main>
        </div>
    );
    };

    export default MainLayout;
