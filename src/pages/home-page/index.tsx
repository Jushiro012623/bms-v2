import { Button, Card, CardBody, Image } from "@heroui/react";
import React from "react";
import { useNavigate } from "react-router";
import { cards } from "./cards";

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
                    Welcome to the{" "}
                    <span className="bg-clip-text bg-gradient-to-r from-primera to-primera-700 text-transparent">
                        Barangay Document System
                    </span>
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Manage your requests, view documents, and connect with the
                    barangay — all in one place.
                </p>
            </div>
            <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
                {cards.map((card, index) => (
                    <Card
                        isHoverable
                        key={index}
                        className="bg-gradient-to-br from-white to-primera-100 cursor-pointer"
                        >
                        <CardBody className="flex flex-row gap-2">
                            <Image
                                alt="HeroUI hero Image"
                                isBlurred
                                isZoomed
                                src={`https://app.requestly.io/delay/1000/${card.image}`}
                                width={300}
                                radius="md"
                                height={200}
                            />
                            <div className="flex flex-col px-4 justify-around flex-1">
                                <h1 className="text-xl font-medium">
                                    {card.title}
                                </h1>
                                <h1 className="text-second text-sm">
                                    {card.description}
                                </h1>
                                <Button
                                    className="bg-primera text-white flex justify-start w-fit rounded-md"
                                    onPress={() => navigate(card.href)}>
                                    Go to {card.title}
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
