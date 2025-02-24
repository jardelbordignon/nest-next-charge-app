import clsx from 'clsx'
import { type DetailedHTMLProps, type InputHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string
  label?: string
  error?: FieldError
  initialValue?: string
  secret?: boolean
  prefix?: string
  suffix?: string
}

export function TextInput({
  className,
  error,
  prefix,
  suffix,
  secret,
  ref,
  ...rest
}: Props) {
  let inputPadding = 'px-4'
  if (prefix) inputPadding += ' pl-1'
  if (suffix) inputPadding += ' pr-1'

  return (
    <div className={clsx(className, 'flex flex-col gap-1')}>
      <div
        className={clsx(
          className,
          'inline-flex bg-zinc-300 dark:bg-zinc-950 rounded border-0 h-12 w-full',
        )}
      >
        {prefix && (
          <div className='inline-flex items-center pt-1 pl-4 text-gray-600 whitespace-nowrap'>
            {prefix}
          </div>
        )}
        <input
          id={rest.name}
          ref={ref}
          type={secret ? 'password' : 'text'}
          className={clsx(
            inputPadding,
            'text-xl bg-transparent border-0 w-full text-zinc-900 dark:text-zinc-300 focus:ring-0 focus:outline-none',
          )}
          {...rest}
        />
        {suffix && (
          <div className='inline-flex items-center pr-4 text-gray-600'>{suffix}</div>
        )}
      </div>
      {error && <span className='text-red-500 text-sm'>{error.message}</span>}
    </div>
  )
}
