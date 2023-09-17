import React from "react";
import style from "@/css/ReusableComponent/Input.module.css";

interface inputParams<T> {
  state: T extends string ? T : string;
  type: string;
  name: string;
  placeholder: string;
  label: string;
  valid: null | boolean,
  validationMessage?: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = <T extends string | number>({
  state,
  type,
  name,
  onChange,
  placeholder,
  label,
  valid,
  validationMessage
}: inputParams<T>) => {
  return (
    <div className={`flex flex-col phone:w-11/12`}>
      <label className="phone:text-sm">{label}</label>
      <div className="w-full relative overflow-hidden">
        <input
          value={state}
          onChange={onChange}
          type={type}
          name={name}
          placeholder={placeholder}
          className={`bg-Secondary w-full text-white px-2 py-2 phone:text-sm ${style.input}`}
          required
        />
        <div
          className={`h-[4px] w-full bg-LightPrimary absolute ${style.inputUnderline}`}
        ></div>
      </div>
      {valid != null ? <span>{validationMessage}</span> : ""}
    </div>
  );
};

export default Input;
