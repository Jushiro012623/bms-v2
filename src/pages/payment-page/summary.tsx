import { Card, Divider } from "@heroui/react";

export default function PaymentSummary({
  subtotal,
  serviceFee = 10,
}: {
  subtotal: number;
  serviceFee?: number;
}) {
  return (
    <Card className="p-6 rounded-xl shadow-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
      <h2 className="font-semibold text-lg mb-4">Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <p className="text-gray-600 dark:text-gray-400">Subtotal</p>
          <p className="text-gray-900 dark:text-gray-100">₱ {subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-sm">
          <p className="text-gray-600 dark:text-gray-400">Service Fee</p>
          <p className="text-gray-900 dark:text-gray-100">₱ {serviceFee.toFixed(2)}</p>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between text-base font-bold">
          <p>Total</p>
          <p className="text-primera dark:text-accent">₱ {(subtotal + serviceFee).toFixed(2)}</p>
        </div>
      </div>
    </Card>
  );
}
