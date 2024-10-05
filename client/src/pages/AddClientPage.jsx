import InputField from "../components/ui/InputField";

function AddClientPage() {
  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        <div>
          <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
            Añadir cuenta local
          </h1>
        </div>
        <div>
          <div className="mt-10">
            <div className="flex mb-3">
              <h1 className="text-lg flex text-sky-900 font-semibold w-[50%] md:text-3xl md:w-[70%] lg:w-[25%] ">
                Nombre y Dirección
              </h1>
              <div className="flex items-center w-[100%]">
                <hr className="border-[1px] w-[100%] border-sky-800 mt-1" />
              </div>
            </div>
            <h1 className="font-bold text-3xl">Nombres</h1>
            <p>
              Complete el nombre de la cuenta y establezca el segmento y el
              número de cliente del renovador.
            </p>
          </div>
          <div className="w-[100%] pt-8 text-xl">
            <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
              <div className="relative md:w-5/12 w-auto">
                <InputField label="Nombre" id="nombre" />
              </div>
              <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                <InputField label="Alias" id="alias" />
              </div>
            </div>
            <div className="flex items-center flex-col mt-5 sm:w-auto sm:flex-row sm:justify-between">
              <div className="relative md:w-5/12 w-auto">
                <InputField label="Segmento" id="segmento" />
              </div>
              <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                <InputField label="N.° de clte renovador" id="numerocliente" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-10">
            <h1 className="font-bold text-3xl">Dirección</h1>
            <p>
              Complete la dirección de la cuenta. Puedes utilizar la función de
              búsqueda. Esta dirección se mostrará en todas partes en el sistema al
              seleccionar la cuenta.
            </p>
          </div>
          <div className="w-[100%] pt-8 text-xl">
            <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
              <div className="relative w-auto sm:w-5/12">
                <InputField label="Dirección 1" id="dirección1" />
              </div>
              <div className="flex-col flex items-center sm:flex sm:w-[50%] sm:flex-row justify-between">
                <div className="relative w-auto sm:w-5/12 mt-4 sm:mt-0">
                  <InputField label="Ciudad" id="Ciudad" />
                </div>
                <div className="relative w-auto sm:w-5/12 mt-4 sm:mt-0">
                  <InputField label="Región" id="Region" />
                </div>
              </div>
            </div>

            <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between mt-5">
              <div className="relative w-auto sm:w-5/12">
                <InputField label="Dirección 2" id="dirección2" />
              </div>
              <div className="flex-col flex items-center sm:flex sm:w-[50%] sm:flex-row justify-between">
                <div className="relative w-auto sm:w-5/12 mt-4 sm:mt-0">
                  <InputField label="Codigo Postal" id="CodigoPostal" />
                </div>
                <div className="relative w-auto sm:w-5/12 mt-4 sm:mt-0">
                  <InputField label="País" id="País" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddClientPage;
