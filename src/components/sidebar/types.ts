import type { FC } from "react";
import type { IconSvgProps } from "../icons/types";

export type Item = {
    id: string;
    label: string;
    icon?: FC<IconSvgProps>;
    children?: Item[];
    href?: string;
};