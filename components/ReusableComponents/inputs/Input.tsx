import React, { useState } from "react";
import style from "@/css/ReusableComponent/Input.module.css";

interface inputParams<T> {
  state: T extends string ? T : string;
  type: string;
  name: string;
  placeholder: string;
  label: string;
  valid?: null | boolean | undefined;
  validationMessage?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

interface timeInputParams {
  state: string;
  name: string;
  label: string;
  type: string;
  valid?: null | boolean | undefined;
  validationMessage?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

interface textareaInputParam {
  state: string;
  name: string;
  label: string;
  cols: number;
  rows: number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

interface checkboxInputParam {
  
}

const Input = <T extends string | number>({
  state,
  type,
  name,
  onChange,
  onBlur,
  onInput,
  placeholder,
  label,
  valid,
  validationMessage,
}: inputParams<T>) => {
  return (
    <div className={`flex flex-col phone:w-11/12`}>
      <label className="phone:text-sm">{label}</label>
      <div className="w-full relative overflow-hidden">
        <input
          value={state}
          onChange={onChange}
          onBlur={onBlur}
          onInput={onInput}
          type={type}
          name={name}
          placeholder={placeholder}
          className={`bg-Secondary w-full text-white px-2 py-2 phone:text-sm ${style.input}`}
          // required
        />
        <div
          className={`h-[4px] w-full bg-LightPrimary absolute ${style.inputUnderline}`}
        ></div>
      </div>
      {valid != null ? (
        valid === true ? (
          ""
        ) : (
          <span className="text-[0.75rem] text-red-500 font-bold">
            {validationMessage}
          </span>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export const TimeInput = ({
  label,
  name,
  onBlur,
  onChange,
  state,
  type,
  valid,
  validationMessage,
}: timeInputParams) => {
  return (
    <div className="flex flex-col phone:text-sm">
      <label>{label}</label>
      <input
        className="bg-Secondary p-2 w-max description-time-input"
        type={type}
        name={name}
        value={state}
        onChange={onChange}
        onBlur={onBlur}
      />

      {valid != null ? (
        valid === true ? (
          ""
        ) : (
          <span className="text-[0.75rem] text-red-500 font-bold">
            {validationMessage}
          </span>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export const TextareaInput = ({
  label,
  name,
  state,
  cols,
  rows,
  onBlur,
  onChange,
}: textareaInputParam) => {
  return (
    <div className="flex flex-col phone:text-sm phone:w-11/12">
      <label>{label}</label>
      <textarea
        className="bg-Secondary px-2"
        name={name}
        value={state}
        cols={cols}
        rows={rows}
        onChange={onChange}
        onBlur={onBlur}
      ></textarea>
    </div>
  );
};

export const CheckBoxInput = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-1">
      <div
        style={{ background: isChecked ? "#00ADB5" : "none" }}
        onClick={() => setIsChecked((prev) => !prev)}
        className="cursor-pointer outline outline-2 outline-LightPrimary w-3 h-3"
      ></div>
      <label>This is a check box</label>
      <input
        className="text-lg"
        type="checkbox"
        checked={isChecked && true}
        name="4"
        id=""
      />
    </div>
  );
};

export default Input;
