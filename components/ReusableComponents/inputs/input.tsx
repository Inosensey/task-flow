import React from 'react'

interface inputParams<T> {
    state: T extends string ? T : string,
    type: string,
    name: string,
    placeholder: string,
    label: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = <T extends string | number>({state, type, name, onChange, placeholder, label}:inputParams<T>) => {
  return (
    <div className='flex flex-col phone:w-11/12'>
      <label className="phone:text-sm">{label}</label>
      <input
        value={state}
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeholder}
        className="bg-Secondary text-white px-2 py-2 rounded-md phone:text-sm"
      />
      {/* <span>Error notif</span> */}
    </div>
  )
}

export default Input