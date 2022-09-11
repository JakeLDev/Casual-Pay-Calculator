import { useState } from 'react'
export interface InputFieldInterface {
  placeHolder?: string
  value?: string
  inputId?: string
  inputType?: string
}

function InputField({ placeHolder, value, inputId, inputType }: InputFieldInterface) {
  const [inputValue, setInputValue] = useState(value ?? undefined)

  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <>
      <input
        className='h-10 my-2 w-full rounded-lg pl-2 text-sm placeholder-gray-400 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent'
        id={inputId}
        type={inputType}
        // onChange={updateValue}
        value={inputValue}
        placeholder={placeHolder}
        step='0.1'
      />
    </>
  )
}
export default InputField
