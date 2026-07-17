import Spinner from './Spinner'

const VARIANTS = {
  primary:
    'bg-orbit-blue-600 text-white hover:bg-orbit-blue-700 active:bg-orbit-blue-800 shadow-sm',
  secondary:
    'bg-orbit-green-500 text-white hover:bg-orbit-green-600 active:bg-orbit-green-700 shadow-sm',
  outline:
    'border border-orbit-blue-600 text-orbit-blue-600 hover:bg-orbit-blue-50',
  ghost: 'text-orbit-ink-soft hover:bg-orbit-blue-50 hover:text-orbit-blue-700',
}

const SIZES = {
  sm: 'px-3.5 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  type = 'button',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold
        transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60
        ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {isLoading && <Spinner size="sm" className={variant === 'outline' || variant === 'ghost' ? 'border-orbit-blue-200 border-t-orbit-blue-600' : 'border-white/40 border-t-white'} />}
      {children}
    </button>
  )
}
