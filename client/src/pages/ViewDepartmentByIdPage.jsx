import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { StepBack, UserRoundPen, Trash2 } from "lucide-react";
import { useDepartment } from "../context/DepartmentContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import AlertComponent from "../components/ui/AlertComponent";
import { Input } from "@heroui/react";

function ViewDepartmentByIdPage() {
  const { getDepartmentById } = useDepartment();
  const { deleteUser } = useAuth();
  const params = useParams();
  const [users, setUsers] = useState([]);
  const [department, setDepartment] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [confirmationName, setConfirmationName] = useState("");
  const [alertData, setAlertData] = useState(null); // Para controlar si mostrar el Alert
  const ordersPerPage = 10;

  useEffect(() => {
    async function loadDepartment() {
      try {
        if (params.id) {
          const departmentById = await getDepartmentById(params.id);
          if (departmentById) {
            setUsers(departmentById.users);
            setDepartment(departmentById.name);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadDepartment();
  }, []);

  const totalPages = Math.ceil(users.length / ordersPerPage);

  const currentOrders = users.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (confirmationName === userToDelete.name) {
      try {
        await deleteUser(userToDelete._id);
        setAlertData({
          title: "¡Exito!",
          description: "OUsuario eliminado exitosamente",
          color: "success",
        });
        setUsers((prevUsers) =>
          prevUsers.filter(
            (currentUser) => currentUser._id !== userToDelete._id
          )
        );
      } catch (error) {
        console.error(error);
        setAlertData({
          title: "Error!",
          description: "Error al eliminar usuario. Intente nuevamente",
          color: "danger",
        });
      }
      setIsModalOpen(false);
      setUserToDelete(null);
      setConfirmationName("");
    } else {
      setAlertData({
        title: "Error!",
        description: "El nombre no coincide. Usuario no eliminado.",
        color: "danger",
      });
    }
  };

  return (
    <>
      <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
        {/* Alerta de la aplicación */}
       
        <div className="flex items-center gap-3 mb-6">
          <Link to="/departments">
            <button className="bg-buttonPrimaryHover hover:bg-buttonPrimary rounded-md px-4 py-1 duration-500  hover:duration-500 shadow-md">
              <StepBack color="white" />
            </button>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold">{department}</h1>
        </div>
         {alertData && (
          <AlertComponent
            title={alertData.title}
            description={alertData.description}
            color={alertData.color}
            onClose={() => setAlertData(null)} // Esta es la función que se ejecutará después de 3 segundos
          />
        )}
        <div className="p-4 w-full">
          {users.length === 0 ? (
            <div className="text-center text-gray-600 text-lg">
              No hay usuarios asociados a este departamento.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
                    <th className="py-3 px-6">Nombre</th>
                    <th className="py-3 px-6">Apellido</th>
                    <th className="py-3 px-6">Usuario</th>
                    <th className="py-3 px-6 flex justify-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((user, id) => (
                    <tr key={id} className="border-t border-gray-200">
                      <td className=" py-3 px-6 text-sm text-gray-900">
                        {user.name}
                      </td>
                      <td className="py-3 px-6 text-sm text-gray-900">
                        {user.lastName}
                      </td>
                      <td className="py-3 px-6 text-sm text-gray-900">
                        {user.userName}
                      </td>
                      <td className="flex py-2 justify-around">
                        <Link to={`/profile/${user._id}`}>
                          <button className="text-blue-600 hover:text-blue-800">
                            <UserRoundPen />
                          </button>
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteClick(user)}
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {users.length >= 10 && (
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-600">
                    Página {currentPage} de {totalPages}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg border ${
                        currentPage === 1
                          ? "text-gray-400 border-gray-200"
                          : "text-blue-600 border-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      Anterior
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-4 py-2 rounded-lg border ${
                          currentPage === i + 1
                            ? "bg-blue-600 text-white"
                            : "text-blue-600 border-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg border ${
                        currentPage === totalPages
                          ? "text-gray-400 border-gray-200"
                          : "text-blue-600 border-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              Confirmar eliminación del usuario
            </h3>
            <p>
              Escribe el nombre del usuario <strong>{userToDelete.name}</strong>{" "}
              para confirmar:
            </p>
            <Input
              label="Nombre de usuario"
              type="text"
              variant={"underlined"}
              value={confirmationName}
              onChange={(e) => setConfirmationName(e.target.value)}
            />

            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setConfirmationName("");
                }}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewDepartmentByIdPage;
