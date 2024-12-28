import React,{useState, useEffect} from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useParams} from "react-router-dom";
import InputField from "../components/ui/InputField.jsx";
import { useForm } from "react-hook-form";
import { StepBack } from "lucide-react";
import { useDepartment } from "../context/DepartmentContext.jsx";
import Alert from "../components/ui/Alert.jsx"; // Importa tu componente de alerta

function EditUserPage() {
  const [alert, setAlert] = useState(null); // Estado para manejar la alerta
  const { getUser, updateUser } = useAuth();
  const params = useParams();
  const { getDepartments, allDepartments } = useDepartment();
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  useEffect(() => {
    async function loadUser() {
      if (params.id) {
        const userById = await getUser(params.id);
        if (userById) {
          reset({
            name: userById.name,
            lastName: userById.lastName,
            userName: userById.userName,
            department: userById.department,
          });
        }
      }
    }
    loadUser();
    getDepartments();
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    const updatedValues = Object.fromEntries(
      Object.entries(values).filter(([key, value]) => value !== "")
    );

    try {
      await updateUser(params.id, updatedValues);
      // navigate("/departments");
      setAlert({ message: "Usuario actualizado exitosamente", type: "success" });
      setTimeout(() => setAlert(null), 3000); // Oculta la alerta después de 3 segundos
    } catch (error) {
      console.error(error);
      alert({ message: "Usuario actualizado exitosamente", type: "" });
    }
  });

  return (
    <div className="md:px-8 px-3 py-10 max-w-screen-2xl mx-auto select-none">
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <div>
        <Link to="/departments">
          <button className="bg-cyan-950 rounded-md px-4 py-1 duration-500 hover:bg-cyan-800 hover:duration-500">
            <StepBack color="white" />
          </button>
        </Link>
      </div>
    
      <div>
        <h1 className="md:text-4xl flex justify-center font-bold mb-3 text-2xl">
          Editar Usuario
        </h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mt-10">
          <h1 className="font-bold text-3xl">Datos de Usuario</h1>
          <div className="w-[100%] pt-8 text-xl">
            <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
              <div className="relative md:w-5/12 w-auto">
                <InputField  {...register("name")} />
              </div>
              <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                <InputField
                  // id="apellido"
                  // label="Apellido"
                  {...register("lastName")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="font-bold text-3xl">Usuario y Contraseña</h1>
          <div className="w-[100%] pt-8 text-xl">
            <div className="flex items-center flex-col sm:w-auto sm:flex-row sm:justify-between">
              <div className="relative md:w-5/12 w-auto">
                <InputField
                  // id="usuario"
                  // label="Usuario"
                  {...register("userName")}
                />
              </div>
              <div className="relative md:w-5/12 w-auto mt-5 sm:mt-0">
                <InputField
                  id="contraseña"
                  label="Contraseña"
                  type="password"
                  {...register("password")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="font-bold text-3xl">Departamento</h1>
          <div className="w-[40%] pt-8 text-xl">
            <label className="block mb-2 text-sm font-medium">
              Departamento
            </label>
            <select
              {...register("department")}
              className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccionar...</option>
              {allDepartments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-14">
          <button
            className="text-white font-medium bg-cyan-950 py-2 px-5 rounded-md shadow-md hover:bg-cyan-800 duration-500"
            type="submit"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUserPage;
