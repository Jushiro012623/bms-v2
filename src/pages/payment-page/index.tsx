import { useMemo, useState } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Button,
    Divider,
} from "@heroui/react";
import PaymentDocuments from "../payment-page/documents";
import PaymentMethodSelector from "../payment-page/selector";
import PaymentSummary from "../payment-page/summary";
import { VisaIcon } from "../../components/icons/multicolor/visa";
import { MasterCardIcon } from "../../components/icons/multicolor/mastercard";
import { Navigate, useLocation } from "react-router";

const methods = [
    {
        key: "visa",
        label: "Visa",
        icon: <VisaIcon size={55} className="text-blue-600" />,
    },
    {
        key: "mastercard",
        label: "Mastercard",
        icon: <MasterCardIcon size={55} className="text-red-600" />,
    },
    {
        key: "cash",
        label: "Cash",
        icon: <MasterCardIcon size={55} className="text-green-600" />,
    },
];

export default function PaymentGatewayPage() {
    const location = useLocation();
    const { data } = location.state || {};

    if (!data) {
        return <Navigate to="/documents/" />;
    }

    console.log(data);

    const [paymentMethod, setPaymentMethod] = useState("cash");

    const subtotal = useMemo(() => {
        const items = Array.isArray(data) ? data : [data]; // normalize
        return items.reduce(
            (sum: number, item: any) =>
                sum + parseFloat(item.document_type.fee),
            0
        );
    }, [data]);

    const selectedMethod = methods.find((m) => m.key === paymentMethod)!;
    
    const normalizedData = Array.isArray(data) ? data : [data];
    return (
        <main className="mx-auto max-w-[55rem] mt-15">
            <Card className="shadow-md rounded-2xl px-4 py-3">
                <CardHeader>
                    <h1 className="font-bold text-xl">Payment Gateway</h1>
                </CardHeader>
                <Divider />
                <CardBody className="space-y-6">
                    <PaymentDocuments items={normalizedData} />
                    <PaymentMethodSelector
                        methods={methods}
                        selected={selectedMethod}
                        onChange={setPaymentMethod}
                    />
                    <PaymentSummary subtotal={subtotal} />
                </CardBody>
                <CardFooter className="flex justify-end">
                    <Button className="bg-primera text-white">Pay Now</Button>
                </CardFooter>
            </Card>
        </main>
    );
}
