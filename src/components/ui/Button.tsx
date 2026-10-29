type ButtonProps = {
    children : React.ReactNode
    className? : String,
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children ,className ,...props } : ButtonProps) => {
  return (
    <button className={`${className} border rounded py-2 w-full hover:bg-black hover:text-white transition-all duration-300`} {...props}>
        {children}
    </button>
  )
}

export default Button