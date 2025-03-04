import { useTire } from "../context/TireContext";
import { useDeliveryOrder } from "../context/DeliveryOrderContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/ui/Alert";

function AddTiresPage() {
  const { getTiresByInspection, tires } = useTire();
  const { addTiresDeliveryOrder, closeDeliveryOrder } = useDeliveryOrder();
  const [selectedTires, setSelectedTires] = useState([]);
  const [alert, setAlert] = useState(null); // Estado para manejar la alerta
  const navigate = useNavigate();

  useEffect(() => {
    getTiresByInspection();
  }, []);

  // Maneja la selección de una llanta
  const handleSelectTire = (tireId) => {
    setSelectedTires(
      (prevSelected) =>
        prevSelected.includes(tireId)
          ? prevSelected.filter((id) => id !== tireId) // Deseleccionar
          : [...prevSelected, tireId] // Seleccionar
    );
  };

  // Maneja el envío de las llantas seleccionadas
  const handleSendSelectedTires = async () => {
    if (selectedTires.length === 0) return;

    try {
      await addTiresDeliveryOrder(selectedTires);
      await closeDeliveryOrder();
      setAlert({
        message: "Se agregaron correctamente las llantas",
        type: "success",
        onAccept: () => navigate(`/allDeliveryOrders`), // Redirige tras cerrar la alerta
      }); // Muestra la alerta
    } catch (error) {
      console.error(error);
      setAlert({
        message: "Hubo un error al registrar las llantas",
        type: "error",
      });
    } finally {
      setSelectedTires([]); // Limpia la selección
    }
  };

  return (
    <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
       {/* Mostrar alerta */}
       {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onAccept={alert.onAccept} // Maneja el cierre de la alerta con redirección
        />
      )}
      <div>
        <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
          Orden de Entrega
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-primary text-white">
            <tr className="text-sm">
              <th className="px-6 py-2 text-left">Seleccionar</th>
              <th className="px-6 py-2 text-left">Orden de Trabajo</th>
              <th className="px-6 py-2 text-left">Código de Barras</th>
              <th className="px-6 py-2 text-left">Código Item</th>
              <th className="px-6 py-2 text-left">Medida</th>
              <th className="px-6 py-2 text-left">Banda Aplicada</th>
              <th className="px-6 py-2 text-left">Marca</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {tires.map((tire, i) => (
              <tr
                key={i}
                className={`hover:bg-blue-50 transition duration-150 ${
                  i % 2 === 0 ? "bg-gray-50 text-sm" : ""
                }`}
              >
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    value={tire._id}
                    checked={selectedTires.includes(tire._id)}
                    onChange={() => handleSelectTire(tire._id)}
                    className="rounded focus:ring-2 focus:ring-blue-300"
                  />
                </td>
                <td className="px-6">{tire.workOrder.numero}</td>
                <td className="px-6">{tire.barCode}</td>
                <td className="px-6">{tire.itemCode}</td>
                <td className="px-6">{tire.helmetMeasurement}</td>
                <td className="px-6">{tire.appliedBand || tire.appliedBandBandag}</td>
                <td className="px-6">{tire.brand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSendSelectedTires}
          disabled={selectedTires.length === 0}
          className={`px-6 py-3 rounded-lg shadow-lg transition-all duration-500 hover:duration-500 ${
            selectedTires.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed "
              : "bg-vbYellow text-black font-semibold  hover:bg-yellow-400 transform hover:-translate-y-1 "
          }`}
        >
          Enviar Seleccionados
        </button>
      </div>

     
    </div>
  );
}

export default AddTiresPage;
