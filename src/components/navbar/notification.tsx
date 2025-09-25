import React from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
} from "@heroui/react";
import { NotificationIcon } from "../icons/duotone/notification";
const Notification = ({size}: any) => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <NotificationIcon size={size} className="border-none outline-none" />
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Dropdown menu with description"
                variant="faded"
                className="p-3">
                <DropdownSection title="Your Notifications" >
                    <DropdownItem key="1" className="mt-2 p-3">
                        <div className="w-76">
                            <h1 className="font-semibold">You Request has been Approved</h1>
                            <h1 className="font-light text-xs">Barangay Clearance</h1>
                        </div>
                    </DropdownItem>
                    <DropdownItem key="2" className="p-3">
                        <div className="w-76">
                            <h1 className="font-semibold">You Request has been Rejected</h1>
                            <h1 className="font-light text-xs">Travel / Transfer Permit</h1>
                        </div>
                    </DropdownItem>
                    <DropdownItem key="3" className="p-3">
                        <div className="w-76">
                            <h1 className="font-semibold">You Request has been Released</h1>
                            <h1 className="font-light text-xs">Barangay Clearance</h1>
                        </div>
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
};

export default Notification;
