export const rows = [
    {
        id: 1,
        user: {
            id: 1,
            username: "Test User",
            email: "test@example.com",
            verified_user: true,
        },
        document_type: {
            id: 1,
            name: "Barangay Clearance",
            description: "Certifies residency & good standing.",
            fee: "100.00",
            requirements: "Valid ID, Cedula (Community Tax Certificate)",
        },
        purpose: "Wala Test Lang",
        status: "approved",
        request_date: "2025-09-01 09:22:12",
        release_date: null,
    },
    {
        id: 2,
        user: {
            id: 1,
            username: "Test User",
            email: "test@example.com",
            verified_user: true,
        },
        document_type: {
            id: 1,
            name: "Barangay Clearance",
            description: "Certifies residency & good standing.",
            fee: "100.00",
            requirements: "Valid ID, Cedula (Community Tax Certificate)",
        },
        purpose: "PhylSus",
        status: "pending",
        request_date: "2025-09-01 09:52:11",
        release_date: null,
    },
    {
        id: 3,
        user: {
            id: 1,
            username: "Test User",
            email: "test@example.com",
            verified_user: true,
        },
        document_type: {
            id: 1,
            name: "Barangay Clearance",
            description: "Certifies residency & good standing.",
            fee: "100.00",
            requirements: "Valid ID, Cedula (Community Tax Certificate)",
        },
        purpose: "PhylSus",
        status: "pending",
        request_date: "2025-09-01 09:59:54",
        release_date: null,
    },
    {
        id: 4,
        user: {
            id: 1,
            username: "Test User",
            email: "test@example.com",
            verified_user: true,
        },
        document_type: {
            id: 1,
            name: "Barangay Clearance",
            description: "Certifies residency & good standing.",
            fee: "100.00",
            requirements: "Valid ID, Cedula (Community Tax Certificate)",
        },
        purpose: "PhylSus",
        status: "pending",
        request_date: "2025-09-01 14:52:19",
        release_date: null,
    },
];

export const columns = [
    {
        key: "document_type.name",
        label: "DOCUMENT TYPE",
    },
    {
        key: "purpose",
        label: "PURPOSE",
    },
    {
        key: "document_type.fee",
        label: "FEE",
    },
    {
        key: "request_date",
        label: "REQUEST DATE",
    },
    {
        key: "status",
        label: "STATUS",
    },
    {
        key: "action",
        label: "",
    },
];

export const tabs = [
    {
        id: "all",
        label: "All",
    },
    {
        id: "approved",
        label: "Approved",
    },
    {
        id: "pending",
        label: "Pending",
    },
    {
        id: "released",
        label: "Release",
    },
    {
        id: "rejected",
        label: "Rejected",
        
    },
];

export const animals = [
    { key: "1", label: "Barangay Clearance" },
    { key: "2", label: "Certificate of Indigency" },
    { key: "3", label: "Certificate of Residency" },
    { key: "4", label: "Barangay ID" },
    { key: "5", label: "Business Permit (Barangay)" },
    { key: "6", label: "Barangay Permit for Events" },
    { key: "7", label: "Certificate of Good Moral Character" },
    { key: "8", label: "Travel / Transfer Permit" },
    { key: "9", label: "Certification for Police Clearance" },
    { key: "10", label: "Barangay Blotter / Incident Report" },
];
