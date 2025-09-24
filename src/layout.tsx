import { Navbar } from "./components/navbar";
import { Outlet } from "react-router";
import { Sidebar } from "./components/sidebar";
import { useNavigation } from "react-router";
import LoadingBar from "react-top-loading-bar";
import { useRef, useEffect } from "react";
const ClientLayout = () => {
    const navigation = useNavigation();
    const topBarRef = useRef<any>(null);

    useEffect(() => {
        if (navigation.state === "loading") {
            topBarRef.current?.continuousStart();
        } else {
            topBarRef.current?.complete();
        }
    }, [navigation.state]);

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
