import { HomeIcon } from "../icons/duotone/home";
import { DocumentIcon } from "../icons/duotone/document";
import type { Item } from "./types";
import { ChatIcon } from "../icons/duotone/chat";
import { QuestionIcon } from "../icons/duotone/question";
import { ContactIcon } from "../icons/duotone/contact";
import { HistoryIcon } from "../icons/duotone/history";
import { ListIcon } from "../icons/duotone/list";
import { AddIcon } from "../icons/duotone/add";

export const overviewItems: Item[] = [
    { id: "home", label: "Home", icon: HomeIcon, href: "/" },
    {
        id: "document",
        label: "Document",
        icon: DocumentIcon,
        children: [
            {
                id: "history",
                label: "History",
                icon: HistoryIcon,
                href: "/documents"
            },
            {
                id: "request-form",
                label: "Request Form",
                icon: AddIcon,
                href: "/documents/form-request"
            },
            {
                id: "types",
                label: "Types",
                icon: ListIcon,
                href: "/documents/availables"
            },
        ],
    },
    { id: "chat", label: "Chats", icon: ChatIcon, href: "/chats" },
];

export const supportItems: Item[] = [
    { id: "faq", label: "Faq", icon: QuestionIcon, href: "/faq" },
    { id: "contact", label: "Contact", icon: ContactIcon, href: "/contact" },
];
