import {
    Avatar,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Spacer,
} from "@heroui/react";
import { ContactIcon } from "../../components/icons/duotone/contact";
import { MailIcon } from "../../components/icons/duotone/mail";
import { HomeIcon } from "../../components/icons/duotone/home";
import { MasterCardIcon } from "../../components/icons/multicolor/mastercard";
import { SmallArrowIcon } from "../../components/icons/singletone/small-arrow";
import { VisaIcon } from "../../components/icons/multicolor/visa";
import Summary from "./usage-summary";

const ProfilePage = () => {
    return (
        <main className="mx-auto mt-20 max-w-[65rem] px-4">
            {/* Banner + Profile */}
            <div className="h-64 relative rounded-2xl overflow-hidden shadow-md">
                <div className="bg-gradient-to-r from-primera-800 to-primera-600 h-full" />
                <div className="absolute bottom-5 left-5 flex flex-row items-center gap-5">
                    <Avatar
                        isBordered
                        src="https://heroui.com/images/hero-card-complete.jpeg"
                        className="size-28 shadow-lg"
                    />
                    <div>
                        <h1 className="font-bold text-3xl text-white">
                            Infinity Dev
                        </h1>
                        <p className="font-medium text-gray-200">Developer</p>
                    </div>
                </div>
            </div>
            <Spacer y={6} />
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Side - About */}
                <Card className="lg:w-1/3 shadow-sm dark:bg-zinc-800/50">
                    <CardHeader className=" px-5">
                        <h2 className="font-semibold text-lg">About</h2>
                    </CardHeader>
                    <Divider />
                    <CardBody className="space-y-5">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Passionate developer focusing on building user-first
                            applications with great UI/UX.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <ContactIcon
                                    size={20}
                                    className="text-primera dark:text-accent"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    +63 912-5279-754
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <MailIcon
                                    size={20}
                                    className="text-primera dark:text-accent"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    idevx@gmail.com
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <HomeIcon
                                    size={20}
                                    className="text-primera dark:text-accent"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    30 Lorem ipsum dolor sit amet.
                                </span>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <Button
                            variant="flat"
                            className="w-full bg-primera/10 text-primera dark:text-accent"
                        >
                            Edit Info
                            <SmallArrowIcon
                                size={18}
                                className="ml-2 text-primera dark:text-accent"
                            />
                        </Button>
                    </CardFooter>
                </Card>

                {/* Right Side - Transactions */}
                <Card className="flex-1 shadow-sm dark:bg-zinc-800/50">
                    <CardHeader className=" px-5">
                        <h2 className="font-semibold text-lg">Recent Transactions</h2>
                    </CardHeader>
                    <Divider />
                    <CardBody className="space-y-6">
                        {[
                            {
                                icon: <VisaIcon size={50} />,
                                number: "12********8004",
                                desc: "Document Request",
                                amount: "₱ 100.00",
                            },
                            {
                                icon: <MasterCardIcon size={50} />,
                                number: "10********6754",
                                desc: "Barangay Clearance",
                                amount: "₱ 75.00",
                            },
                            {
                                icon: <MasterCardIcon size={50} />,
                                number: "10********6754",
                                desc: "Residency Certificate",
                                amount: "₱ 120.00",
                            },
                        ].map((tx, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between gap-4 bg-gray-50 dark:bg-zinc-800/40 p-3 rounded-xl"
                            >
                                <div className="flex items-center gap-4">
                                    {tx.icon}
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                            {tx.number}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {tx.desc}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    {tx.amount}
                                </p>
                            </div>
                        ))}
                    </CardBody>
                    <CardFooter className="justify-end">
                        <Button
                            variant="flat"
                            className="text-primera dark:text-accent"
                        >
                            See more
                            <SmallArrowIcon
                                size={18}
                                className="ml-2 text-primera dark:text-accent"
                            />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
};

export default ProfilePage;
