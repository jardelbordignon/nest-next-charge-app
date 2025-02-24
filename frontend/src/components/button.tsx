import { type ButtonHTMLAttributes, type DetailedHTMLProps } from 'react'
import clsx from 'clsx'
import { ActivityIndicator } from './activity-indicator'

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  submitting?: boolean
  variant?: 'outline' | 'default'
}

export function Button({
  children,
  className,
  submitting,
  variant = 'default',
  ...rest
}: Props) {
  const commonClasses =
    'flex items-center justify-center gap-1 rounded flex-nowrap h-12 px-4 py-2 hover:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-800'
  const variantClasses = {
    default: 'bg-blue-900 text-white',
    outline:
      'bg-transparent border border-blue-900 disabled:border-gray-300 disabled:text-gray-800',
  }

  return (
    <button
      className={clsx(className, commonClasses, variantClasses[variant])}
      disabled={submitting || rest.disabled}
      {...rest}
    >
      {submitting ? <ActivityIndicator /> : children}
    </button>
  )
}
