import React from 'react'
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate, } from "react-router-dom";

function Profile() {
  const { getUser } = useAuth();
  const params = useParams();
  const [getName, setName] = useState()

  useEffect(() => {
    async function loadUser() {
      try {
        if (params.id) {
          const userById = await getUser(params.id);
          if (userById) {
            setName(userById.workOrders.length);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    loadUser();
  }, []);

  return (
    <div className="container mx-auto p-4">
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
            <th className="py-3 px-6">Número de Orden</th>
            <th className="py-3 px-6">Fecha de Entrega</th>
            <th className="py-3 px-6">Fecha de Recolección</th>
            <th className="py-3 px-6">Cliente</th>
          </tr>
        </thead>
        <tbody>
        <tr  className="border-t border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-sm text-gray-900"></td>
              <td className="py-3 px-6 text-sm text-gray-900"></td>
              <td className="py-3 px-6 text-sm text-gray-900"></td>
              <td className="py-3 px-6 text-sm text-gray-900"></td>
            </tr>
          {/* {orders.map((order, index) => (
            <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-sm text-gray-900">{order.workOrderNumber}</td>
              <td className="py-3 px-6 text-sm text-gray-900">{order.deliveryDate}</td>
              <td className="py-3 px-6 text-sm text-gray-900">{order.collectionDate}</td>
              <td className="py-3 px-6 text-sm text-gray-900">{order.client}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  </div>
    // <div>{getName}</div>
  )
}

export default Profile