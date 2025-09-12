import { Navbar } from "./components/navbar";
import { Outlet } from "react-router";
import { Sidebar } from "./components/sidebar";

const ClientLayout = () => {
    return (
        <main className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <Navbar />
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </main>
    );
};

export { ClientLayout };
