import { HeroUIProvider, ToastProvider } from "@heroui/react";
import AppRouter from "./routes";
import UserContextProvider from "./provider/UserContext";


const App = () => {
    return (
        <HeroUIProvider>
            <ToastProvider placement="bottom-right" toastOffset={5} />
            <UserContextProvider>
                <AppRouter />
            </UserContextProvider>
        </HeroUIProvider>
    );
};

export default App;
