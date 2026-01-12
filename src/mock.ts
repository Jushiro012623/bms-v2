export const docType = {
    "message": "doctype fetched successfully",
    "status": 200,
    "data": [
        {
            "id": 1,
            "name": "Barangay Clearance",
            "description": "Certifies residency & good standing.",
            "fee": 100,
            "requirements": "Valid ID, Cedula (Community Tax Certificate)",
            "status": "active"
        },
        {
            "id": 2,
            "name": "Certificate of Indigency",
            "description": "Certifies that a person is indigent (low income).",
            "fee": 0,
            "requirements": "Valid ID",
            "status": "active"
        },
        {
            "id": 3,
            "name": "Certificate of Residency",
            "description": "Proof that a person resides in the barangay.",
            "fee": 100,
            "requirements": "Valid ID, Proof of address",
            "status": "active"
        },
        {
            "id": 4,
            "name": "Barangay ID",
            "description": "Local ID issued by barangay.",
            "fee": 150,
            "requirements": "Birth Certificate, Valid ID (if available), Photo",
            "status": "active"
        },
        {
            "id": 5,
            "name": "Business Permit (Barangay)",
            "description": "Requirement for business registration.",
            "fee": 500,
            "requirements": "Business papers, Cedula",
            "status": "active"
        },
        {
            "id": 6,
            "name": "Barangay Permit for Events",
            "description": "Permit to hold public events (fiesta, concert, etc.).",
            "fee": 300,
            "requirements": "Event details, Sponsor/Organizer ID",
            "status": "inactive"
        },
        {
            "id": 7,
            "name": "Certificate of Good Moral Character",
            "description": "Used for school/job applications.",
            "fee": 100,
            "requirements": "Valid ID",
            "status": "active"
        },
        {
            "id": 8,
            "name": "Travel / Transfer Permit",
            "description": "Certifies movement/transfer of residency.",
            "fee": 100,
            "requirements": "Valid ID, Proof of transfer",
            "status": "active"
        },
        {
            "id": 9,
            "name": "Certification for Police Clearance",
            "description": "Pre-requisite for police clearance application.",
            "fee": 100,
            "requirements": "Valid ID, Cedula",
            "status": "active"
        },
        {
            "id": 10,
            "name": "Barangay Blotter / Incident Report",
            "description": "Official record of disputes, complaints, or incidents.",
            "fee": 0,
            "requirements": "Request letter / Valid ID",
            "status": "active"
        }
    ]


}

export const userRole = [
    { name: 'CLIENT' },
    { name: 'ADMIN' },
    { name: 'STAFF' },
];

export const userAcc = {

    "message": "user fetched successfully",
    "status": 200,
    "data": {
        "username": 'user.test',
        "email": 'test@example.com',
        "password": 'password',
        'role': 'ADMIN',
        'address': "10 Anywhere Philippines",
        'phone': "091251234673",
        'name': "Test User",
    }
}


export const loginRes = {
    "message": "Logged In Successfully",
    "status": 200,
    "data": {
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Jtcy12Mi1hcGkudmVyY2VsLmFwcC8iLCJhdWQiOiJodHRwczovL2Jtcy12Mi1hcGkudmVyY2VsLmFwcC8iLCJqdGkiOiI5YTk3Y2QwZDk0NjJjYjNkZGQ2MzlmNjRlYmFmNDM0YiIsInN1YiI6IjIiLCJpYXQiOjE3NjYxMjI4MjUuODAxOTc4LCJuYmYiOjE3NjYxMjI4MjUuODAxOTc4LCJleHAiOjE3NjYxMjY0MjUuODAxOTc4fQ.mluuG7ycV4NwgGH5UOYNX-R37wOkcblIS0xP8_HAfeg",
        "token_type": "Bearer",
        "expires_in": 3600
    }
}


export const requestDocumentPOST = (data: any) => {
    const selectedDocType = docType.data.find(
        (item) => item.id === Number(data.doc_type_id)
    );

    return {
        id: 1,
        document_type: selectedDocType || null,
        purpose: data.purpose,
        notes: data.notes,
        status: "pending",
        created_at: Date.now(),
        updated_at: Date.now(),
        request_date: Date.now(),
    };
};


export const mockDocumentRequests = {
    data: [
        {
            id: 1,
            document_type: docType.data[0], // Barangay Clearance
            purpose: "For job application",
            notes: "Urgent",
            status: "pending",
            request_date: "2023-10-01 10:00:00",
            created_at: "2023-10-01T10:00:00Z",
            updated_at: "2023-10-01T10:00:00Z",
        },
        {
            id: 2,
            document_type: docType.data[1], // Certificate of Indigency
            purpose: "For scholarship",
            notes: "",
            status: "approved",
            request_date: "2023-09-15 14:30:00",
            created_at: "2023-09-15T14:30:00Z",
            updated_at: "2023-09-20T09:00:00Z",
        },
        {
            id: 3,
            document_type: docType.data[2], // Certificate of Residency
            purpose: "For bank loan",
            notes: "Include proof of address",
            status: "pending",
            request_date: "2023-10-05 16:45:00",
            created_at: "2023-10-05T16:45:00Z",
            updated_at: "2023-10-05T16:45:00Z",
        },
        // Add more mock items as needed
    ],
    meta: {
        current_page: 1,
        from: 1,
        last_page: 1,
        path: "",
        per_page: 10,
        to: 3,
        total: 3,
        count: 3
    },
    links: {
        first: "",
        last: "",
        prev: null,
        next: null,
    },
};

