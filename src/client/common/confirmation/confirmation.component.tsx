import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'

type Props = {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  confirmText: string
  cancelText?: string
  message: string
  title: string
  isProcessing?: boolean
  confirmType?: 'primary' | 'secondary' | 'danger' | 'warning' | 'info'
}

export const Confirmation: React.FC<Props> = ({
  isOpen,
  isProcessing = false,
  message,
  confirmType = 'primary',
  confirmText,
  cancelText = 'Anuluj',
  title,
  onConfirm,
  onCancel
}) => (
  <Modal isOpen={isOpen} data-testid="modal">
    <ModalHeader>{title}</ModalHeader>
    <ModalBody>
      <span
        data-testid="modalBodyContent"
        dangerouslySetInnerHTML={{
          __html: message
        }}
      />
    </ModalBody>
    <ModalFooter>
      <Button
        data-testid="modalCancelButton"
        className="float-left"
        disabled={isProcessing}
        color="secondary"
        onClick={onCancel}
        data-test-id="cancel-action"
      >
        {cancelText}
      </Button>
      <Button
        data-testid="modalConfirmButton"
        className="float-right"
        disabled={isProcessing}
        color={confirmType}
        onClick={onConfirm}
        data-test-id="confirm-action"
      >
        {isProcessing ? (
          <Spinner size="sm" data-testid="modalIsProcessing" color="light" />
        ) : (
          confirmText
        )}
      </Button>
    </ModalFooter>
  </Modal>
)
