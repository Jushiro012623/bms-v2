import { useState } from "react";
import { SmallArrowIcon } from "../../components/icons/singletone/small-arrow";
import { Accordion, AccordionItem, Card, Spacer } from "@heroui/react";

const faqs = [
    {
        question: "What is the Barangay Request Management System?",
        answer: "It is a system that allows residents to request documents and services from the barangay, such as barangay clearance, indigency certificate, and permits.",
    },
    {
        question: "How can I create a new request?",
        answer: "Log in to your account, navigate to the 'Request Form' section, select the type of request, fill out the details, and submit.",
    },
    {
        question: "How long does it take to process a request?",
        answer: "Processing time depends on the type of request. Barangay clearance usually takes 1-2 business days, while permits may take longer.",
    },
    {
        question: "Can I track my request status?",
        answer: "Yes, you can track the status of your request under the 'My Requests' section in your dashboard.",
    },
    {
        question: "Who can I contact for assistance?",
        answer: "You may contact the Barangay Help Desk through the 'Contact Us' page or visit the barangay hall directly.",
    },
];

const FAQPage = () => {
    return (
        <div className="max-w-3xl mx-auto p-6 mt-20">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold bg-clip-text bg-gradient-to-r from-primera to-primera-700 text-transparent">
                    Frequently Asked Questions
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Find answers to the most common questions about the Barangay
                    Request Management System.
                </p>
            </div>
            <Spacer y={10} />
            <Accordion variant="splitted">
                {faqs.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        aria-label="Accordion 1"
                        title={faq.question}>
                        <Card radius="sm" className="px-5 py-4 mb-2">
                            <h1 className="text-sm">{faq.answer}</h1>
                        </Card>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default FAQPage;
