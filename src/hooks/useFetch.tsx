import { useEffect, useState } from "react";
import { Api } from "../service/api/request";

const useFetch = (uri: string, params: any = null) => {
    const [data, setData] = useState<any>({
        data: [],
        meta: { from: 0, last_page: 1, total: 0, to: 0 },
        link: {},
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await Api.get(uri, { params });
            setData(response.data);
        } catch (err: any) {
            setError(err);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    };

    useEffect(() => {
        let mounted = true;
        if (!mounted) return;
        fetchData();
        return () => {
            mounted = false;
        };
    }, [uri, JSON.stringify(params)]);

    return { data, isLoading, error, refetch: fetchData };
};

export default useFetch;
