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
  autoComplete?: string,
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
  name: string;
  label: string;
  selected?: string;
  setSelected?: React.Dispatch<React.SetStateAction<string>>;
  customFunc?: (val: any) => void;
  onChange?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = <T extends string | number>({
  state,
  type,
  name,
  autoComplete,
  onChange,
  onBlur,
  onInput,
  placeholder,
  label,
  valid,
  validationMessage,
}: inputParams<T>) => {
  return (
    <div className={`flex flex-col phone:w-[96%] mdphone:w-11/12`}>
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
          autoComplete={autoComplete}
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
      <label className="phone:text-sm">{label}</label>
      <input
        className="bg-Secondary py-2 px-1 w-max description-time-input"
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
    <div className="flex flex-col phone:text-sm phone:w-[96%] mdphone:w-11/12">
      <label className="phone:text-sm">{label}</label>
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

export const CheckBoxInput = ({
  label,
  name,
  setSelected,
  selected,
  onChange,
  customFunc
}: checkboxInputParam) => {
  return (
    <div className="flex items-center gap-2">
      <div
        style={{ background: selected === label ? "#00ADB5" : "none" }}
        onClick={() => {
          setSelected!(label)
          customFunc!(label)
        }}
        className="cursor-pointer outline outline-2 outline-LightPrimaryDisabled phone:w-5 phone:h-5"
      ></div>
      <label className="phone:text-sm">{label}</label>
      <input
        className="text-lg hidden"
        type="checkbox"
        checked={selected === label ? true : false}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
