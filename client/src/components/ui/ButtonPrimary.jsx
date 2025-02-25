import React from "react";

function ButtonPrimary({ children, props }) {
  return (
    <button
      className="ml-4 font-medium bg-yellow-400 text-blue-950 py-2 px-5 rounded-md shadow-md hover:bg-vbYellow duration-500 hover:duration-500"
      {...props}
    >
      {children }
    </button>
  );
}

export default ButtonPrimary;
