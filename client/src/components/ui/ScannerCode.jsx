import { BrowserMultiFormatReader } from "@zxing/browser";
import { useEffect, useRef } from "react";

function ScannerCode({ onDetected, onClose }) {
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const streamControlRef = useRef(null);

  useEffect(() => {
    const initScanner = async () => {
      try {
        codeReaderRef.current = new BrowserMultiFormatReader();

        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        const backCamera = devices.find((d) =>
          d.label.toLowerCase().includes("back")
        );
        const selectedDeviceId = backCamera?.deviceId || devices[0]?.deviceId;

        if (!selectedDeviceId) {
          throw new Error("No se encontró ninguna cámara");
        }

        const controls = await codeReaderRef.current.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current,
          (result, error, ctrl) => {
            if (result) {
              onDetected(result.getText());
              if (navigator.vibrate) navigator.vibrate(100);

              ctrl.stop(); // detener lectura
              stopVideoStream(); // detener cámara real
              onClose();
            }
          }
        );

        streamControlRef.current = controls;
      } catch (err) {
        console.error("Error iniciando lector:", err);
      }
    };

    const stopVideoStream = () => {
      const video = videoRef.current;
      const stream = video?.srcObject;

      if (stream && stream.getTracks) {
        stream.getTracks().forEach((track) => {
          if (track.readyState === "live") {
            track.stop();
          }
        });
      }

      if (video) {
        video.srcObject = null;
      }
    };

    initScanner();

    return () => {
      if (streamControlRef.current) {
        streamControlRef.current.stop();
      }
      stopVideoStream();
    };
  }, [onDetected, onClose]);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="w-full h-auto rounded-md"
        autoPlay
        muted
        playsInline
      />
      <div className="absolute top-1/2 left-1/2 w-[60%] h-[30%] -translate-x-1/2 -translate-y-1/2 border-4 border-green-500 rounded-lg pointer-events-none" />
    </div>
  );
}

export default ScannerCode;
