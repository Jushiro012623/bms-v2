import { Card } from "@heroui/react";

interface DocumentItem {
  id: number;
  document_type: { name: string; fee: string };
  purpose: string;
}

export default function PaymentDocuments({ items }: { items: DocumentItem[] }) {
  return (
    <div>
      <h2 className="font-semibold text-lg mb-3">Documents</h2>
      <div className="space-y-3">
        {items && items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-gray-50 dark:bg-zinc-800/40 p-3 rounded-lg"
          >
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {item.document_type.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.purpose}
              </p>
            </div>
            <p className="font-semibold text-sm text-gray-700 dark:text-gray-100">
              ₱ {parseFloat(item.document_type.fee).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
