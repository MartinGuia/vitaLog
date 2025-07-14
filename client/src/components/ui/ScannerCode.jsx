import { useEffect, useRef } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

function ScannerCode({ onDetected, onClose }) {
  const scannerRef = useRef(null);
  const containerId = "scanner-ui";

  useEffect(() => {
    const html5QrCode = new Html5Qrcode(containerId);
    scannerRef.current = html5QrCode;

    const config = {
      fps: 10,
      qrbox: { width: 300, height: 200 },
      formatsToSupport: [
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.EAN_8,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
      ],
    };

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const backCamera = devices.find((d) =>
            d.label.toLowerCase().includes("back")
          );
          const cameraId = backCamera?.id || devices[0].id;

          html5QrCode
            .start(
              cameraId,
              config,
              (decodedText) => {
                if (navigator.vibrate) navigator.vibrate(100);
                onDetected(decodedText);

                html5QrCode
                  .stop()
                  .then(() => {
                    return html5QrCode.clear();
                  })
                  .then(() => {
                    onClose(); // desmonta después de que el escáner está 100% detenido y limpio
                  })
                  .catch((err) => {
                    console.warn("Error al detener el escáner:", err);
                    onClose(); // igual cerramos si algo falla
                  });
              },
              (errorMessage) => {
                // ignorar errores de lectura
              }
            )
            .catch((err) => {
              console.error("Error al iniciar la cámara:", err);
              onClose();
            });
        } else {
          console.error("No se encontraron cámaras.");
          onClose();
        }
      })
      .catch((err) => {
        console.error("Error al obtener las cámaras:", err);
        onClose();
      });

    return () => {
      if (html5QrCode && html5QrCode._isScanning) {
        html5QrCode
          .stop()
          .then(() => html5QrCode.clear())
          .catch(() => {});
      }
    };
  }, [onDetected, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white rounded-xl p-4 shadow-lg w-[95%] max-w-md relative">
        <h2 className="text-center text-xl font-semibold text-sky-800 mb-2">
          Escanea el código
        </h2>
        <div
          id={containerId}
          className="w-full min-h-[250px] rounded overflow-hidden"
        />
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default ScannerCode;

