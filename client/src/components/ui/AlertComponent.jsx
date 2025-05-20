import { Alert } from "@heroui/react";
import { useEffect } from "react";

function AlertComponent({ title, description, color, onClose }) {
      useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Llama a la función para cerrar la alerta
    }, 2500);

    return () => clearTimeout(timer); // Limpieza del timer
  }, [onClose]);
  return (
    <div className="flex items-center justify-center w-full">
      <Alert
        hideIcon
        color={color}
        description={description}
        title={title}
        
        variant="faded"
      />
    </div>
  );
}


export default AlertComponent;
