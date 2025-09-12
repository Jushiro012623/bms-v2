import { useState, useCallback, memo, useEffect } from "react";
import { SmallArrowIcon } from "../icons/singletone/small-arrow";
import type { Item } from "./types";
import { Button } from "@heroui/react";
import { useLocation, useNavigate } from "react-router";

type SidebarLinksProps = {
    tab: string;
    items: Item[];
    activeItem: string;
    setActiveItem: (value: string) => void;
};

export const SidebarLinks = ({
    tab,
    items,
    activeItem,
    setActiveItem,
}: SidebarLinksProps) => {
    const [openSection, setOpenSection] = useState(true);
    const [openItem, setOpenItem] = useState<string | null>(null);
    const { pathname } = useLocation();

    useEffect(() => {
        const parentWithActiveChild = items.find((item) =>
            item.children?.some((child) => child.href === pathname)
        );
        if (parentWithActiveChild) {
            setOpenItem(parentWithActiveChild.id);
            setActiveItem(
                parentWithActiveChild.children!.find(
                    (c) => c.href === pathname
                )!.id
            );
        } else {
            const activeParent = items.find((item) => item.href === pathname);
            if (activeParent) {
                setActiveItem(activeParent.id);
            }
        }
    }, [pathname, items, setActiveItem]);

    return (
        <>
            {/* Section header */}
            <button
                onClick={() => setOpenSection(!openSection)}
                className="group flex w-full items-center text-xs font-semibold text-gray-400 mb-2">
                <SmallArrowIcon
                    size={15}
                    className={`transition-transform duration-200 ${
                        openSection ? "rotate-90" : "rotate-0"
                    }`}
                />
                <span className="ml-1 text-xs cursor-pointer transition-transform duration-200 group-hover:translate-x-1">
                    {tab}
                </span>
            </button>

            {openSection && (
                <ul className="space-y-1">
                    {items.map((item) => (
                        <SidebarItem
                            key={item.id}
                            item={item}
                            activeItem={activeItem}
                            openItem={openItem}
                            setOpenItem={setOpenItem}
                            setActiveItem={setActiveItem}
                        />
                    ))}
                </ul>
            )}
        </>
    );
};

// ================== SidebarItem ==================
const SidebarItem = memo(
    ({
        item,
        activeItem,
        openItem,
        setOpenItem,
        setActiveItem,
    }: {
        item: Item;
        activeItem: string;
        openItem: string | null;
        setOpenItem: (id: string | null) => void;
        setActiveItem: (value: string) => void;
    }) => {
        const navigate = useNavigate();
        const { pathname } = useLocation();

        const handlePress = () => {
            if (item.children) {
                setOpenItem(openItem === item.id ? null : item.id);
            } else if (item.href) {
                setActiveItem(item.id);
                navigate(item.href);
            }
        };

        return (
            <li>
                <Button
                    onPress={handlePress}
                    className={`cursor-pointer flex w-full bg-transparent items-center justify-between rounded-lg px-3 py-2 text-sm ${
                        pathname === item.href
                            ? "bg-accent-100 text-accent"
                            : "text-gray-700 hover:bg-secondarya-50"
                    }`}>
                    <span className="flex items-center gap-2">
                        {item.icon && (
                            <item.icon size={16} className="text-accent" />
                        )}
                        {item.label}
                    </span>
                    {item.children && (
                        <SmallArrowIcon
                            size={16}
                            className={`transition-transform duration-200 ${
                                openItem === item.id
                                    ? "rotate-90 text-accent"
                                    : "rotate-0"
                            }`}
                        />
                    )}
                </Button>

                {item.children && openItem === item.id && (
                    <ul className="ml-6 mt-1 space-y-1 pl-3">
                        {item.children.map((child) => (
                            <SidebarChild
                                key={child.id}
                                child={child}
                                activeItem={activeItem}
                                setActiveItem={setActiveItem}
                            />
                        ))}
                    </ul>
                )}
            </li>
        );
    }
);

// ================== SidebarChild ==================
const SidebarChild = memo(
    ({
        child,
        activeItem,
        setActiveItem,
    }: {
        child: Item;
        activeItem: string;
        setActiveItem: (value: string) => void;
    }) => {
        const navigate = useNavigate();
        const { pathname } = useLocation();

        const handlePress = () => {
            if (child.href) {
                setActiveItem(child.id);
                navigate(child.href);
            }
        };

        return (
            <li>
                <Button
                    onPress={handlePress}
                    className={`cursor-pointer bg-transparent flex w-full justify-between items-center rounded-lg px-3 py-2 text-sm ${
                        pathname === child.href
                            ? "bg-accent-100 text-accent"
                            : "text-gray-700 hover:bg-secondarya-50"
                    }`}>
                    <span className="flex items-center gap-2">
                        {child.icon && (
                            <child.icon size={16} className="text-accent" />
                        )}
                        {child.label}
                    </span>
                </Button>
            </li>
        );
    }
);
