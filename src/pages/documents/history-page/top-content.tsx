import {
    Button,
    Chip,
    Input,
    Select,
    SelectItem,
    Tab,
    Tabs,
} from "@heroui/react";
import React, { useMemo } from "react";
import { tabs } from "./items";
import {
    REQUEST_STATUS,
    REQUEST_STATUS_NUMBER,
    REQUEST_STATUS_STRING,
} from "../../../constants/status";
import { SearchIcon } from "../../../components/icons/singletone/search";
import { IoIosCloseCircle } from "react-icons/io";
import { HiMiniTrash } from "react-icons/hi2";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router";
import { useDocumentRequestOnly, useDocumentSearch } from "./hooks";

export const TopContent = ({
    params,
    setParams,
    docTypes,
    selectedKeys,
}: any) => {
    const [documents, setDocuments] = React.useState<any>(new Set([]));
    const [searchText, setSearchText] = React.useState(params?.search || "");

    const navigate = useNavigate();

    useDocumentRequestOnly(params, setSearchText, setDocuments);

    useDocumentSearch(searchText, params, setParams);

    const onDocumentSelectChange = (keys: any) => {
        setDocuments(keys);
        const selected = Array.from(keys).join(",");
        setParams({ ...params, only: selected });
    };

    const tabsSelectedKeys = useMemo(() => {
        return params?.status
            ? REQUEST_STATUS_NUMBER[params?.status].toString()
            : "all";
    }, [params]);

    const tabsOnSelectionChange = (key: string | number) => {
        if (key.toString() === "all") {
            // remove status from params
            const { status, ...rest } = params || {};
            setParams(rest);
        } else {
            setParams({
                ...params,
                status: REQUEST_STATUS_STRING[key.toString()],
            });
        }
    };

    const handleClearDocumentSelector = () => {
        const { only, ...newParams } = params;
        setDocuments(new Set());
        setParams({ ...newParams });
    };

    const handlePayNowButton = () => {
        navigate("/payment-gateway", {
            state: { data: selectedKeys },
        });
    };

    const handleOnSearchInputClear = () => {
        const { search, page, ...newParams } = params;
        setParams(newParams);
    };

    const handleNewRequestButton = () => navigate("/documents/form-request");

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center w-full justify-between">
                <Tabs
                    aria-label="Dynamic tabs"
                    items={tabs}
                    className="flex-1"
                    selectedKey={tabsSelectedKeys}
                    onSelectionChange={tabsOnSelectionChange}>
                    {(item) => (
                        <Tab
                            key={item.id}
                            className="py-5 "
                            title={
                                <div className="flex items-center space-x-2">
                                    <span>{item.label}</span>
                                    <Chip
                                        className={`text-xs ${
                                            REQUEST_STATUS[item.id] ??
                                            "bg-primera-300 text-primera-600"
                                        } `}
                                        radius="sm">
                                        0
                                    </Chip>
                                </div>
                            }
                        />
                    )}
                </Tabs>
                <div className="flex gap-2">
                    {selectedKeys && selectedKeys.length > 0 && (
                        <Button
                            aria-label="Pay Now"
                            variant="bordered"
                            className=" text-primera"
                            onPress={handlePayNowButton}>
                            Pay Now
                        </Button>
                    )}
                    <Button
                        aria-label="Request New Document"
                        className="bg-primera text-white"
                        onPress={handleNewRequestButton}>
                        Request <BiPlus size={18} />
                    </Button>
                </div>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Select
                    selectedKeys={documents}
                    classNames={{
                        base: "max-w-xs",
                        trigger: "border-1",
                    }}
                    label="Select documents"
                    variant="bordered"
                    selectionMode="multiple"
                    onSelectionChange={onDocumentSelectChange}>
                    {docTypes && docTypes.map((docType: any) => (
                        <SelectItem key={docType.id}>{docType.name}</SelectItem>
                    ))}
                </Select>
                <Input
                    isClearable
                    classNames={{
                        input: [
                            "bg-transparent",
                            "text-black/90 dark:text-white/90",
                        ],
                        innerWrapper: "bg-transparent ",
                        inputWrapper: ["h-full", "border-1", "cursor-text!"],
                    }}
                    value={searchText}
                    onClear={handleOnSearchInputClear}
                    onValueChange={setSearchText}
                    variant="bordered"
                    placeholder="Type to search..."
                    radius="sm"
                    startContent={
                        <SearchIcon
                            size={18}
                            className="text-black/50 dark:text-gray-100 mb-0.5  pointer-events-none shrink-0"
                        />
                    }
                />
            </div>

            {documents.size !== 0 && (
                <div className="flex  gap-4 flex-col">
                    <div className="border-gray-200 rounded-lg border-1 py-5 w-full !h-auto !flex !flex-row ">
                        <div className="block w-fit px-3 text-sm">
                            Selected:
                        </div>
                        <div className="flex gap-2 items-center flex-wrap">
                            {Array.from(documents).map((id: any) => {
                                const doc = docTypes.find(
                                    (d: any) => d.id == id
                                );
                                return (
                                    <Chip
                                        size="sm"
                                        key={id}
                                        radius="sm"
                                        className="bg-primera text-white ">
                                        <div className="flex items-center gap-1">
                                            {doc?.name.toUpperCase() ?? id}{" "}
                                            <IoIosCloseCircle
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const newDocs = new Set(
                                                        documents
                                                    );
                                                    newDocs.delete(id);
                                                    onDocumentSelectChange(
                                                        newDocs
                                                    );
                                                }}
                                                size={15}
                                                className="hover:text-gray-200 cursor-pointer"
                                            />
                                        </div>
                                    </Chip>
                                );
                            })}
                        </div>
                    </div>
                    <Button
                        variant="light"
                        color="danger"
                        className="w-fit flex text-red-400 items-center cursor-pointer"
                        onPress={handleClearDocumentSelector}>
                        <HiMiniTrash size={20} className="text-red-400" />
                        <p className="font-semibold text-sm">Clear</p>
                    </Button>
                </div>
            )}
        </div>
    );
};
