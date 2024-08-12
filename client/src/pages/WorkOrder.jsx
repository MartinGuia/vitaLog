import * as images from "../img";
import { useWorkOrder } from "../context/WorkOrderContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function WorkOrder() {
  const { getWorkOrderById } = useWorkOrder();
  const params = useParams();
  const [dataWorkOrder, setDataWorkOrder] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();

  // useEffect(() => {
  //   if (params.id) {
  //     getWorkOrderById(params.id);
  //   }
  //   console.log(params)
  //   getWorkOrderById();
  // }, []);

  useEffect(() => {
    async function loadWorkOrder() {
      try {
        if (params.id) {
          const workOrder = await getWorkOrderById(params.id);
          if (workOrder) {
            setName(workOrder.createdBy.name); 
            setLastName(workOrder.createdBy.lastName); 
            // setDataWorkOrder(getWorkOrderById(workOrder.data));
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadWorkOrder();
  }, []);

  // if (workOrders.length === 0) <h1>No hay Ordenes de trabajo</h1>;
  return (
    // <>
    //   <div>Hola</div>
    // </>
    <>
      <div>
        <header className="w-full mt-3 flex justify-center">
          <div className=" w-[95%] p-2 flex justify-between bg-slate-200 border-l-8 border-black rounded-md">
            <section className="ml-2">
              <h1 className="font-bold text-xl">
                Número de orden de trabajo #
              </h1>
              <p className="font-medium">VITA-BAJIO S.A de C.V</p>
              <p className="font-medium text-sm">VITA-BAJIO S.A de C.V</p>
            </section>
            <section className="flex justify-end mr-2">
              <img src={images.logoVB} className="w-[45%]" alt="" />
            </section>
          </div>
        </header>
        <main className="">
          <section className="mt-4 flex justify-center">
            <div className="flex justify-between w-[95%]">
              <article className="w-[33.3%] text-sm">
                <div className="flex">
                  <p className="">Cuenta: </p>
                  <p className="font-bold ml-2">VITA-BAJIO</p>
                </div>
                <div className="mt-2">
                  <p className="flex">
                    Ubicación:
                    <span className="font-bold ml-2">Salamanca () (L)</span>
                  </p>
                  <p className="font-bold">
                    Hidalgo 1500 San Juan de La Presa, Salamanca
                  </p>
                  <p className="font-bold">Salamanca 36770</p>
                </div>
                <p className="flex mt-2">
                  Recolector: 
                  <span className="font-bold ml-2">{name} {lastName}</span>
                </p>
              </article>
              <article className="w-[33.3%] text-sm">
                <p className="mt-2">Fecha de recolección:</p>
                <p className="mt-2">Fecha de solicitud de entrega:</p>
                <p className="mt-2">Ref #:</p>
              </article>
              <article className="w-[33.3%] text-sm">
                <p className="flex">
                  Desecho dejado en la ubicación:{" "}
                  <span className="font-bold ml-2">Sí</span>
                </p>
              </article>
            </div>
          </section>
          {/* <p className="flex mt-2 ml-10">
            Recolector:
            <span className="font-bold ml-2">
              {dataWorkOrder.createdBy.name} {dataWorkOrder.createdBy.lastName}
            </span>
          </p> */}
          <section className="mt-4 flex justify-center">
            <div className="flex justify-between w-[95%]">
              <article className="w-[33.3%]">
                <h1 className="w-[90%] bg-slate-400 font-semibold text-sm py-1 pl-1">
                  Cascos recolectados: <span>20</span>
                </h1>
              </article>
              <article className="w-[33.3%]">
                <h1 className="w-[90%] bg-slate-400 font-semibold text-sm py-1 pl-1">
                  CasingRejected: <span>3</span>
                </h1>
              </article>
              <article className="w-[33.3%]">
                <h1 className="w-[90%] bg-slate-400 font-semibold text-sm py-1 pl-1">
                  Esperando recolección de cascos: <span>0</span>
                </h1>
              </article>
            </div>
          </section>

          <section className="mt-4 flex justify-center">
            <div className="w-[95%]">
              <article className="bg-slate-300 p-1">
                <h1>
                  Instruccion especial:<span> #</span>
                </h1>
              </article>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default WorkOrder;
