import InputField from "../components/ui/InputField";

function AddClientPage() {
  return (
    <>
      <div className="md:px-10 px-4 py-12 max-w-screen-2xl mx-auto">
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
              <div className="relative md:w-5/12 w-auto mt-5">
                <InputField label="Alias" id="alias" />
              </div>
            </div>
            <div className="flex items-center flex-col mt-5 sm:w-auto sm:flex-row sm:justify-between">
              <div className="relative md:w-5/12 w-auto">
                <InputField label="Segmento" id="segmento" />
              </div>
              <div className="relative md:w-5/12 w-auto mt-5">
                <InputField label="N.° de clte renovador" id="numerocliente" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-10">
            <h1 className="font-bold text-3xl">Dirección</h1>
            <p>
              Complete el nombre de la cuenta y establezca el segmento y el
              número de cliente del renovador.
            </p>
          </div>
          <div className="w-[100%] pt-8 text-xl">
            <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
              <div className="relative w-5/12">
                <InputField label="Nombre123" id="nombre123" />
              </div>
              <div className="relative w-5/12">
                <InputField label="Alias123" id="alias123" />
              </div>
            </div>
            <div className="flex justify-between mt-10">
              <div className="relative w-5/12">
                <InputField label="Segmento123" id="segmento123" />
              </div>
              <div className="relative w-5/12">
                <InputField label="Hola" id="numerocliente123" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddClientPage;
