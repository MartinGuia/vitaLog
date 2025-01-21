import React from "react";

function Alert({ message, type = "success", onAccept }) {
  return (
    <div
      className={`${
        type === "success" ? "bg-green-600" : "bg-red-600"
      } text-white py-2 px-4 rounded-lg shadow-lg mb-2`}
    >
      <div className="flex justify-around">
        <div className="flex items-center">
          <p className="">{message}</p>
        </div>
        <button
          onClick={onAccept}
          className="bg-white py-1 text-green-600 px-4 rounded-md font-semibold hover:bg-gray-100"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}

export default Alert;
