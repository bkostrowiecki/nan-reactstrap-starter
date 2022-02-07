import React from 'react'
import { Button, Spinner, SpinnerProps, ButtonProps } from 'reactstrap'

type Props = {
  isSpinning?: boolean
  spinnerProps?: SpinnerProps
  customWidth?: string
} & ButtonProps

export const ButtonWithSpinner: React.FC<Props> = ({
  isSpinning,
  customWidth,
  spinnerProps,
  children,
  ...props
}) => {
  return (
    <Button {...props} disabled={isSpinning || props.disabled} style={{width: customWidth ?? 'auto'}}>
      {isSpinning && <Spinner color="light" {...spinnerProps} />}
      {!isSpinning && <>{children}</>}
    </Button>
  )
}
