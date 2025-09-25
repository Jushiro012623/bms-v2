import {
  Button,
  Card,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useState } from "react";
import { REQUEST_STATUS } from "../../constants/status";

interface Method {
  key: string;
  label: string;
  icon: React.ReactNode;
}

export default function PaymentMethodSelector({
  methods,
  selected,
  onChange,
}: {
  methods: Method[];
  selected: Method;
  onChange: (key: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6">
      <h2 className="font-semibold text-lg mb-3">Payment Method</h2>

      {/* Button showing selection */}
      <div className="px-4 w-full flex items-center  gap-4 bg-gray-50 dark:bg-zinc-800/40 py-2 rounded-xl">
        <div className="flex items-center gap-4">{selected?.icon}</div>
        <div className="flex items-center gap-4 text-sm">10********6754</div>
        <Button className="ml-auto" onPress={() => setIsOpen(true)}>Change</Button>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <ModalHeader className="text-lg font-semibold">
            Choose Payment Method
          </ModalHeader>
          <ModalBody>
            <div className="w-full flex flex-col gap-4">
              {methods.map((method) => (
                <Card
                  key={method.key}
                  isPressable
                  onPress={() => {
                    onChange(method.key);
                    setIsOpen(false);
                  }}
                  className={`flex flex-row items-center px-5 h-fit border border-gray-100 rounded-xl transition-all ${
                    selected?.key === method.key
                      ? " shadow-md bg-blue-50"
                      : ""
                  }`}
                >
                  {method.icon}
                  <p className="font-medium text-sm ml-5">10********6754</p>
                  <Chip radius="sm" className={`${REQUEST_STATUS['approved']} ml-auto font-medium text-sm`}>
                    Available
                  </Chip>
                </Card>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
