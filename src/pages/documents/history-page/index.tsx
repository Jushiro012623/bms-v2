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
    type Selection,
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
import { Fragment, useState } from "react";
import ErrorPage from "../../error-page";
import useFetch from "../../../hooks/useFetch";

export default function HistoryPage() {
    const navigate = useNavigate();
    const [params, setParams] = useState<any>(null);
    const [selectedKeys, setSelectedKeys] = useState<any>();
    const { data: docTypes, error: docTypeError } =
        useFetch("api/document-types");
    const {
        data,
        error,
        isLoading: loading,
    } = useFetch("api/document-requests?include=documentType", params);

    if (error || docTypeError) {
        return (
            <ErrorPage
                statusCode={error?.response?.data?.error?.status || undefined}
            />
        );
    }

    const handleSelectedKeys = (keys: Selection) => {
        if (keys == "all") {
            const pendingItems = data.data.filter(
                (item: any) => item.status?.toLowerCase() === "pending" && Number(item.document_type.fee ) > 0
            );
            setSelectedKeys(pendingItems);
            return;
        }

        const selectedIds = Array.from(keys);

        const pendingItems = data.data.filter(
            (item: any) =>
                selectedIds.includes(String(item.id)) &&
                item.status?.toLowerCase() === "pending" && Number(item.document_type.fee ) > 0
        );
        setSelectedKeys(pendingItems);
    };

    return (
        <Fragment>
            <Table
                maxTableHeight={500}
                aria-label="Example table with dynamic content"
                className="max-w-[85rem] mx-auto mt-24"
                onSelectionChange={handleSelectedKeys}
                checkboxesProps={{
                    classNames: {
                        wrapper: "after:bg-primera text-background",
                    },
                }}
                selectionMode="multiple"
                topContent={
                    <TopContent
                        selectedKeys={selectedKeys}
                        setParams={setParams}
                        params={params}
                        docTypes={docTypes.data}
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
                                    ? 80
                                    : column.key === "status"
                                    ? 150
                                    : column.key === "request_date"
                                    ? 250
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
                                    <TableCell className="py-5 relative">
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

                                                                    {Number(
                                                                        item
                                                                            .document_type
                                                                            .fee
                                                                    ) !== 0 &&
                                                                    item.status ===
                                                                        "pending" ? (
                                                                        <DropdownItem
                                                                            key="pay"
                                                                            onPress={() =>
                                                                                navigate(
                                                                                    `/payment-gateway`,
                                                                                    {
                                                                                        state: {
                                                                                            data: item,
                                                                                        },
                                                                                    }
                                                                                )
                                                                            }>
                                                                            Pay
                                                                            Now
                                                                        </DropdownItem>
                                                                    ) : null}
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
