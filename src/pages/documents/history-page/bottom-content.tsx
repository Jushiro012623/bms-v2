import { Pagination } from "@heroui/react";
import React from "react";
import type { BottomContentProps } from "./types";
import { usePagination } from "../../../hooks/usePagination";

const BottomContent = ({ data, params, setParams }: BottomContentProps) => {
    const initialPage = typeof params?.page === "number" ? params.page : 1;
    const { currentPage, setPage, resetPage } = usePagination(initialPage);
    const { from, to, total } = data.meta;
    const lastPage = data.meta.last_page;

    const onRowsPerPageChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setParams({ ...params, per_page: Number(event.target.value), page: 1 });
        resetPage(); // reset to first page when rows per page changes
    };

    const onPaginateChange = (page: number) => {
        setPage(page);
        setParams({ ...params, page });
    };
    return (
        <div className="flex justify-between h-10 items-center">
            <span className="text-default-400 text-small font-light">
                Showing {from}–{to} of {total} results
            </span>
            <Pagination
                onChange={onPaginateChange}
                isCompact
                showControls
                initialPage={currentPage}
                total={lastPage}
                variant="light"
                classNames={{
                    base: "cursor-pointer",
                    cursor: "bg-primera",
                }}
            />
            <label className="flex items-center text-default-400 text-small font-light">
                Rows per page:
                <select
                    aria-label="select__rows_per_page"
                    className="bg-transparent outline-solid outline-transparent text-default-400 text-small"
                    onChange={onRowsPerPageChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </label>
        </div>
    );
};
export default BottomContent;
