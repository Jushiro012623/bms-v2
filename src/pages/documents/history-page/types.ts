export interface Meta {
    total: number;
    last_page: number;
    from: number;
    to: number;

}
export interface BottomContentProps {
    data: { meta: Meta };
    params: Record<string, unknown>;
    setParams: (params: Record<string, unknown>) => void;
}



export interface DocumentRequest { id: number; /* ... */ }
export interface ApiResponse {
    data: DocumentRequest[];
    meta: Meta;
    link: Record<string, string>;
}