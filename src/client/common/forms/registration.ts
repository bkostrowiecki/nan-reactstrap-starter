import { Path, UseFormRegister } from "react-hook-form"

export const createReactstrapRegister = <T>(register: UseFormRegister<T>) => (
  name: Path<T>,
  options?: any
) => {
  const { ref, ...rest } = register(name, options)

  return {
    ...rest,
    innerRef: ref
  }
}
