import React from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function ViewWOBySeller() {
  const { getWorkOrderByUser } = useAuth();
  const params = useParams();

  useEffect(() => {
    async function loadUser() {
      try {
        if (params.id) {
          const workOrders = await getWorkOrderByUser(params.id);
          if (workOrders) {
            console.log(workOrders);
            // setUsers(departmentById.users);
            // setDepartment(departmentById.name);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadUser();
  }, []);
  // useEffect(() => {
  //   getWorkOrderByUser()
  // }, [])

  return <div>ViewWOBySeller</div>;
}

export default ViewWOBySeller;
