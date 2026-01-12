import React from "react";

export const useDocumentSearch = (
    searchText: string,
    params: any,
    setParams: any
) => {
    React.useEffect(() => {
        const delay = setTimeout(() => {
            if (searchText.trim()) {
                const { page, ...newParams } = params || {};
                setParams({ ...newParams, search: searchText });
            } else {
                const { search, page, ...newParams } = params || {};
                setParams(newParams);
            }
        }, 500);
        return () => clearTimeout(delay);
    }, [searchText]);
};

export const useDocumentRequestOnly = (
    params: any,
    setSearchText: any,
    setDocuments: any
) => {
    React.useEffect(() => {
        setSearchText(params?.search || "");
        if (params?.only) {
            setDocuments(new Set(params.only.split(",")));
        }
    }, [params?.only]);
};
