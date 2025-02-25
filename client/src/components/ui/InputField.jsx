import React, { useState, forwardRef } from "react";

const InputField = forwardRef(({ label, id, className, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    if (!e.target.value) setIsFocused(false);
  };

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-0 text-lg text-gray-500 transition-all font-medium duration-300 ease-in-out cursor-text ${
          isFocused || props.defaultValue || props.value
            ? "text-sm text-blue-500 -top-2"
            : "top-2"
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        ref={ref} // Se pasa la ref al input
        className="w-full border-b-[1px] border-black focus:outline-none focus:border-blue-500 transition-colors duration-300 ease-in-out pt-4"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props} // Permite que react-hook-form maneje el valor y eventos
      />
    </div>
  );
});

export default InputField;
