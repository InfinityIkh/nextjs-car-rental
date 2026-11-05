import { ComponentType, SVGProps } from "react"

type ButtonProps = {
  children: React.ReactNode
  className?: String,
  Icon?: ComponentType<SVGProps<SVGSVGElement>>
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children, className, Icon, ...props }: ButtonProps) => {
  return (
    <button
      className={`${className} flex items-center justify-center gap-2 border rounded py-2 mt-2 w-full hover:bg-black hover:text-white transition-all duration-300`}
      {...props}
    >
      {Icon && <Icon className="size-4 transition-colors duration-200" />}
      {children}
    </button>
  )
}

export default Button