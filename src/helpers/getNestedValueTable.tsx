export const getNestedValue = (obj: any, path: string) =>
    path.split(".").reduce((acc, key) => acc?.[key], obj);

export const capitalizeFirstLetter = (str: any) => {
    if (typeof str !== "string" || str.length === 0) {
        return str; // Handle empty strings or non-string inputs
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const onlyDate = (date: any) => ///2025-09-25 16:13:29
    new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
