import { Spacer, User } from "@heroui/react";
import { ReactIcon } from "../icons/singletone/react";
import { SidebarLinks } from "./sidebar-links-component";
import { overviewItems, supportItems } from "./items";
import { useState } from "react";

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState<string>("");
    return (
        <aside className="w-2xs shrink-0 border-e border-gray-100 flex flex-col">
            <div className="h-20 flex items-center">
                <Spacer x={5} />
                <ReactIcon className="text-accent" size={50} />
            </div>

            <div className="flex-1 bg-white p-4 w-full">
                <SidebarLinks
                    tab="OVERVIEW"
                    items={overviewItems}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />
                <Spacer y={7} />
                <SidebarLinks
                    tab="SUPPORT"
                    items={supportItems}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />
            </div>
            <div className="p-4 w-full flex">
                <User
                    avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                    }}
                    description="idevx@gmail.com"
                    name="Infinity Dev"
                    className="w-full justify-start"
                />
            </div>
        </aside>
    );
};

export { Sidebar };
