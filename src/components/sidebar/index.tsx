import { Spacer, User } from "@heroui/react";
import { SidebarLinks } from "./sidebar-links-component";
import { managementItems, overviewItems, supportItems } from "./items";
import { useState } from "react";
import { Logo } from "../icons/duotone/logo";

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState<string>("");
    return (
        <aside className="w-2xs shrink-0 border-e border-gray-100 dark:border-zinc-800 flex flex-col">
            <div className="h-20 flex items-center">
                <Spacer x={5} />
                <Logo className="text-accent" size={50} />
                <Spacer x={1} />
                <h1 className="text-3xl font-black font-inter tracking-wide bg-clip-text bg-gradient-to-r from-accent  to-primera text-transparent">
                    BRMS
                </h1>
            </div>

            <div className="flex-1 p-4 w-full">
                <SidebarLinks
                    tab="OVERVIEW"
                    items={overviewItems}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />
                <Spacer y={7} />
                <SidebarLinks
                    tab="MANAGEMENT"
                    items={managementItems}
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
                        src: "https://heroui.com/images/hero-card-complete.jpeg",
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
