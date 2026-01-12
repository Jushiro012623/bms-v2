import { addToast } from "@heroui/react";

export const handleAxiosError = (error: any, setter: any = () => null) => {
    const requestResponseError = error?.response?.data?.error;

    if (error.response) {

        const { errors, title, detail } = error.response.data;

        const details: Record<string, string> = {};
        
        if (errors) {
            Object.entries(errors).forEach(([field, msgs]) => {
                details[field] = (msgs as string[])[0];
            });
        }

        setter(details);

        return addToast({
            title: title,
            description: detail,
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
        });
    } else if (error.request) {
        return addToast({
            title: "Our server is currently unavailable.",
            description: "Please try again later.",
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
        });
    } else {
        return addToast({
            title: requestResponseError.title,
            description: requestResponseError.detail[0],
            color: "danger",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
        });
    }
};
