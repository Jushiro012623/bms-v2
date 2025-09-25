import {
    Button,
    Card,
    Chip,
    Divider,
    Image,
} from "@heroui/react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { capitalizeFirstLetter, onlyDate } from "../../../helpers/getNestedValueTable";
import { REQUEST_STATUS } from "../../../constants/status";

const ViewForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = location.state || {};

    if (!data) {
        return <Navigate to="/documents/" />;
    }

    
    return (
        <main className="max-w-[70rem] mx-auto mt-20 flex flex-col gap-6">
            {/* Main content */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: Document details */}
                <Card className="flex-1 rounded-xl overflow-hidden shadow-md p-5">
                    <div className="flex flex-col lg:flex-row h-full">
                        <Image
                            alt="Document Type"
                            className="object-cover transition duration-300 rounded-t-md lg:rounded-l-md lg:rounded-tr-none"
                            src="https://heroui.com/images/hero-card-complete.jpeg"
                            width={350}
                            height={"100%"}
                        />
                        <div className="p-6 flex-1 space-y-4">
                            {/* Document info */}
                            <div>
                                <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                                    {data?.document_type.name || "N/A"}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {data?.document_type.description ||
                                        "No description available"}
                                </p>
                            </div>

                            {/* Tags */}
                            <div className="flex gap-2 flex-wrap">
                                <Chip
                                    className="font-bold px-3 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                                    size="sm"
                                    radius="sm">
                                    Paid
                                </Chip>
                                <Chip
                                    className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 font-medium px-3"
                                    size="sm"
                                    radius="sm">
                                    ₱ {data?.document_type.fee || "N/A"}
                                </Chip>
                            </div>

                            <Divider />

                            {/* Purpose & Notes */}
                            <div className="space-y-3">
                                <div>
                                    <h1 className="text-gray-400 text-sm">
                                        Request Purpose
                                    </h1>
                                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">
                                        {data?.purpose || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <h1 className="text-gray-400 text-sm">
                                        Request Notes
                                    </h1>
                                    <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-md py-3 px-4 mt-1">
                                        <p className="text-sm text-gray-600 dark:text-gray-200">
                                            {data?.notes || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Right: Status & Timeline */}
                <div className="w-full lg:w-xs flex flex-col gap-4">
                    {/* Timeline card */}
                    <Card className="p-5">
                        <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">
                            Request Timeline
                        </h2>
                        <div className="space-y-4">
                            <TimelineItem
                                label="Request Posted"
                                value={onlyDate(data?.request_date)}
                            />
                            <TimelineItem label="Approved Date" value={onlyDate(data?.approved_date) || 'N/A'} />
                            <TimelineItem
                                label="Released Date"
                                value={onlyDate(data?.released_date) || "N/A"}
                            />
                            <TimelineItem label="Issued Date" value="N/A" />
                        </div>
                    </Card>

                    {/* Status + Actions */}
                    <Card className="p-5 space-y-4">
                        <div className="flex items-center gap-3">
                            <h1 className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                                Status:
                            </h1>
                            <Chip
                                className={`font-semibold text-sm ${
                                    REQUEST_STATUS[data?.status]
                                }`}>
                                {capitalizeFirstLetter(data?.status)}
                            </Chip>
                        </div>
                        {Number(data.document_type.fee) !== 0 && data.status === "pending" && (
                            <Button
                                onPress={() => navigate('/payment-gateway', {state: {data }})}
                                className="w-full bg-primera text-white font-semibold"
                                size="md">
                                Pay Now
                            </Button>
                        )}
                    </Card>
                </div>
            </div>
        </main>
    );
};

const TimelineItem = ({ label, value }: { label: string; value: string }) => (
    <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {value}
        </p>
    </div>
);

export default ViewForm;
