import type { InputHTMLAttributes, ReactNode } from "react"

type InputFieldProps = {
  children: ReactNode;
  className?: string;
  error? : string;
} & InputHTMLAttributes<HTMLInputElement>

const InputField = ({ children ,className ,error ,...props }: InputFieldProps) => {
  return (
    <div className="mb-2">
      <label>{children}</label>
      <input className={`${className} border rounded px-3 py-2 w-full `} {...props} />
      <span className="text-red-600">{error}</span>
    </div>
  )
}

export default InputField