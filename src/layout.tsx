import { Navbar } from "./components/navbar";
import { Navigate, Outlet, useLocation } from "react-router";
import { Sidebar } from "./components/sidebar";
import { useNavigation } from "react-router";
import LoadingBar from "react-top-loading-bar";
import { useRef, useEffect, useContext } from "react";
import { UserContext } from "./provider/UserContext";
const ClientLayout = () => {
    const navigation = useNavigation();
    const topBarRef = useRef<any>(null);
    const { token, isAuthenticated } = useContext<any>(UserContext);
    const location = useLocation();

    useEffect(() => {
        if (navigation.state === "loading") {
            topBarRef.current?.continuousStart();
        } else {
            topBarRef.current?.complete();
        }
    }, [navigation.state]);

    // render-time redirect to avoid flashing child content
    if ((!token && !isAuthenticated) && location.pathname !== "/login") {

        return <Navigate to="/login" replace />;
    }

    return (
        <main className="flex h-screen overflow-hidden">
            <LoadingBar color="#6075e2" ref={topBarRef} shadow={true} />
            {/* {topBarRef.current?.complete() && <Loader />} */}
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
