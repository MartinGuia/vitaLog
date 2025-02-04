import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useClient } from "../context/ClientContext";
import { useDeliveryOrder } from "../context/DeliveryOrderContext";

function CreateDeliveryOrderPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const { openDeliveryOrder } = useDeliveryOrder();
  const { getClients, allClients } = useClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // Referencia para cerrar dropdown

  useEffect(() => {
    getClients(); // Cargar clientes
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredClients([]);
      setShowDropdown(false);
    } else {
      const results = allClients.filter((client) =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredClients(results);
      setShowDropdown(results.length > 0);
    }
  }, [searchQuery, allClients]);

  // Detectar clics fuera del dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectClient = (client) => {
    setSearchQuery(client.name); // Mostrar el nombre en el input
    setValue("client", client._id); // Guardar el ID del cliente
    setShowDropdown(false);
  };

  const onSubmit = handleSubmit((values) => {
    openDeliveryOrder(values);
    navigate("/add-tires");
  });

  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto select-none">
      <div className="text-center my-8">
        <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
          Crear Orden de Entrega
        </h1>
        {registerErrors.length > 0 && (
          <div className="flex top-10 absolute w-full">
            {registerErrors.map((error, i) => (
              <div className="bg-red-500 py-2 text-white w-full flex justify-center" key={i}>
                {error}
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={onSubmit}>
        <div className="p-4 w-full">
          <div className="mt-10">
            <h1 className="font-bold text-2xl md:text-3xl">Orden de entrega</h1>
            <p>Seleccione el cliente para la orden de entrega.</p>
          </div>

          {/* Buscador de clientes con lista de selección */}
          <div className="relative w-full lg:w-[30%] mx-auto mt-8" ref={dropdownRef}>
            <label className="block mb-2 text-sm font-medium">Cliente</label>

            {/* Input de búsqueda */}
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              className="block w-full p-2 text-sm border text-white shadow-md border-gray-300 rounded-lg bg-primary focus:ring-blue-500 focus:border-blue-500"
            />

            {/* Dropdown de clientes */}
            {showDropdown && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 max-h-40 overflow-y-auto">
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <li
                      key={client._id}
                      onClick={() => handleSelectClient(client)}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {client.name}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">No se encontraron clientes</li>
                )}
              </ul>
            )}

            {/* Campo oculto para almacenar el ID del cliente */}
            <input type="hidden" {...register("client", { required: "Debe seleccionar un cliente." })} />

            {errors.client && (
              <p className="text-red-500 text-base">{errors.client.message}</p>
            )}
          </div>
        </div>

        <div className="sm:flex sm:justify-center sm:mt-10">
          <button
            className="sm:w-[20%] text-white font-medium bg-yellow-400 hover:bg-yellow-500 py-2 px-5 rounded-md shadow-md hover:duration-500"
            type="submit"
          >
            Crear orden
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateDeliveryOrderPage;
