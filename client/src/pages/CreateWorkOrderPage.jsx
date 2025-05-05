import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useWorkOrder } from "../context/WorkOrderContext";
import { useEffect, useState } from "react";
import { useClient } from "../context/ClientContext";
import { Autocomplete, AutocompleteItem } from "@heroui/react";

function CreateWorkOrderPage() {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const { openWorkOrder } = useWorkOrder();
  const { getClients, allClients } = useClient();
  const [selectedClientId, setSelectedClientId] = useState(null);

  // const dropdownRef = useRef(null); // Referencia para detectar clics fuera

  useEffect(() => {
    getClients(); // Cargar los clientes
  }, []);

  const onSubmit = handleSubmit((values) => {
    if (!selectedClientId) {
      alert("Debe seleccionar un cliente.");
      return;
    }

    const formData = {
      ...values,
      client: selectedClientId, // lo agregas aquí manualmente
    };

    openWorkOrder(formData);
    navigate("/add-tire");
  });
 

  return (
    <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto select-none">
      <div className="text-center my-8">
        <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
          Crear Orden de Trabajo
        </h1>
        {registerErrors.length > 0 && (
          <div className="flex top-10 absolute w-full">
            {registerErrors.map((error, i) => (
              <div
                className="bg-red-500 py-2 text-white w-full flex justify-center"
                key={i}
              >
                {error}
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={onSubmit}>
        <div className="p-4 w-full">
          <div className="mt-10">
            <h1 className="font-bold text-2xl md:text-3xl">Orden de Trabajo</h1>
            <p>Seleccione el cliente para la orden de trabajo.</p>
          </div>

          {/* Buscador de clientes con lista de selección */}
          <div className="abso w-full lg:w-[30%] mx-auto mt-8">
            <label className="block mb-2 text-sm font-medium">Cliente</label>

            <Autocomplete
              className="shadow-md rounded-xl "
              defaultItems={allClients}
              label="Selecciona un cliente"
              listboxProps={{
                emptyContent: "Cliente no encontrado",
              }}
              onSelectionChange={(key) => setSelectedClientId(key)} // aquí guardas el _id
            >
              {(item) => (
                <AutocompleteItem key={item._id} value={item._id}>
                  {item.companyName}
                </AutocompleteItem>
              )}
            </Autocomplete>
         
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

export default CreateWorkOrderPage;
