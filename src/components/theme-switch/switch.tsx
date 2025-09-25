import { useState, useEffect, type FC } from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useSwitch, type SwitchProps } from "@heroui/switch";
import clsx from "clsx";
import { SunIcon } from "../icons/duotone/sun";
import { GoMoon } from "react-icons/go";

export interface ThemeSwitchProps {
    className?: string;
    classNames?: SwitchProps["classNames"];
    theme: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
    className,
    classNames,
    theme,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    const {
        Component,
        slots,
        isSelected,
        getBaseProps,
        getInputProps,
        getWrapperProps,
    } = useSwitch({
        isSelected: theme === "light",
        // onChange: () => setTheme(theme === "light" ? "dark" : "light"),
    });

    useEffect(() => {
        setIsMounted(true);
    }, [isMounted]);

    // Prevent Hydration Mismatch
    if (!isMounted) return <div className="w-6 h-6" />;

    return (
        <Component
            aria-label={
                isSelected ? "Switch to dark mode" : "Switch to light mode"
            }
            {...getBaseProps({
                className: clsx(
                    "px-px transition-opacity hover:opacity-80 cursor-pointer",
                    className,
                    classNames?.base
                ),
            })}>
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <div>
                {isSelected ? (
                    <GoMoon
                        size={22}
                        className="text-second dark:text-gray-100"
                    />
                ) : (
                    <SunIcon
                        size={22}
                        className="text-second dark:text-gray-100"
                    />
                )}
            </div>
        </Component>
    );
};
