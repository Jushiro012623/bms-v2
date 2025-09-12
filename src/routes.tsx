import { createBrowserRouter, RouterProvider } from "react-router";
import { ClientLayout } from "./layout";
import HomePage from "./pages/home-page";
import RequestFormPage from "./pages/documents/request-form";
import HistoryPage from "./pages/documents/history-page";
import TypesPages from "./pages/documents/types-page";

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
        { label: "Availables", path: "/documents/availables" },
    ],
    "/documents/form-update": [
        { label: "Document", path: "/documents" },
        { label: "Update Form", path: "/documents/update-request" },
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
                    { path: "form-update", Component: TypesPages },
                ],
            },
        ],
    },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
