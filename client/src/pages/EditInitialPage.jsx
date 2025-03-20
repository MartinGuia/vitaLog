import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTire } from "../context/TireContext";
import { StepBack } from "lucide-react";
import React, { useState, useEffect } from "react";

function EditInitialPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updateTire, getTire, errors: tireErrors } = useTire();
  const params = useParams();
  const navigate = useNavigate();
  const [workOrderNumber, setWorkOrderNumber] = useState();
  const [linea, setLinea] = useState();
  const [itemCode, setItemCode] = useState();
  const [barCode, setBarCode] = useState();
  const [helmetMeasurement, setHelmetMeasurement] = useState();
  const [brand, setBrand] = useState();
  const [requiredBand, setRequiredBand] = useState();
  const [antiquityDot, setAntiquityDot] = useState();
  const [modelTire, setModelTire] = useState();
  const [formattedTire, setFormattedTire] = useState();
  const [numberOfTires, setNumberOfTires] = useState();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const updatedValues = Object.fromEntries(
        Object.entries(values).filter(([key, value]) => value !== "")
      );

      await updateTire(params.id, updatedValues);
      navigate("/productionInitial");
      alert("Registro actualizado exitosamente");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el registro");
    }
  });

  useEffect(() => {
    async function loadTire() {
      try {
        if (params.id) {
          const tireByCodeBar = await getTire(params.id);
          if (tireByCodeBar) {
            setWorkOrderNumber(tireByCodeBar.workOrder.numero);
            setLinea(tireByCodeBar.linea);
            setLinea(tireByCodeBar.linea);
            setItemCode(tireByCodeBar.itemCode);
            setBarCode(tireByCodeBar.barCode);
            setHelmetMeasurement(tireByCodeBar.helmetMeasurement);
            setBrand(tireByCodeBar.brand);
            setRequiredBand(tireByCodeBar.requiredBand);
            setAntiquityDot(tireByCodeBar.antiquityDot);
            setModelTire(tireByCodeBar.modelTire);
            setFormattedTire(tireByCodeBar.formattedUpdatedAt);
            setNumberOfTires(tireByCodeBar.workOrder.tires.length);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadTire();
  }, []);

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div className="flex items-center gap-3 mb-6">
          <Link to={`/productionInitial`}>
            <button className="bg-cyan-950 rounded-md px-4 py-1 duration-500 hover:bg-cyan-800 hover:duration-500">
              <StepBack color="white" />
            </button>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold">Inspección Inicial</h1>
          <div className="flex top-10 absolute w-[100%]">
            {tireErrors.map((error, i) => (
              <div
                className="bg-red-500 py-2 text-white w-[100%] flex justify-center"
                key={i}
              >
                {error}
              </div>
            ))}
          </div>
        </div>

        <div className="border-2 border-slate-50  py-3 px-10 rounded-md shadow-lg w-full">
          <div className="text-center text-xl font-semibold mb-2">
            <span>{itemCode}</span>
          </div>
          <div className="grid grid-cols-2 w-full">
            <div>
              <p>
                Codigo de barras:{" "}
                <span className="font-medium text-lg">{barCode}</span>
              </p>
              <p>
                DOT :{" "}
                <span className="font-medium text-lg">{antiquityDot}</span>
              </p>
              <p>
                Medida del casco:{" "}
                <span className="font-medium text-lg">{helmetMeasurement}</span>
              </p>
              <p>
                Fecha requerida:{" "}
                <span className="font-medium text-lg">{formattedTire}</span>
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p>
                Marca: <span className="font-medium text-lg">{brand}</span>
              </p>
              <p>
                Banda requerida:{" "}
                <span className="font-medium text-lg">{requiredBand}</span>
              </p>
              <p>
                Modelo <span className="font-medium text-lg">{modelTire}</span>
              </p>
              <p>
                Numero de orden <span className="font-medium text-lg">{workOrderNumber} ({linea}/{numberOfTires})</span>
              </p>
            </div>
          </div>
        </div>
        <form className="mt-8" onSubmit={onSubmit}>
          <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
            Estado de la llanta
          </h2>
          <p className="text-gray-600 mb-4">
            Especificar si la llanta será rechazo o pasa.
          </p>
          <div className="w-full flex justify-center">
            <select
              className="block w-1/2 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 shadow-md"
              {...register("status", {
                required: "Debe seleccionar una opción.",
              })}
            >
              <option value="">Seleccionar...</option>
              <option value="Rechazo">Rechazo</option>
              <option value="Pasa">Pasa</option>
            </select>
            {errors.rejection && (
              <p className="text-red-500 text-xs">{errors.rejection.message}</p>
            )}
          </div>

          <div className="flex justify-start mt-6">
            <button
              className="text-white font-medium bg-cyan-950 py-2 px-5 rounded-md shadow-md hover:bg-cyan-800 duration-500 hover:duration-500"
              type="submit"
            >
              Editar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditInitialPage;
