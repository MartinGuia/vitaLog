import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import InputField from "../components/ui/InputField";
import { useTire } from "../context/TireContext";
import { StepBack } from "lucide-react";
import AlertComponent from "../components/ui/AlertComponent";

function EditTirePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { updateTire, getTire } = useTire();
  const params = useParams();
  const navigate = useNavigate();
  const [workOrder, setWorkOrder] = useState();
  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
    async function loadTire() {
      if (params.id) {
        const tire = await getTire(params.id);
        if (tire) {
          setWorkOrder(tire.workOrder._id);
          reset({
            itemCode: tire.itemCode,
            barCode: tire.barCode,
            antiquityDot: tire.antiquityDot,
            requiredBand: tire.requiredBand,
            helmetMeasurement: tire.helmetMeasurement,
            brand: tire.brand,
            modelTire: tire.modelTire,
            serialNumber: tire.serialNumber,
            millimeterFootage: tire.millimeterFootage,
            quoteNumber: tire.quoteNumber,
          });
        }
      }
    }
    loadTire();
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== "")
    );

    try {
      await updateTire(params.id, updatedValues);
      window.scrollTo({
        top: 0,
        behavior: "smooth", // para que se vea mejor
      });
      setAlertData({
        title: "¡Exito!",
        description: "Llanta actualizada.",
        color: "success",
      });
    } catch (error) {
      console.error(error);
      setAlertData({
        title: "¡Error!",
        description: "Error al actualizar llanta.",
        color: "danger",
      });
    }
  });


  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div className="flex items-center gap-3 mb-6">
          <Link to={`/quotingWorkOrders/${workOrder}`}>
            <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary shadow-md rounded-md px-4 py-1 duration-500 hover:duration-500">
              <StepBack color="white" />
            </button>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold">Editar Registro</h1>
        </div>
        {alertData && (
          <AlertComponent
            title={alertData.title}
            description={alertData.description}
            color={alertData.color}
            onClose={() => setAlertData(null)}
          />
        )}
        <form onSubmit={onSubmit}>
          <div>
            <div className="mt-8">
              <h2 className="text-lg md:text-2xl font-semibold mb-3 text-sky-900">
                Número de cotización
              </h2>
              <p className="text-gray-600 font-medium">
                Agregar el número de cotización de la llanta.
              </p>
            </div>
            <div className="w-[100%] pt-6 text-xl">
              <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
                <div className="relative w-[60%] md:w-[40%]">
                  <label htmlFor="" className="text-sm">
                    Número de cotización
                  </label>
                  <InputField
                    variant={"underlined"}
                    {...register("quoteNumber")}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-14 ">
            <div className="flex justify-end ">
              <button
                className=" text-white font-medium bg-buttonSecondary py-3 px-8 rounded-md shadow-md hover:bg-buttonSecondaryHover duration-500 hover:duration-500 "
                type="submit"
              >
                Actualizar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditTirePage;
