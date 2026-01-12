import { addToast } from "@heroui/react";

export const showToast = (
    title: string,
    desc: string,
    color: string,
    indicatorColor: string,
    type: "success" | "default" | "foreground" | "primary" | "secondary" | "warning" | "danger" | undefined = "success",
) =>
    addToast({
        title: title,
        description: desc,
        color: type,
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        classNames: {
            base: `${color} border-none text-white`,
            title: "text-white z-10",
            description: "text-white z-10",
            icon: "z-10",
            progressIndicator: indicatorColor,
        },
    });
