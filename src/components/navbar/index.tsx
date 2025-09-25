import {
    Avatar,
    BreadcrumbItem,
    Breadcrumbs,
    Button,
    Kbd,
} from "@heroui/react";
import { SearchIcon } from "../icons/singletone/search";
import navButtons from "./nav-buttons";
import { HomeIcon } from "../icons/duotone/home";
import { useLocation, useNavigate } from "react-router";
import ProfileAvatar from "./drawer";

import { useTheme } from "@heroui/use-theme";
import { appPath } from "../../constants/app-path";
const Navbar = () => {
    const { theme, setTheme } = useTheme();

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const crumbs = appPath[pathname] || [];

    const onIconPress = (id: string) => {
        switch (id) {
            case "themeToggle":
                setTheme(theme === "light" ? "dark" : "light");
                break;
            default:
                break;
        }
    };
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
                        {crumbs.map((item, index) => (
                            <BreadcrumbItem
                                key={item.label}
                                onClick={() => navigate(item.path)}
                                classNames={{
                                    item:
                                        index === crumbs.length - 1
                                            ? "text-accent"
                                            : "",
                                }}>
                                {item.label}
                            </BreadcrumbItem>
                        ))}
                    </Breadcrumbs>
                </div>
                <div className="flex items-center gap-2">
                    <div className=" px-3 h-9 cursor-pointer gap-2 flex items-center justify-center group bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-zinc-700 transition-all">
                        <SearchIcon
                            size={15}
                            className="transition-transform group-hover:scale-105 text-second dark:text-gray-100 "
                        />
                        <Kbd
                            keys={["command"]}
                            classNames={{
                                base: "h-6 text-sm rounded-sm",
                            }}>
                            K
                        </Kbd>
                    </div>
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
