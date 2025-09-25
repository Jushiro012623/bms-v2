export const flatPath = [
    {
        label: 'Home',
        path: "/home",
        crumbs: [
            { label: 'Home', path: '/home' }
        ],
        routable: true,
        type: ['Overview'],
    },
    {
        label: "Document",
        path: "/documents",
        crumbs: [
            { label: "Document", path: "/documents" },
            { label: "History", path: "/documents" }
        ],
        routable: true,
        type: ['Document', "Management"],
    },
    {
        label: "Form Request",
        path: "/documents/form-request",
        crumbs: [
            { label: "Document", path: "/documents" },
            { label: "Form Request", path: "/documents/form-request" }
        ],
        routable: true,
        type: ['Document', "Management"],
    },
    {
        label: "Available",
        path: "/documents/availables",
        crumbs: [
            { label: "Document", path: "/documents" },
            { label: "Available", path: "/documents/availables" }
        ],
        routable: true,
        type: ['Document', "Management"],
    },
    {
        label: "View Form",
        path: "/documents/view",
        crumbs: [
            { label: "Document", path: "/documents" },
            { label: "View Form", path: "/documents/view" }
        ],
        routable: false,
        type: ['Document', "Management"],
    },
    {
        label: "Profile",
        path: "/user/profile",
        crumbs: [
            { label: "User", path: "/user/profile" },
            { label: "Profile", path: "/user/profile" }
        ],
        routable: true,
        type: ['User', "Management"],
    },
    {
        label: "FAQ",
        path: "/faq",
        crumbs: [
            { label: "FAQ", path: "/faq" }
        ],
        routable: true,
        type: ["Support"],
    },
    {
        label: "BRMS Payment",
        path: "/payment-gateway",
        crumbs: [
            { label: "BRMS Payment", path: "/payment-gateway" }
        ],
        routable: false,
        type: ["Payment", "Management"],
    },
];

