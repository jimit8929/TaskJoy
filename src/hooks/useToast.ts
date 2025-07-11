import { useCallback, useState } from "react";

type ToastType = "default" | "success" | "error";

type Toast = {
  id: number;
  title: string;
  description?: string;
  type?: ToastType;
};

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((toastData: Omit<Toast, "id">) => {
    setToasts((prev) => [
      ...prev,
      { ...toastData, id: Date.now() + Math.random() },
    ]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
  }, []);

  return { toast, toasts };
}
