import { HeroUIProvider, ToastProvider } from "@heroui/react";
import AppRouter from "./routes";
import { useEffect, useState } from "react";
import Loader from "./components/loader";

const App = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <Loader />
        );
    }
    return (
        <HeroUIProvider>
            <ToastProvider placement="top-right" toastOffset={60} />
            <AppRouter />
        </HeroUIProvider>
    );
};

export default App;
