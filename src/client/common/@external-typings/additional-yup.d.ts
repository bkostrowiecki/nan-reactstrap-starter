import {StringSchema} from 'yup'

declare module 'yup' {
  interface StringSchema<TIn, TContext, TOut> extends StringSchema {
    isValidCardNumber(param: string): this;
  }
}
