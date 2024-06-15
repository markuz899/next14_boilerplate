import { toast } from "react-toastify";

interface toastProps {
  type: "success" | "info" | "error";
  message: string;
  key?: any;
}

export const Toast = ({
  type,
  message,
  key = Math.floor(Math.random() * 500),
}: toastProps) => {
  // Controlla se il toast esiste già e aggiornalo invece di crearne uno nuovo
  const existingToast = toast.isActive(key || "default-id");
  if (existingToast) {
    toast.update(key || "default-id", {
      render: (
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 1, fontSize: 15 }}>{message}</div>
        </div>
      ),
    });
  } else {
    toast[type](
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1, fontSize: 15 }}>{message}</div>
      </div>,
      { toastId: key || "default-id" }
    );
  }

  return null;
};
