import React, { type ComponentType } from "react";
import { TakenSVG } from "../../components/icons/undraw/taken";
import { Button } from "@heroui/react";
import { HTTP_STATUS_TEXT } from "../../constants/status";
import SEO from "../../components/seo";
import { useNavigate } from "react-router";

interface ErrorPageProps {
    statusCode?: number;
    icon?: ComponentType<{ size?: number; className?: string }>;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
    statusCode = 500,
    icon: Icon = TakenSVG,
}) => {
    const navigate = useNavigate();
    const { title, message } = HTTP_STATUS_TEXT[statusCode] || {
        title: "Unknown Error",
        message: "Something went wrong. Please try again later.",
    };

    return (
        <SEO title={title} description={`${message}`}>
            <main className="z-10 min-h-screen fixed top-0 left-0 w-full flex items-center justify-center flex-col bg-gray-100 dark:bg-zinc-900 px-6 text-center">
                <Icon size={400} className="text-primera animate-bounce-slow" />

                <h1 className="text-8xl font-extrabold text-primera drop-shadow-sm">
                    {statusCode}
                </h1>

                <p className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-500">
                    {title}
                </p>

                <p className="mt-2 text-gray-500 dark:text-gray-300 max-w-md">
                    {message}
                </p>

                <Button
                    onPress={() => navigate("/")}
                    className="mt-8 inline-block bg-primera text-white px-6 py-3 rounded-xl shadow hover:bg-primera/90 transition-all duration-300">
                    Back to Home
                </Button>
            </main>
        </SEO>
    );
};

export default ErrorPage;
