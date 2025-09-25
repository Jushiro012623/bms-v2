import axios from "axios";
import { useEffect, useState } from "react";
import type { ApiResponse } from "../pages/documents/history-page/types";

const useFetch = (uri: string, params: any = null) => {
    const [data, setData] = useState<ApiResponse>({
        data: [],
        meta: { from: 0, last_page: 1, total: 0, to: 0 },
        link: {},
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios({
                    url: `http://192.168.123.140:8002/${uri}`,
                    method: "GET",
                    params: params,
                });

                const data = await response.data
                setData(data);
            } catch (error: any) {
                setError(error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
        };

        fetchData();
    }, [params]);

    return { data, isLoading, error };
};

export default useFetch;
