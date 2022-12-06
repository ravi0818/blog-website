import React, { useEffect, useState } from "react";
import { TbAlertTriangle } from "react-icons/tb";
import { TiTick } from "react-icons/ti";

const Alert = ({ message, type }) => {
  const [open, setOpen] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => setOpen(false), 5000);

  //   return () => {};
  // }, []);

  return (
    <div
      className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
        open ? "block" : "hidden"
      }`}
    >
      <div
        className={`flex justify-between w-80 md:w-96 border p-2 rounded-lg ${
          type === "error" && "bg-red-200"
        } ${type === "warning" && "bg-orange-200"} ${
          type === "success" && "bg-green-200"
        }`}
      >
        <div className="flex items-center">
          {type === "error" && (
            <TbAlertTriangle className="text-2xl text-red-700" />
          )}
          {type === "warning" && (
            <TbAlertTriangle className="text-2xl text-orange-700" />
          )}
          {type === "success" && (
            <TiTick className="text-2xl text-green-700 border-2 border-green-700 rounded-full" />
          )}

          <p className="px-2">{message}</p>
        </div>
        <div className="">
          <button
            className="px-2 rounded font-bold"
            onClick={() => setOpen((prev) => !prev)}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
