import React from "react";
import { useAuth } from "../context/AuthContext";
import { useClient } from "../context/ClientContext";
import { useWorkOrder } from "../context/WorkOrderContext";
import { StepBack } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";

function EditWorkOrder() {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const { getClients, allClients } = useClient();
  const { getUsers, getAllUsers } = useAuth();
  const { editWorkOrder, getWorkOrderById } = useWorkOrder();
  const [workOrder, setWorkOrder] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadWorkOrder() {
      if (params.id) {
        try {
          const fetchedWorkOrder = await getWorkOrderById(params.id);
          setWorkOrder(fetchedWorkOrder);
          reset({
            createdBy: fetchedWorkOrder.createdBy?._id,
            client: fetchedWorkOrder.client?._id,
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
    async function loadClient() {
      if (params.id) {
        try {
          getClients();
        } catch (error) {
          console.error(error);
        }
      }
    }
    async function loadUsers() {
      if (params.id) {
        try {
          getUsers();
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadWorkOrder();
    loadClient();
    loadUsers();
  }, [params.id, getWorkOrderById]);

  const onSubmit = handleSubmit(async (values) => {
    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== "")
    );

    try {
      await editWorkOrder(params.id, updatedValues);
      navigate(`/workOrder/${workOrder?._id}`);
      // setAlertData({
      //   title: "¡Exito!",
      //   description: "Llanta actualizada.",
      //   color: "success",
      // });
    } catch (error) {
      console.error(error);
      // setAlertData({
      //   title: "¡Error!",
      //   description: "Error al actualizar llanta.",
      //   color: "danger",
      // });
    }
  });

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div className="flex items-center gap-3 mb-6">
          <Link to={`/workOrder/${workOrder?._id}`}>
            <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary rounded-md px-4 py-1 duration-500  hover:duration-500 shadow-md">
              <StepBack color="white" />
            </button>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold">
            Editar Orden de trabajo {workOrder?.numero}
          </h1>
        </div>

        <form onSubmit={onSubmit}>
          <div>
            <div>
              <div className="abso w-full lg:w-[30%] mx-auto mt-8">
                <label className="block mb-2 text-sm font-medium">
                  Cliente
                </label>

                <Autocomplete
                  className="shadow-md rounded-xl"
                  defaultItems={allClients}
                  label="Selecciona un cliente"
                  listboxProps={{
                    emptyContent: "Cliente no encontrado",
                  }}
                  onSelectionChange={(key) => setValue("client", key)}
                >
                  {(item) => (
                    <AutocompleteItem key={item._id} value={item._id}>
                      {item.companyName}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
            </div>
            <div>
              <div className="abso w-full lg:w-[30%] mx-auto mt-8">
                <label className="block mb-2 text-sm font-medium">
                  Recolector
                </label>

                <Autocomplete
                  className="shadow-md rounded-xl"
                  defaultItems={getAllUsers}
                  label="Selecciona un recolector"
                  listboxProps={{
                    emptyContent: "Recolector no encontrado",
                  }}
                  onSelectionChange={(key) => setValue("createdBy", key)}
                >
                  {(item) => (
                    <AutocompleteItem key={item._id} value={item._id}>
                      {item.name + " " + item.lastName}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              className=" text-white font-medium bg-buttonSecondary py-3 px-8 rounded-md shadow-md hover:bg-buttonSecondaryHover duration-500 hover:duration-500 "
              type="submit"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditWorkOrder;
