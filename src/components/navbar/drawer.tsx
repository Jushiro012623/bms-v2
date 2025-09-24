import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    useDisclosure,
    Avatar,
    Spacer,
    Divider,
    Card,
    CardFooter,
    Image,
} from "@heroui/react";
import { drawer_links } from "./nav-buttons";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

export default function ProfileAvatar() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    return (
        <>
            <Avatar
                onClick={onOpen}
                isBordered
                src="https://heroui.com/images/hero-card-complete.jpeg"
                classNames={{
                    base: "cursor-pointer size-9 hover:scale-105 transition-all ring-2 ",
                }}
            />
            {/* <Button onPress={onOpen}>Open Drawer</Button> */}
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="xs" >
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1 items-center pt-16">
                                <Avatar
                                    isBordered
                                    src="https://heroui.com/images/hero-card-complete.jpeg"
                                    classNames={{
                                        base: "cursor-pointer size-22 hover:scale-105 transition-all ring-2 ",
                                    }}
                                />
                                <Spacer y={6} />
                                <p className="text-lg font-bold text-gray-700">
                                    Infinity Dev
                                </p>
                                <p className="text-sm text-gray-400 font-normal">
                                    idevx@gmail.com
                                </p>
                            </DrawerHeader>
                            <DrawerBody>
                                <Divider />
                                {drawer_links.map((link) => (
                                    <>
                                        <Button
                                            onPress={() => {navigate(link.href); onClose()}}
                                            className={`cursor-pointer flex w-full bg-transparent items-center justify-between rounded-lg px-3 py-2 text-sm 
                                        ${
                                            pathname === link.href
                                                ? "bg-accent-100 text-accent"
                                                : "text-gray-700 hover:bg-secondarya-50 dark:hover:bg-secondarya-50/20  dark:text-gray-200 "
                                        }
                                    `}>
                                            <span className="flex items-center gap-2">
                                                {link.icon && (
                                                    <link.icon
                                                        size={18}
                                                        className="text-second"
                                                    />
                                                )}
                                                {link.label}
                                            </span>
                                        </Button>
                                    </>
                                ))}
                                <Divider />
                                <Spacer y={2} />
                                <Card
                                    isFooterBlurred
                                    className="border-none"
                                    radius="lg">
                                    <Image
                                        alt="Woman listing to music"
                                        className="object-cover"
                                        sizes="full"
                                        src="https://heroui.com/images/hero-card.jpeg"
                                    />
                                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                        <p className="text-tiny text-white/80">
                                            Available soon.
                                        </p>
                                        <Button
                                            className="text-tiny text-white bg-black/20"
                                            color="default"
                                            radius="lg"
                                            size="sm"
                                            variant="flat">
                                            Notify me
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </DrawerBody>
                            <DrawerFooter>
                                <Button
                                    fullWidth
                                    className="bg-red-200 text-red-600 dark:bg-red-100"
                                    onPress={onClose}>
                                    Logout
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
}
