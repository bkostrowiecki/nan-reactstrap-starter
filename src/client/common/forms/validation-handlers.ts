import { FieldError, FieldErrors } from "react-hook-form"

const createIsInvalid = <T>(
  errors: FieldErrors<T>
) => (
  key: keyof T
): boolean => {
  const nestedProps = key.toString().split('.').reverse()

  let ref = errors
  while (nestedProps.length > 0) {
    if (!ref) {
      return false
    }
    ref = ref[nestedProps.pop()]
  }

  const fieldRef = ref as FieldError;

  return Boolean(ref && fieldRef.message)
}

const createGetError = <T>(
  errors: FieldErrors<T>,
  t: (key: string, options?: any) => string
) => (key: keyof T): string => {
  const nestedProps = key.toString().split('.').reverse()

  let ref = errors
  while (nestedProps.length > 0) {
    if (!ref) {
      return ''
    }
    ref = ref[nestedProps.pop()]
  }

  const fieldRef = ref as FieldError;

  if (!fieldRef || !fieldRef.message) {
    return ''
  }

  return (
    !!fieldRef &&
    t(fieldRef.message)
  )
}

export const validationHandlers = {
  createIsInvalid,
  createGetError
}
