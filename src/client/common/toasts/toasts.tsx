import React, { useContext } from 'react'
import { ToastItem } from './toast-item'
import { Toast, ToastContext } from './toasts-context'

export const Toasts: React.FC = () => {
  const { state } = useContext(ToastContext)

  return (
    <div className="toasts">
      {state.map((item: Toast) => (
        <ToastItem key={item.id} {...item} />
      ))}
    </div>
  )
}
