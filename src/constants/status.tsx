export const REQUEST_STATUS: any = {
    pending: "bg-yellow-200 text-yellow-600",
    approved: "bg-green-200 text-green-600",
    rejected: "bg-red-300 text-red-600",
    released: "bg-violet-300 text-violet-600",
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
