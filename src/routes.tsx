import { createBrowserRouter, RouterProvider } from "react-router";
import { ClientLayout } from "./layout";
import HomePage from "./pages/home-page";
import RequestFormPage from "./pages/documents/request-form";
import HistoryPage from "./pages/documents/history-page";
import TypesPages from "./pages/documents/types-page";
import ErrorPage from "./pages/error-page";
import ViewForm from "./pages/documents/view-form";
import ProfilePage from "./pages/profile-page";

export const appPath: Record<string, { label: string; path: string }[]> = {
    "/documents": [
        { label: "Document", path: "/documents" },
        { label: "History", path: "/documents" }
    ],
    "/documents/form-request": [
        { label: "Document", path: "/documents" },
        { label: "Form Request", path: "/documents/form-request" },
    ],
    "/documents/availables": [
        { label: "Document", path: "/documents" },
        { label: "Available", path: "/documents/availables" },
    ],
    "/documents/view": [
        { label: "Document", path: "/documents" },
        { label: "View Form", path: "/documents/view" },
    ],
    "/profile": [
        { label: "Profile", path: "/profile" },
    ],
};

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
            { path: '/profile', Component: ProfilePage },
        ],
    },
    {
        path: "*",
        element: <ErrorPage />
    }
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
