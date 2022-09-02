import { useState } from 'react'
export interface InputFieldInterface {
  placeHolder?: string
  value?: string
}

function InputField({ placeHolder, value }: InputFieldInterface) {
  const [inputValue, setInputValue] = useState(value ?? undefined)

  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <>
      <input
        className='h-10 m-2 w-full rounded-lg pl-2 text-sm'
        // type='search'
        onChange={updateValue}
        value={inputValue}
        placeholder={placeHolder}
      />
    </>
  )
}
export default InputField
