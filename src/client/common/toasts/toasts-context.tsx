import { uniqueId } from 'lodash';
import React, { Dispatch, useReducer } from 'react'

const initialState = []

export type ToastType = 'success' | 'danger' | 'warning' | 'info';

type ToastShowPayload = {
  id?: string
  message: string
  type?: ToastType
  duration?: number
}

type ToastHidePayload = {
  id: string
}

export type ToastPayload = ToastShowPayload | ToastHidePayload

export type ToastAction = {
  type: 'show' | 'hide' | 'prepareHiding',
  payload: ToastPayload
}

const ToastContext = React.createContext<{
  state: any[],
  dispatch: Dispatch<ToastAction>
}>({
  state: initialState,
  dispatch: () => {
    console.log('not working')
  }
})

export type Toast = {
  id: string
  message: string
  duration: number
  type: ToastType
  isHiding: true
}

const toastActions = {
  show: (payload: ToastShowPayload) => ({
    type: 'show' as const,
    payload: {
      id: uniqueId('toast-'),
      ...payload
    }
  }),
  hide: (payload: ToastHidePayload) => ({
    type: 'hide' as const,
    payload
  }),
  prepareHiding: (payload: ToastHidePayload) => ({
    type: 'prepareHiding' as const,
    payload
  }),
  showUnexpectedError: () => ({
    type: 'show' as const,
    payload: {
      id: uniqueId('toast-'),
      message: 'Wystąpił niespodziewany błąd',
      type: 'danger',
      duration: -1
    }
  })
}

const { Provider } = ToastContext

const ToastStateProvider = ({ children }) => {
  const [outterState, dispatch] = useReducer((state, action) => {
    const { payload } = action

    switch (action.type) {
      case 'show':
        return [{
          ...payload,
          type: payload.type || 'info',
          duration: payload.duration || -1
        }, ...state]
      case 'hide':
        return state.filter((item: Toast) => item.id !== action.payload.id)
      case 'prepareHiding':
        return state.map((item: Toast) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              isHiding: true
            };
          }

          return item;
        })
      default:
        throw new Error()
    }
  }, initialState)

  return <Provider value={{ state: outterState, dispatch }}>{children}</Provider>;
}

export { toastActions, ToastContext, ToastStateProvider }
