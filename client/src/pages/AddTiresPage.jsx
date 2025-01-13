import { useTire } from "../context/TireContext";
import { useDeliveryOrder } from "../context/DeliveryOrderContext";
import { useEffect, useState } from "react";

function AddTiresPage() {
  const { getTiresByInspection, tires } = useTire();
  const { addTiresDeliveryOrder } = useDeliveryOrder();
  const [selectedTires, setSelectedTires] = useState([]);

  useEffect(() => {
    getTiresByInspection();
  }, []);

  // Maneja la selección de una llanta
  const handleSelectTire = (tireId) => {
    setSelectedTires((prevSelected) =>
      prevSelected.includes(tireId)
        ? prevSelected.filter((id) => id !== tireId) // Deseleccionar
        : [...prevSelected, tireId] // Seleccionar
    );
  };

  // Maneja el envío de las llantas seleccionadas
  const handleSendSelectedTires = () => {
    addTiresDeliveryOrder(selectedTires);
    setSelectedTires([]); // Limpia la selección después del envío
  };

  return (
    <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
      <div>
        <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-xl sm:text-2xl">
          Orden de entrega
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Seleccionar</th>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Marca</th>
              <th className="border border-gray-300 px-4 py-2">Modelo</th>
              <th className="border border-gray-300 px-4 py-2">Tamaño</th>
            </tr>
          </thead>
          <tbody>
            {tires.map((tire, i) => (
              <tr key={i}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedTires.includes(tire.id)}
                    onChange={() => handleSelectTire(tire.id)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">{tire.id}</td>
                <td className="border border-gray-300 px-4 py-2">{tire.brand}</td>
                <td className="border border-gray-300 px-4 py-2">{tire.model}</td>
                <td className="border border-gray-300 px-4 py-2">{tire.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSendSelectedTires}
          disabled={selectedTires.length === 0}
          className={`px-4 py-2 rounded ${
            selectedTires.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Enviar Seleccionados
        </button>
      </div>
    </div>
  );
}

export default AddTiresPage