import { createBrowserRouter, RouterProvider } from "react-router";
import { ClientLayout } from "./layout";
import HomePage from "./pages/home-page";
import RequestFormPage from "./pages/documents/request-form";
import HistoryPage from "./pages/documents/history-page";
import TypesPages from "./pages/documents/types-page";
import ErrorPage from "./pages/error-page";
import ViewForm from "./pages/documents/view-form";
import ProfilePage from "./pages/profile-page";
import FAQPage from "./pages/faq-page";
import PaymentGatewayPage from "./pages/payment-page";
import LoginPage from "./pages/auth/login";
import {useContext} from "react";
import {UserContext} from "./provider/UserContext.tsx";
import Loader from "./components/loader";

const router = createBrowserRouter([
    {
        path: "/",
        Component: ClientLayout,
        children: [
            { index: true, Component: HomePage },
            {
                path: "documents",
                children: [
                    { index: true, Component: HistoryPage },
                    { path: "form-request", Component: RequestFormPage },
                    { path: "availables", Component: TypesPages },
                    { path: "view", Component: ViewForm },
                ],
            },
            { path: "/home", Component: HomePage },
            { path: "/user/profile", Component: ProfilePage },
            { path: "/faq", Component: FAQPage },
            { path: "/payment-gateway", Component: PaymentGatewayPage },
        ],
    },
    {
        path: "/login",
        Component: LoginPage,
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

const AppRouter = () => {
    const {loading} = useContext(UserContext)
        return loading ? <Loader />:
    <RouterProvider router={router}/>
};

export default AppRouter;
