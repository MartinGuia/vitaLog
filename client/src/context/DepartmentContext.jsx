import { createContext, useContext, useState } from "react";
import { registerDepartmentRequest, getDepartmentsRequest } from "../api/department.js";

const DepartmentContext = createContext();

export const useDepartment = () => {
  const context = useContext(DepartmentContext);
  if (!context) {
    throw new Error("useDepartment must be used within a DepartmentProvider");
  }
  return context;
};

export function DepartmentProvider({ children }) {
  const [departments, setDepartments] = useState(null);
  const [allDepartments, setAllDepartments] = useState([]);
  const [errors, setErrors] = useState([]);

  const registerDepartment = async (department) => {
    try {
      const res = await registerDepartmentRequest(department);
      console.log(res.data);
      setDepartments(res.data);
    } catch (error) {
      console.error(error);
      setErrors(error.response.data);
    }
  };

  const getDepartments = async () => {
    try {
      const res = await getDepartmentsRequest();
      console.log(res);
      setAllDepartments(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <DepartmentContext.Provider
      value={{
        departments,
        registerDepartment,
        getDepartments,
        allDepartments,
        errors,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
}
