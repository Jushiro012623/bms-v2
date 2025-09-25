import { BreadcrumbItem, Breadcrumbs, Button } from "@heroui/react";
import navButtons from "./nav-buttons";
import { HomeIcon } from "../icons/duotone/home";
import { useLocation, useNavigate } from "react-router";
import ProfileAvatar from "./drawer";

import { useTheme } from "@heroui/use-theme";
import { flatPath } from "../../constants/app-path";
import CommandK from "./kbd";
import { useEffect, useMemo, useState } from "react";
const Navbar = () => {
    const { theme, setTheme } = useTheme();

    const location = useLocation();
    const navigate = useNavigate();

    const pathname = (location.pathname || "/").replace(/\/$/, "") || "/";

    const onIconPress = (id: string) => {
        switch (id) {
            case "themeToggle":
                setTheme(theme === "light" ? "dark" : "light");
                break;
            default:
                break;
        }
    };

    const currentItem = useMemo(() => {
        let exact = flatPath.find((item) => item.path === pathname);
        if (exact) return exact;

        const candidates = flatPath.filter((item) =>
            pathname.startsWith(item.path)
        );
        if (candidates.length === 0) return null;

        // pick the longest path (deepest match)
        return candidates.reduce((a, b) =>
            a.path.length >= b.path.length ? a : b
        );
    }, [pathname]);

    // local crumbs state (always replace, never mutate)
    const [crumbs, setCrumbs] = useState<{ label: string; path: string }[]>([]);

    useEffect(() => {
        if (currentItem && Array.isArray(currentItem.crumbs)) {
            // clone to avoid accidental mutation elsewhere
            setCrumbs(
                currentItem.crumbs.map((c: any) =>
                    typeof c === "string"
                        ? { label: c, path: currentItem.path }
                        : { ...c }
                )
            );
        } else {
            // fallback (you can choose to show Home or clear)
            setCrumbs([{ label: "Home", path: "/" }]);
        }
    }, [currentItem]);
    return (
        <nav className="h-20 w-full sticky top-0 z-50 border-b border-gray-100 dark:border-zinc-800 px-10 backdrop-blur-md">
            <div className="flex-1 h-full flex justify-between">
                <div className="flex flex-col justify-center text-sm">
                    <Breadcrumbs>
                        <BreadcrumbItem onClick={() => navigate("/")}>
                            <HomeIcon
                                className="text-second dark:text-accent-100"
                                size={20}
                            />
                        </BreadcrumbItem>
                        {crumbs.map((crumb, index) => {
                            const isLast = index === crumbs.length - 1;
                            return (
                                <BreadcrumbItem
                                    key={`${crumb.path}-${index}`}
                                    onClick={() => {
                                        // only navigate when not last crumb
                                        if (!isLast) navigate(crumb.path);
                                    }}
                                    classNames={{
                                        item: isLast
                                            ? "text-accent font-semibold"
                                            : "cursor-pointer",
                                    }}>
                                    {crumb.label}
                                </BreadcrumbItem>
                            );
                        })}
                    </Breadcrumbs>
                </div>
                <div className="flex items-center gap-2">
                    <CommandK />
                    {navButtons.map(({ id, icon: Icon }) => (
                        <Button
                            key={id}
                            isIconOnly
                            onPress={() => onIconPress(id)}
                            radius="full"
                            size="sm"
                            variant="light"
                            className="min-w-0 size-10 p-0 ">
                            <Icon
                                theme={theme}
                                size={23}
                                className="text-second dark:text-gray-100"
                            />
                        </Button>
                    ))}

                    <ProfileAvatar />
                </div>
            </div>
        </nav>
    );
};

export { Navbar };
