import { useState } from "react";

export function usePagination(initialPage: number) {
    const [currentPage, setCurrentPage] = useState(initialPage);

    const setPage = (page: number) => {
        setCurrentPage(page);
    };

    const resetPage = () => {
        setCurrentPage(1);
    };

    return { currentPage, setPage, resetPage };
}
