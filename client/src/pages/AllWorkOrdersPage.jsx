import { useWorkOrder } from "../context/WorkOrderContext";
import { useEffect } from "react";

function AllWorkOrdersPage() {
  const { getWorkOrders, workOrders } = useWorkOrder();

  useEffect(() => {
    getWorkOrders();
  }, []);

  if (workOrders.length === 0) <h1>No hay Ordenes de trabajo</h1>;
  return (
    <>
     <div className="overflow-x-auto flex justify-center max-[542px]:block">
        <table className="w-[90%] bg-white shadow-md rounded-lg my-6 max-[540px]:ml-2">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Rol</th>
              <th className="py-3 px-6 text-left">Departamento</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {workOrders.map((order, id) => (
              <tr
              key={id}
              className="border-b border-gray-200 hover:bg-gray-100 hover:-translate-y-1"
            >
              
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {order.createdBy.name} {order.createdBy.lastName}
                </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                Rol
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                Departamento
              </td>
              <td className="py-3 px-6 text-center flex justify-evenly max-[541px]:block">
                <button className="text-red-500 hover:text-red-700 mr-2 hover:-translate-y-1">
                  Eliminar
                </button>
                  <button
                    // onClick={() => handleOpenModalEditData(item.id)}
                    className="text-blue-500 hover:text-blue-700 hover:-translate-y-1"
                  >
                    Editar
                  </button>
                  <button
                    // onClick={() => handleEdit(index)}
                    // onClick={handleOpenModalEditPass}
                    className="text-green-500 hover:text-green-700 hover:-translate-y-1"
                  >
                    Editar contraseña
                  </button>
                
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <nav>
        {workOrders.map((workOrder, i) => (
          <div key={i}>
            <h1>{workOrder.brand}</h1>
            <p></p>
          </div>
        ))}
      </nav> */}
    </>
  );
}

export default AllWorkOrdersPage;
