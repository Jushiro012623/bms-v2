import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Divider,
    Image,
} from "@heroui/react";
import { HomeIcon } from "../../../components/icons/duotone/home";
import { Navigate, useLocation } from "react-router";
import { capitalizeFirstLetter } from "../../../helpers/getNestedValueTable";
import { REQUEST_STATUS } from "../../../constants/status";

const ViewForm = () => {
    const location = useLocation();
    const { data } = location.state || {};

    if (!data) {
        return <Navigate to="/documents/" />;
    }

    console.log(data);

    return (
        <main className="max-w-[70rem] mx-auto mt-20 flex flex-col gap-4 ">
            <div className="flex gap-4 ">
                <Card className="rounded-xl overflow-hidden transition duration-200 cursor-pointer flex-1 h-fit">
                    <div className="flex p-4 ">
                        <Image
                            alt={`Document Type`}
                            className="object-cover transition duration-300 rounded-md aspect-square"
                            src="https://heroui.com/images/hero-card-complete.jpeg"
                            width={350}
                            height={350}
                        />
                        <div className="p-4 space-y-3 flex-1">
                            <h2 className="font-semibold text-lg text-gray-800">
                                #CMCFR2025061710
                            </h2>
                            <Divider />
                            <h2 className="font-semibold text-lg text-gray-800">
                                {data?.document_type.name|| "N/A"}
                            </h2>
                            <p className="text-sm text-gray-600 line-clamp-3">
                                {data?.document_type.description|| "N/A"}
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                <Chip
                                    className={`font-bold px-3 text-primera-700 bg-primera-200`}
                                    size="sm"
                                    radius="sm">
                                    Paid
                                </Chip>
                                <Chip
                                    className="bg-gray-200 text-second-500 font-medium px-3"
                                    size="sm"
                                    radius="sm">
                                    ₱ {data?.document_type.fee|| "N/A"}
                                </Chip>
                            </div>
                            <Divider />
                            <div>
                                <h1 className="text-gray-400 text-sm">
                                    Request Purpose
                                </h1>
                                <h1 className="font-semibold text-sm">
                                    {data?.purpose|| "N/A"}
                                </h1>
                            </div>
                            <div>
                                <h1 className="text-gray-400 text-sm">
                                    Request Notes
                                </h1>
                                <div className="bg-gray-100 rounded-sm py-3 px-4">
                                    <h1 className=" text-sm text-gray-500">
                                        {data?.notes || "N/A"}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                <div className="w-xs flex flex-col gap-4">
                    <Card className="py-5 px-4 w-xs h-fit">
                        <div className="flex py-2 px-3 gap-3 items-center">
                            <HomeIcon className="text-accent" size={22} />
                            <div>
                                <h1 className="text-gray-400 text-sm">
                                    Request Posted
                                </h1>
                                <h1 className="font-semibold text-sm">
                                    {data?.request_date}
                                </h1>
                            </div>
                        </div>
                        <div className="flex py-2 px-3 gap-3 items-center">
                            <HomeIcon className="text-accent" size={22} />
                            <div>
                                <h1 className="text-gray-400 text-sm">
                                    Approved Date
                                </h1>
                                <h1 className="font-semibold text-sm">N/A</h1>
                            </div>
                        </div>
                        <div className="flex py-2 px-3 gap-3 items-center">
                            <HomeIcon className="text-accent" size={22} />
                            <div>
                                <h1 className="text-gray-400 text-sm">
                                    Released Date
                                </h1>
                                <h1 className="font-semibold text-sm">
                                    {data?.released_date || "N/A"}
                                </h1>
                            </div>
                        </div>
                        <div className="flex py-2 px-3 gap-3 items-center">
                            <HomeIcon className="text-accent" size={22} />
                            <div>
                                <h1 className="text-gray-400 text-sm">
                                    Issued Date
                                </h1>
                                <h1 className="font-semibold text-sm">N/A</h1>
                            </div>
                        </div>
                    </Card>
                    <Card className="py-5 px-7 flex flex-row gap-3 items-center">
                        <HomeIcon className="text-accent" size={22} />
                        <h1 className="text-gray-700 text-sm font-bold">Status:</h1>
                        <Chip className={`font-semibold text-sm ${REQUEST_STATUS[data?.status]}`}>
                            { capitalizeFirstLetter(data?.status) }
                        </Chip>
                    </Card>
                </div>
            </div>
        </main>
    );
};

export default ViewForm;
