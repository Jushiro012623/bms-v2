import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Dropdown,
    DropdownTrigger,
    Button,
    DropdownMenu,
    DropdownItem,
    Chip,
    Spinner,
} from "@heroui/react";
import { columns } from "./items";
import { TopContent } from "./top-content";
import {
    capitalizeFirstLetter,
    getNestedValue,
    onlyDate,
} from "../../../helpers/getNestedValueTable";
import { REQUEST_STATUS } from "../../../constants/status";
import { HiOutlineDotsVertical } from "react-icons/hi";
import BottomContent from "./bottom-content";
import { useNavigate } from "react-router";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import type { ApiResponse } from "./types";
import ErrorPage from "../../error-page";

export default function HistoryPage() {
    const navigate = useNavigate();
    const [data, setData] = useState<ApiResponse>({
        data: [],
        meta: { count: 0, last_page: 1 },
        link: {},
    });
    const [error, setError] = useState<any>(null);
    const [docTypes, setDocTypes] = useState<any>([]);
    const [loading, setLoading] = useState<any>(false);
    const [params, setParams] = useState<any>(null);
    useEffect(() => {
        const request = async () => {
            try {
                const response = await axios({
                    url: "http://192.168.122.80:8002/api/document-types",
                    headers: {
                        Accept: "application/json",
                    },
                });
                setDocTypes(response.data.data);
            } catch (error) {
                setError(error);
            }
        };

        request();
    }, []);
    
    useEffect(() => {
        const request = async () => {
            setLoading(true);
            try {
                const response = await axios({
                    url: "http://192.168.122.80:8002/api/document-requests?include=documentType",
                    headers: {
                        Accept: "application/json",
                    },
                    params: params,
                });
                setData(response.data);

                // console.log(response.data, docTypeResponse.data.data);
            } catch (error) {
                setError(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };

        request();
    }, [params]);

    if (error) {
        return (
            <ErrorPage
                statusCode={error.response?.data.error.status || undefined}
            />
        );
    }

    return (
        <Fragment>
            <Table
                maxTableHeight={500}
                aria-label="Example table with dynamic content"
                className="max-w-[85rem] mx-auto mt-24"
                checkboxesProps={{
                    classNames: {
                        wrapper: "after:bg-primera text-background",
                    },
                }}
                selectionMode="multiple"
                topContent={
                    <TopContent
                        setParams={setParams}
                        params={params}
                        docTypes={docTypes}
                    />
                }
                bottomContent={
                    <BottomContent
                        data={data}
                        params={params}
                        setParams={setParams}
                    />
                }>
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn
                            key={column.key}
                            align={column.key === "action" ? "end" : "start"}
                            width={
                                column.key === "action"
                                    ? 80 // compact for action
                                    : column.key === "status"
                                    ? 150 // compact for chip
                                    : column.key === "request_date"
                                    ? 250 // compact for chip
                                    : undefined
                            }
                            className={
                                column.key === "action" ? "w-[80px]" : ""
                            }>
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody<any>
                    items={data.data}
                    emptyContent={"No rows to display."}
                    isLoading={loading}
                    loadingContent={<Spinner />}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => {
                                const value = getNestedValue(
                                    item,
                                    columnKey.toString()
                                );
                                return (
                                    <TableCell className={`py-5 relative`}>
                                        {(() => {
                                            switch (columnKey) {
                                                case "status":
                                                    return (
                                                        <Chip
                                                            className={`text-xs px-2 py-[5px] rounded-2xl ${REQUEST_STATUS[value]}`}>
                                                            {capitalizeFirstLetter(
                                                                value?.toString()
                                                            )}
                                                        </Chip>
                                                    );
                                                case "document_type.fee":
                                                    return (
                                                        <span className="text-sm">
                                                            ₱ {value}
                                                        </span>
                                                    );
                                                case "request_date":
                                                    return (
                                                        <span className="text-sm">
                                                            {onlyDate(
                                                                new Date(
                                                                    value.replace(
                                                                        " ",
                                                                        "T"
                                                                    )
                                                                )
                                                            )}
                                                        </span>
                                                    );
                                                case "action":
                                                    return (
                                                        <div className="flex justify-end">
                                                            <Dropdown className="bg-background border-1 border-default-200">
                                                                <DropdownTrigger>
                                                                    <Button
                                                                        isIconOnly
                                                                        radius="full"
                                                                        size="sm"
                                                                        variant="light"
                                                                        className="min-w-0 w-8 h-8 p-0">
                                                                        <HiOutlineDotsVertical
                                                                            size={
                                                                                18
                                                                            }
                                                                        />
                                                                    </Button>
                                                                </DropdownTrigger>
                                                                <DropdownMenu>
                                                                    <DropdownItem
                                                                        key="view"
                                                                        onPress={() =>
                                                                            navigate(
                                                                                `/documents/view`,
                                                                                {
                                                                                    state: {
                                                                                        data: item,
                                                                                    },
                                                                                }
                                                                            )
                                                                        }>
                                                                        View
                                                                    </DropdownItem>
                                                                    <DropdownItem key="edit">
                                                                        Edit
                                                                    </DropdownItem>
                                                                    <DropdownItem key="delete">
                                                                        Delete
                                                                    </DropdownItem>
                                                                </DropdownMenu>
                                                            </Dropdown>
                                                        </div>
                                                    );
                                                default:
                                                    return (
                                                        <span className="text-sm">
                                                            {value?.toString()}
                                                        </span>
                                                    );
                                            }
                                        })()}
                                    </TableCell>
                                );
                            }}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Fragment>
    );
}
