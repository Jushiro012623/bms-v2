import { Avatar, Button, Card, Spacer } from "@heroui/react";
import React from "react";
import { ContactIcon } from "../../components/icons/duotone/contact";
import { MailIcon } from "../../components/icons/duotone/mail";
import { HomeIcon } from "../../components/icons/duotone/home";
import { MasterCardIcon } from "../../components/icons/multicolor/mastercard";
import { SmallArrowIcon } from "../../components/icons/singletone/small-arrow";

const ProfilePage = () => {
    return (
        <div className="mx-auto mt-20 max-w-[65rem]">
            <Card className="h-64 relative">
                <div className="bg-gradient-to-r from-slate-700 to-slate-900 h-full" />
                <div className="absolute bottom-5 left-5 flex flex-row items-center gap-5">
                    <div className="">
                        <Avatar
                            isBordered
                            src="https://heroui.com/images/hero-card-complete.jpeg"
                            className="size-28"
                        />
                    </div>
                    <div>
                        <h1 className="font-bold text-2xl text-white ">
                            X Infinity Dev
                        </h1>
                        <h1 className="font-normal text-gray-50">Developer</h1>
                    </div>
                </div>
            </Card>
            <Spacer y={5} />
            <div className="flex gap-5">
                <Card className="w-96 px-6 py-7">
                    <h1 className="font-semibold">About</h1>
                    <Spacer y={3} />
                    <h1 className="text-sm text-gray-500">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Quis, non!
                    </h1>
                    <Spacer y={5} />
                    <div className="flex flex-col gap-5 ">
                        <div className="flex items-center gap-5">
                            <ContactIcon size={24} className="text-gray-900" />
                            <h1 className="text-sm text-gray-500">
                                +63 912-5279-754
                            </h1>
                        </div>
                        <div className="flex items-center gap-5">
                            <MailIcon size={24} className="text-gray-900" />
                            <h1 className="text-sm text-gray-500">
                                infinity.dev@gmail.com
                            </h1>
                        </div>
                        <div className="flex items-center gap-5">
                            <HomeIcon size={24} className="text-gray-900" />
                            <h1 className="text-sm text-gray-500">
                                30 Lorem ipsum dolor sit amet.
                            </h1>
                        </div>
                    </div>
                    <Spacer y={5} />
                    <div className="bottom-0 right-6 h-[50px] flex items-center justify-end">
                        <Button variant="light" className="w-full  text-primera">
                            Edit Info
                            <span>
                                <SmallArrowIcon
                                    size={18}
                                    className="text-primera"
                                />
                            </span>
                        </Button>
                    </div>
                </Card>
                <Card className="flex-1 px-6 py-7">
                    <h1 className="font-semibold">Transactions</h1>
                    <Spacer y={3} />
                    <div className="flex flex-col gap-5 ">
                        <div className="flex items-center gap-15">
                            <MasterCardIcon
                                size={50}
                                className="text-gray-900"
                            />
                            <h1 className="text-sm text-gray-500">
                                10********6754
                            </h1>
                            <h1 className="text-sm text-gray-500">
                                Lorem, ipsum dolor.
                            </h1>
                            <h1 className="text-sm text-gray-500">₱ 100.00</h1>
                        </div>
                        <div className="flex items-center gap-15">
                            <MasterCardIcon
                                size={50}
                                className="text-gray-900"
                            />
                            <h1 className="text-sm text-gray-500">
                                10********6754
                            </h1>
                            <h1 className="text-sm text-gray-500">
                                Lorem, ipsum dolor.
                            </h1>
                            <h1 className="text-sm text-gray-500">₱ 100.00</h1>
                        </div>
                        <div className="flex items-center gap-15">
                            <MasterCardIcon
                                size={50}
                                className="text-gray-900"
                            />
                            <h1 className="text-sm text-gray-500">
                                10********6754
                            </h1>
                            <h1 className="text-sm text-gray-500">
                                Lorem, ipsum dolor.
                            </h1>
                            <h1 className="text-sm text-gray-500">₱ 100.00</h1>
                        </div>
                    </div>
                    <Spacer y={3} />
                    <div className="bottom-0 right-6 h-[50px] flex items-center justify-end">
                        <Button variant="light" className="w-fit  text-primera">
                            See more
                            <span>
                                <SmallArrowIcon
                                    size={18}
                                    className="text-primera"
                                />
                            </span>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProfilePage;
