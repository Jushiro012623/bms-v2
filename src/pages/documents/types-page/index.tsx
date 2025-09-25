import {
    Card,
    CardBody,
    Image,
    Chip,
    CardHeader,
    Skeleton,
    Spacer,
} from "@heroui/react";
import ErrorPage from "../../error-page";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router";

export default function TypesPage() {
    const navigate = useNavigate();
    const { isLoading: loading, data, error } = useFetch("api/document-types");

    if (error) {
        return (
            <ErrorPage
                statusCode={error.response?.data.error.status || undefined}
            />
        );
    }

    

    return (
        <main className="max-w-[70rem] mx-auto mt-20 px-4 mb-10">
            <div className="text-center mb-12">
                <Skeleton isLoaded={!loading} className="rounded-md">
                    <h1 className="text-3xl font-bold bg-clip-text bg-gradient-to-r from-primera to-primera-700 text-transparent">
                        Document Types
                    </h1>
                </Skeleton>
                <Spacer y={'px'} />
                <Skeleton isLoaded={!loading} className="rounded-md">
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Browse available barangay documents and services. Fees
                        and requirements are shown for each type.
                    </p>
                </Skeleton>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.data.map((item: any) => (
                    <Card
                        onPress={() =>
                            navigate("/documents/form-request", {
                                state: { docTypeID: item.id },
                            })
                        }
                        isDisabled={!loading && item.status !== "active"}
                        key={item.id}
                        isHoverable={!loading && item.status === "active"}
                        isPressable={!loading && item.status === "active"}
                        className="rounded-xl overflow-hidden transition duration-200 cursor-pointer dark:bg-zinc-800">
                        {!loading && item.status !== "active" && (
                            <div className="z-50 border absolute top-4 left-4 bg-amber-200  text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                UNAVAILABLE
                            </div>
                        )}
                        <CardHeader>
                            <Skeleton
                                isLoaded={!loading}
                                className="rounded-md">
                                <Image
                                    alt={`Document Type ${item.name}`}
                                    className="object-cover transition duration-300 rounded-md"
                                    src="https://heroui.com/images/hero-card-complete.jpeg"
                                />
                            </Skeleton>
                        </CardHeader>

                        <CardBody className="p-4 space-y-3">
                            <Skeleton
                                isLoaded={!loading}
                                className="rounded-md">
                                <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                                    {item.name}
                                </h2>
                            </Skeleton>
                            <Skeleton
                                isLoaded={!loading}
                                className="rounded-md">
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                    {item.description}
                                </p>
                            </Skeleton>

                            <div className="flex gap-2 flex-wrap">
                                <Skeleton
                                    isLoaded={!loading}
                                    className="rounded-md">
                                    <Chip
                                        className={`${
                                            item.fee == 0
                                                ? "dark:bg-green-400 dark:text-green-800 bg-green-200 text-green-600"
                                                : "dark:bg-accent dark:text-accent-800 bg-accent-200 text-accent-600"
                                        } font-bold px-3`}
                                        size="sm"
                                        radius="sm">
                                        {item.fee == 0 ? "Free" : "Paid"}
                                    </Chip>
                                </Skeleton>
                                <Skeleton
                                    isLoaded={!loading}
                                    className="rounded-md">
                                    <Chip
                                        className="bg-gray-200 text-second-500 dark:text-gray-800 font-medium px-3"
                                        size="sm"
                                        radius="sm">
                                        ₱ {item.fee}
                                    </Chip>
                                </Skeleton>
                            </div>

                            <Skeleton
                                isLoaded={!loading}
                                className="rounded-md">
                                <div className="text-xs text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-zinc-900/30 p-2 rounded-md">
                                    <strong>Requirements:</strong>{" "}
                                    {item.requirements}
                                </div>
                            </Skeleton>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </main>
    );
}
