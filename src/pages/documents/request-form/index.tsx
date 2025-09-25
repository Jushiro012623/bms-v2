import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Select,
    SelectItem,
    Spacer,
    Textarea,
    Button,
    addToast,
    Form,
    Skeleton,
} from "@heroui/react";
import { AlertIcon } from "../../../components/icons/singletone/alert";
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { handleAxiosError } from "../../../helpers/errorHandling";
import ErrorPage from "../../error-page";
import useFetch from "../../../hooks/useFetch";
import { Api } from "../../../service/api/request";

const Notice = ({ doc }: { doc: any }) => {
    if (!doc) return null;

    return (
        <Card className="py-4 px-3 max-w-[55rem] mx-auto mt-16">
            <CardHeader className="pb-0 pt-2 px-4 flex items-start">
                <div className="flex-1">
                    <h1 className="font-semibold text-large text-amber-500 dark:text-amber-400 ">
                        Request Notice
                    </h1>
                    <h1 className="font-light text-sm">
                        Please take note before submitting your request
                    </h1>
                </div>
                <AlertIcon
                    size={40}
                    className="text-amber-500 dark:text-amber-400 bg-transparent"
                />
            </CardHeader>
            <CardBody className="overflow-visible py-8">
                <div className="p-4 bg-warning-50 dark:bg-zinc-800 border-l-4 border-amber-500 dark:border-amber-400 rounded-md text-sm text-gray-800 dark:text-gray-100 space-y-3">
                    <div className="space-y-1">
                        <p>
                            <span className="font-semibold">Document:</span>{" "}
                            {doc.name}
                        </p>
                        <p>
                            <span className="font-semibold">Description:</span>{" "}
                            {doc.description || "No description available"}
                        </p>
                        <p>
                            <span className="font-semibold">Requirements:</span>{" "}
                            {doc.requirements || "No requirements"}
                        </p>
                        <p>
                            <span className="font-semibold">Fee:</span> ₱
                            {parseFloat(doc.fee || "0").toFixed(2)}
                        </p>
                    </div>
                </div>
            </CardBody>
            <CardFooter>
                <p className="italic text-xs text-amber-500 dark:text-amber-400">
                    You must present the required ID to claim the document. All
                    fees must be settled before release.
                </p>
            </CardFooter>
        </Card>
    );
};

const RequestFormPage = () => {
    const navigate = useNavigate();
    const [submitLoading, setSubmitLoading] = useState<any>(false);
    const [inputError, setInputError] = useState<any>({});

    const location = useLocation();

    const { docTypeID } = location.state || {};

    const [inputData, setInputData] = useState<any>({
        purpose: "",
        doc_type_id: docTypeID ? String(docTypeID) : "",
    });

    const resetData = () => {
        setInputData({
            purpose: "",
            doc_type_id: "",
        });
    };
    const { isLoading: loading, data, error } = useFetch("document-types");

    if (error) {
        return (
            <ErrorPage
                statusCode={error.response?.data.error.status || undefined}
            />
        );
    }

    const onSubmit = async (event: any) => {

        setSubmitLoading(true);
        
        try {
            event?.preventDefault();

            const res = await Api({
                method: "POST",
                url: "document-requests",
                data: inputData,
            });

            const item = await res.data.data;
            
            if(item.document_type.fee != Number(0)){
                navigate("/payment-gateway", {
                    state: {
                        data: item,
                    },
                });
            }else{
                navigate("/documents")
            }

            addToast({
                title: "Success",
                description: res.data.message,
                color: "success",
                timeout: 3000,
                shouldShowTimeoutProgress: true,
                classNames: {
                    base: "bg-green-400 border-none text-white",
                    title: "text-white z-10",
                    description: "text-white z-10",
                    icon: "z-10",
                    progressIndicator: "bg-green-200",
                },
            });
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                handleAxiosError(error, setInputError);
            } else {
                addToast({
                    title: "Internal Server Error",
                    description: "System Error",
                    color: "danger",
                    timeout: 3000,
                    shouldShowTimeoutProgress: true,
                });
            }
            setSubmitLoading(false);
            resetData();
        }
    };
    const onDocumentSelectChange = (keys: any) => {
        const key = Array.from(keys)[0]; // single select
        setInputData((prev: any) => ({ ...prev, doc_type_id: key }));
    };

    const selectedDoc = data.data.find(
        (doc: any) => String(doc.id) === String(inputData.doc_type_id)
    );

    return (
        <div>
            <Form
                className="max-w-[55rem] mx-auto mt-24"
                onSubmit={onSubmit}
                validationErrors={inputError}>
                <Card className="py-4 px-3 w-full">
                    <CardHeader className="pb-0 pt-2 flex-col items-start gap-1">
                        <Skeleton
                            className="rounded-lg w-full"
                            isLoaded={!loading}>
                            <h1 className="font-semibold text-large">
                                Request New Document
                            </h1>
                        </Skeleton>
                        <Skeleton
                            className="rounded-lg w-full"
                            isLoaded={!loading}>
                            <h1 className="font-light text-sm">
                                Fill in the details below to request a barangay
                                document.
                            </h1>
                        </Skeleton>
                    </CardHeader>
                    <CardBody className="overflow-visible py-8">
                        <Skeleton
                            className="rounded-lg w-full"
                            isLoaded={!loading}>
                            <Select
                                defaultSelectedKeys={[docTypeID || ""]}
                                selectedKeys={
                                    new Set(
                                        inputData?.doc_type_id
                                            ? [String(inputData.doc_type_id)]
                                            : []
                                    )
                                }
                                disabledKeys={data.data
                                    .filter(
                                        (docType: any) =>
                                            docType.status !== "active"
                                    )
                                    .map((docType: any) => String(docType.id))}
                                name="doc_type_id"
                                label="Select documents"
                                variant="bordered"
                                onSelectionChange={onDocumentSelectChange}
                                classNames={{
                                    trigger: "border-1",
                                }}>
                                {data.data.map((docType: any) => (
                                    <SelectItem key={docType.id}>
                                        {docType.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </Skeleton>
                        <Spacer y={5} />

                        <Skeleton
                            className="rounded-lg w-full"
                            isLoaded={!loading}>
                            <Input
                                name="purpose"
                                label="Purpose"
                                type="text"
                                variant="bordered"
                                classNames={{
                                    inputWrapper: ["border-1", "cursor-text!"],
                                }}
                                onValueChange={(value: string) => {
                                    setInputData((prev: any) => ({
                                        ...prev,
                                        purpose: value,
                                    }));
                                }}
                                value={inputData?.purpose}
                            />
                        </Skeleton>
                        <Spacer y={5} />

                        <Skeleton
                            className="rounded-lg w-full"
                            isLoaded={!loading}>
                            <Textarea
                                name="notes"
                                label="Notes"
                                placeholder="Enter your notes"
                                variant="bordered"
                                classNames={{
                                    inputWrapper: ["border-1", "cursor-text!"],
                                }}
                                onValueChange={(value: string) => {
                                    setInputData((prev: any) => ({
                                        ...prev,
                                        notes: value,
                                    }));
                                }}
                                value={inputData?.notes || ""}
                            />
                        </Skeleton>
                    </CardBody>
                    <CardFooter className="flex gap-3 justify-end">
                        <Skeleton className="rounded-lg" isLoaded={!loading}>
                            <Button
                                isDisabled={submitLoading}
                                className="bg-gray-100 text-gray-700 max-w-28 w-full"
                                onPress={resetData}>
                                Clear
                            </Button>
                        </Skeleton>

                        <Skeleton className="rounded-lg" isLoaded={!loading}>
                            <Button
                                isDisabled={submitLoading}
                                isLoading={submitLoading}
                                className="bg-primera text-white max-w-28 w-full"
                                type="submit">
                                Submit
                            </Button>
                        </Skeleton>
                    </CardFooter>
                </Card>
            </Form>

            {/* Show notice only if doc is selected */}
            {selectedDoc && <Notice doc={selectedDoc} />}
        </div>
    );
};

export default RequestFormPage;
