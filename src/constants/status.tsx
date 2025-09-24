export const REQUEST_STATUS: any = {
    pending: "bg-yellow-200 text-yellow-600 dark:bg-yellow-300 dark:text-yellow-800",
    approved: "bg-green-200 text-green-600 dark:bg-green-300 dark:text-green-800",
    rejected: "bg-red-300 text-red-600 dark:bg-red-400 dark:text-red-800",
    released: "bg-violet-300 text-violet-600 dark:bg-violet-400 dark:text-violet-800",
};
export const REQUEST_STATUS_STRING: any = {
    pending: "1",
    approved: "2",
    rejected: "3",
    released: "4",
};

export const REQUEST_STATUS_NUMBER: Record<string, string> = {
    "1": "pending",
    "2": "approved",
    "3": "rejected",
    "4": "released",
    "10": "all", // treat All as special
};

export const HTTP_STATUS_TEXT: Record<number, { title: string; message: string }> = {
    400: {
        title: "Bad Request",
        message:
            "The server could not understand your request. Please try again.",
    },
    401: {
        title: "Unauthorized",
        message: "You must be logged in to access this page.",
    },
    403: {
        title: "Forbidden",
        message: "You don’t have permission to view this resource.",
    },
    404: {
        title: "Not Found",
        message:
            "Sorry, the page you’re looking for doesn’t exist or has been moved.",
    },
    408: {
        title: "Request Timeout",
        message: "The server took too long to respond. Please try again later.",
    },
    429: {
        title: "Too Many Requests",
        message:
            "You’ve sent too many requests. Please slow down and try again.",
    },
    500: {
        title: "Internal Server Error",
        message: "Something went wrong on our end. Please try again later.",
    },
    502: {
        title: "Bad Gateway",
        message:
            "The server received an invalid response. Try refreshing the page.",
    },
    503: {
        title: "Service Unavailable",
        message:
            "The server is temporarily unavailable. Please try again later.",
    },
    504: {
        title: "Gateway Timeout",
        message: "The server took too long to respond. Please try again later.",
    },
};
