import React from 'react'

function Alert({ message, type = "success", onClose }) {
  return (
    <div
      className={`${type === "success" ? "bg-green-600" : "bg-red-600"} text-white py-2 px-4 rounded-lg shadow-lg mb-2`}
    >
      <p>{message}</p>
      {/* <button
        onClick={onClose}
        className="absolute top-2 right-1 text-black font-bold"
      >
        ×
      </button> */}
    </div>
  )
}

export default Alert