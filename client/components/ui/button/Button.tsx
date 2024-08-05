import clsx from 'clsx'

type ButtonVariants = 'default' | 'outlined' | 'contained'
interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: ButtonVariants
  loading?: boolean
}

const variants = {
  default: '',
  outlined: "p-3 border transition-all duration-150 border-black h-[54px] hover:border-b-4 hover:bg-gray-100",
  contained: "",
}

export const Button: React.FC<ButtonProps> = ({ children, variant = "default", loading, className, ...props }) => (
  <button className={clsx([variants[variant]], className)} {...props}>
    {loading ? 'Loading...' : children}
  </button>
)

