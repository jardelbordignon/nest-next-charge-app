import clsx from 'clsx'
import { type DetailedHTMLProps, type SelectHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'

type Props = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  name: string
  label?: string
  error?: FieldError
  options: { value: string; label: string }[]
  prefix?: string
  suffix?: string
}

export function SelectInput({
  className,
  error,
  options,
  prefix,
  suffix,
  ...rest
}: Props) {
  let selectPadding = 'px-4'
  if (prefix) selectPadding += ' pl-1'
  if (suffix) selectPadding += ' pr-1'

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
        <select
          id={rest.name}
          className={clsx(
            selectPadding,
            'text-xl bg-transparent border-0 w-full text-zinc-900 dark:text-zinc-300 focus:ring-0 focus:outline-none',
          )}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {suffix && (
          <div className='inline-flex items-center pr-4 text-gray-600'>{suffix}</div>
        )}
      </div>
      {error && <span className='text-red-500 text-sm'>{error.message}</span>}
    </div>
  )
}
