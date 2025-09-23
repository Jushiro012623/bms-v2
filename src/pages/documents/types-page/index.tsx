import {
    Card,
    CardBody,
    Image,
    Chip,
    CardHeader,
    Skeleton,
} from "@heroui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ErrorPage from "../../error-page";

export default function TypesPage() {
    const [data, setData] = useState<any>({
        data: [],
    });
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<any>(false);

    useEffect(() => {
        const request = async () => {
            setLoading(true);
            try {
                const response = await axios({
                    url: "http://192.168.122.80:8002/api/document-types",
                    headers: {
                        Accept: "application/json",
                    },
                });
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };

        request();
    }, []);

    if (error) {
        return (
            <ErrorPage
                statusCode={error.response?.data.error.status || undefined}
            />
        );
    }

    return (
        <main className="max-w-[70rem] mx-auto mt-20 px-4 mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.data.map((item: any) => (
                    <Card
                        isDisabled={!loading && item.status !== "active"}
                        key={item.id}
                        isHoverable={!loading && item.status === "active"}
                        isPressable={!loading && item.status === "active"}
                        className="rounded-xl overflow-hidden transition duration-200 cursor-pointer">
                        {!loading && item.status !== "active" && (
                            <div className="z-50 border absolute top-4 left-4 bg-amber-200 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded">
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
                                <h2 className="font-semibold text-lg text-gray-800">
                                    {item.name}
                                </h2>
                            </Skeleton>
                            <Skeleton
                                isLoaded={!loading}
                                className="rounded-md">
                                <p className="text-sm text-gray-600 line-clamp-3">
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
                                                ? "bg-green-100 text-green-700"
                                                : "bg-accent-100 text-accent-600"
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
                                        className="bg-gray-200 text-second-500 font-medium px-3"
                                        size="sm"
                                        radius="sm">
                                        ₱ {item.fee}
                                    </Chip>
                                </Skeleton>
                            </div>

                            <Skeleton
                                isLoaded={!loading}
                                className="rounded-md">
                                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded-md">
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
