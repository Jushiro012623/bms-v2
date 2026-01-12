import { Spacer, User } from "@heroui/react";
import { SidebarLinks } from "./sidebar-links-component";
import { sideBarsLinks } from "./items";
import React, { useContext, useState } from "react";
import { Logo } from "../icons/duotone/logo";
import { UserContext } from "../../provider/UserContext";

const Sidebar = () => {
    const { user } = useContext(UserContext);

    const { name, email } = user || {};
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
                {sideBarsLinks.map((links: any, index: number) => (
                    <React.Fragment key={index}>
                        <SidebarLinks
                            tab={links.tab}
                            items={links.items}
                            activeItem={activeItem}
                            setActiveItem={setActiveItem}
                        />
                        <Spacer y={7} />{" "}
                    </React.Fragment>
                ))}
            </div>
            <div className="p-4 w-full flex">
                <User
                    avatarProps={{
                        src: "https://heroui.com/images/hero-card-complete.jpeg",
                    }}
                    description={email}
                    name={name}
                    className="w-full justify-start"
                />
            </div>
        </aside>
    );
};

export { Sidebar };
