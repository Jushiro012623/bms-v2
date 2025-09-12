import { HeroUIProvider, ToastProvider } from "@heroui/react";
import AppRouter from "./routes";

const App = () => {
    return (
        <HeroUIProvider>
            <ToastProvider placement="top-right" toastOffset={60}/>
            <AppRouter />
        </HeroUIProvider>
    );
};

export default App;
