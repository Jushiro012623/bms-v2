import { useEffect, useMemo, useState } from "react";
import {
    Button,
    Kbd,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Input,
    Divider,
} from "@heroui/react";
import { SearchIcon } from "../icons/singletone/search";
import { useNavigate } from "react-router";
import { flatPath } from "../../constants/app-path"; // use flatPath instead

export default function CommandK() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const allRoutes = useMemo(() => {
        return flatPath.filter((item) => item.routable);
    }, []);

    const results = useMemo(() => {
        if (!query) return allRoutes;
        return allRoutes.filter((item) =>
            item.label.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, allRoutes]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                onOpen();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onOpen]);

    const handleSelect = (path: string) => {
        navigate(path);
        setQuery("");
        onClose();
    };

    return (
        <>
            <Button
                onPress={onOpen}
                className="px-3 h-9 cursor-pointer gap-2 flex items-center justify-center group bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-zinc-700 transition-all">
                <SearchIcon
                    size={15}
                    className="transition-transform group-hover:scale-105 text-second dark:text-gray-100"
                />
                <Kbd keys={["ctrl"]}>K</Kbd>
            </Button>

            {/* Command Palette */}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="xl"
                hideCloseButton>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex justify-between items-center gap-5 py-7">
                                <Input
                                    startContent={
                                        <SearchIcon
                                            size={15}
                                            className="transition-transform group-hover:scale-105 text-second dark:text-gray-100"
                                        />
                                    }
                                    isClearable
                                    classNames={{
                                        input: [
                                            "bg-transparent",
                                            "text-black/90 dark:text-white/90",
                                        ],
                                        innerWrapper: "bg-transparent ",
                                        inputWrapper: [
                                            "h-full",
                                            "border-1",
                                            "cursor-text!",
                                            "border-gray-100",
                                        ],
                                    }}
                                    onClear={() => setQuery("")}
                                    radius="sm"
                                    variant="bordered"
                                    autoFocus
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full"
                                />
                                <Kbd className="h-10 w-13 flex justify-center bg-transparent border-0  ring-0 border-gray-100">
                                    Esc
                                </Kbd>
                            </ModalHeader>
                            <Divider />
                            <ModalBody className="max-h-[400px] overflow-y-auto scrollbar rounded-lg scroll">
                                {results.length === 0 ? (
                                    <p className="text-gray-500 text-sm">
                                        No results found.
                                    </p>
                                ) : (
                                    <ul className="space-y-2">
                                        {results.map((item, i) => (
                                            <li
                                                key={i}
                                                className="flex justify-between items-center rounded-lg py-3 px-4 hover:ring-1 hover:bg-accent-50 dark:hover:bg-gray-800  ring-accent cursor-pointer"
                                                onClick={() =>
                                                    handleSelect(item.path)
                                                }>
                                                <div>
                                                    <p className="font-medium text-sm">
                                                        {item.label}
                                                    </p>
                                                    <p className="text-xs text-gray-500 font-bold">
                                                        {item.path}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    {item.type.map((i) => (
                                                        <span className="px-2 py-1 text-xs rounded-md bg-accent-100 text-accent-800 dark:bg-accent-300">
                                                            {i}
                                                        </span>
                                                    ))}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
