import { HeroUIProvider, ToastProvider } from "@heroui/react";
import AppRouter from "./routes";
import { useEffect, useState } from "react";
import Loader from "./components/loader";

const App = () => {
    const [fullPageLoading, setFullPageLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setFullPageLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <HeroUIProvider>
            {fullPageLoading && <Loader />}
            <ToastProvider placement="bottom-right" toastOffset={5} />
            <AppRouter />
        </HeroUIProvider>
    );
};

export default App;
