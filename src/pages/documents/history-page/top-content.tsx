import {
    Button,
    Chip,
    Input,
    Select,
    SelectItem,
    Tab,
    Tabs,
} from "@heroui/react";
import React from "react";
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

export const TopContent = ({ params, setParams,docTypes }: any) => {
    const [documents, setDocuments] = React.useState<any>(new Set([]));
    const [searchText, setSearchText] = React.useState(params?.search || "");


    const navigate = useNavigate();

    React.useEffect(() => {
        setSearchText(params?.search || "");
        if (params?.only) {
            setDocuments(new Set(params.only.split(",")));
        }
    }, [params?.only]);

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

    const onDocumentSelectChange = (keys: any) => {
        setDocuments(keys);
        const selected = Array.from(keys).join(",");
        setParams({ ...params, only: selected });
    };

    const tabsSelectedKeys = (params: { status: string }) =>
        params?.status
            ? REQUEST_STATUS_NUMBER[params?.status].toString()
            : "all";

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

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center w-full justify-between">
                <Tabs
                    aria-label="Dynamic tabs"
                    items={tabs}
                    className="flex-1"
                    selectedKey={tabsSelectedKeys(params)}
                    onSelectionChange={(key) => tabsOnSelectionChange(key)}>
                    {(item) => (
                        <Tab
                            key={item.id}
                            className="py-5 "
                            title={
                                <div className="flex items-center space-x-2">
                                    <span>{item.label}</span>
                                    <Chip
                                        className={`text-xs ${ REQUEST_STATUS[item.id] ?? "bg-primera-300 text-primera-600" } `} 
                                        radius="sm">
                                        0
                                    </Chip>
                                </div>
                            } />
                    )}
                </Tabs>
                <Button className="bg-primera text-white" onPress={() => navigate('/documents/form-request')}>
                    Create <BiPlus size={18} />
                </Button>
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
                    {docTypes.map((docType: any) => (
                        <SelectItem key={docType.name}>{docType.name}</SelectItem>
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
                    onClear={() => {
                        const { search, page, ...newParams } = params;
                        setParams(newParams);
                    }}
                    onValueChange={(value: string) => {
                        setSearchText(value);
                    }}
                    variant="bordered"
                    placeholder="Type to search..."
                    radius="sm"
                    startContent={
                        <SearchIcon
                            size={18}
                            className="text-black/50 mb-0.5  pointer-events-none shrink-0"
                        />
                    }
                />
            </div>

            {documents.size !== 0 && (
                <div className="flex items-center gap-2">
                    <Chip
                        radius="sm"
                        variant="bordered"
                        className="border-1 py-5">
                        <div className="flex gap-2 items-center">
                            <span>Selected: </span>
                            {Array.from(documents).map((item: any) => (
                                <Chip
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const newDocs = new Set(documents);
                                        newDocs.delete(item);
                                        onDocumentSelectChange(newDocs);
                                    }}
                                    size="sm"
                                    key={item}
                                    radius="sm"
                                    className="bg-primera text-white">
                                    <div className="flex items-center gap-1">
                                        {item.toUpperCase()}{" "}
                                        <IoIosCloseCircle
                                            size={15}
                                            className="hover:text-gray-200 cursor-pointer"
                                        />
                                    </div>
                                </Chip>
                            ))}
                        </div>
                    </Chip>
                    <HiMiniTrash
                        size={20}
                        className="text-red-400 cursor-pointer"
                        onClick={() => {
                            const { only, ...newParams } = params;
                            setDocuments(new Set());
                            setParams({ ...newParams });
                        }}
                    />
                </div>
            )}
        </div>
    );
};
