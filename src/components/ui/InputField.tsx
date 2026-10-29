import type { InputHTMLAttributes, ReactNode } from "react"

type InputFieldProps = {
  children: ReactNode;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>

const InputField = ({ children ,className ,...props }: InputFieldProps) => {
  return (
    <div>
      <label>{children}</label>
      <input className={`${className} border rounded px-3 py-2 mb-2 w-full `} {...props} />
    </div>
  )
}

export default InputField