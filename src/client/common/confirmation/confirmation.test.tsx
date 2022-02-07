import '@testing-library/jest-dom'
import * as React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Confirmation } from './confirmation.component'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

describe('Confirmation Component', () => {
  describe('isOpen', () => {
    test('is not visible when isOpen is set to false', () => {
      render(
        <Confirmation
          isOpen={false}
          message=""
          confirmText=""
          title=""
          onConfirm={(): void => {}}
          onCancel={(): void => {}}
        />
      )

      expect(screen.queryByTestId('modal')).toBeNull()
    })

    test('is not visible when isOpen is set to true', () => {
      render(
        <Confirmation
          isOpen
          message=""
          confirmText=""
          title=""
          onConfirm={(): void => {}}
          onCancel={(): void => {}}
        />
      )

      expect(screen.queryByTestId('modal')).toBeVisible()
    })
  })

  describe('title', () => {
    test('title is rendered', () => {
      const title = 'Title of the modal'

      render(
        <Confirmation
          isOpen
          message=""
          confirmText=""
          title={title}
          onConfirm={(): void => {}}
          onCancel={(): void => {}}
        />
      )

      expect(screen.queryByText(title)).toBeVisible()
    })

    test('html is passed escaped', () => {
      const title = 'Title of <strong>the modal</strong>'

      render(
        <Confirmation
          isOpen
          message=""
          confirmText=""
          title={title}
          onConfirm={(): void => {}}
          onCancel={(): void => {}}
        />
      )

      expect(screen.queryByText(title)).toBeVisible()
    })
  })

  describe('message', () => {
    test('message is rendered', () => {
      const message = 'Content of the modal'

      render(
        <Confirmation
          isOpen
          message={message}
          confirmText=""
          title=""
          onConfirm={(): void => {}}
          onCancel={(): void => {}}
        />
      )

      expect(screen.queryByText(message)).toBeVisible()
    })

    test('html is properly rendered', () => {
      const message = 'Content of <strong>the modal</strong>'

      render(
        <Confirmation
          isOpen
          message={message}
          confirmText=""
          title=""
          onConfirm={(): void => {}}
          onCancel={(): void => {}}
        />
      )

      expect(screen.queryByTestId('modalBodyContent')?.innerHTML).toEqual(message)
    })
  })

  describe('confirm props', () => {
    test('confirm text is rendered properly with default color', () => {
      const confirmText = 'OK'

      render(
        <Confirmation
          isOpen
          message=""
          confirmText={confirmText}
          title=""
          onConfirm={(): void => {}}
          onCancel={(): void => {}}
        />
      )

      const confirmButton = screen.queryByText(confirmText)
      expect(confirmButton).toBeVisible()
      expect(confirmButton?.className.indexOf('primary')).not.toEqual(-1)
    })

    test('confirm color can be set', () => {
      const confirmText = 'OK'
      const confirmColor = 'danger'

      render(
        <Confirmation
          isOpen
          message=""
          confirmText={confirmText}
          confirmType={confirmColor}
          title=""
          onConfirm={(): void => {}}
          onCancel={(): void => {}}
        />
      )

      const confirmButton = screen.queryByText(confirmText)
      expect(confirmButton).toBeVisible()
      expect(confirmButton?.className.indexOf(confirmColor)).not.toEqual(-1)
    })
  })

  describe('cancel props', () => {
    test('cancel text is rendered properly with default text', () => {
      render(
        <Confirmation
          isOpen
          message=""
          confirmText=""
          title=""
          onConfirm={(): void => {}}
          onCancel={(): void => {}}
        />
      )

      const cancelButton = screen.queryByTestId('modalCancelButton')
      expect(cancelButton).toBeVisible()
    })

    test('cancel text is rendered properly with custom text', () => {
      const cancelText = 'Custom cancel text'

      render(
        <Confirmation
          isOpen
          message=""
          confirmText=""
          cancelText={cancelText}
          title=""
          onConfirm={(): void => {}}
          onCancel={(): void => {}}
        />
      )

      const cancelButton = screen.queryByText(cancelText)
      expect(cancelButton).toBeVisible()
    })

    test('cancel text is rendered properly with secondary color', () => {
      render(
        <Confirmation
          isOpen
          message=""
          confirmText=""
          title=""
          onConfirm={(): void => {}}
          onCancel={(): void => {}}
        />
      )

      const cancelButton = screen.queryByTestId('modalCancelButton')
      expect(cancelButton?.className.indexOf('secondary')).not.toEqual(-1)
    })
  })

  describe('isProcessing', () => {
    test('spinner does not show when processing is not set', () => {
      render(
        <Confirmation
          isOpen
          message=""
          confirmText=""
          title=""
          onConfirm={(): void => {}}
          onCancel={(): void => {}}
        />
      )

      const spinner = screen.queryByTestId('modalIsProcessing')
      expect(spinner).toBeNull()
    })

    test('spinner does not show when processing is false', () => {
      render(
        <Confirmation
          isProcessing={false}
          isOpen
          message=""
          confirmText=""
          title=""
          onConfirm={(): void => {}}
          onCancel={(): void => {}}
        />
      )

      const spinner = screen.queryByTestId('modalIsProcessing')
      expect(spinner).toBeNull()
    })

    test('spinner shows when processing is true', () => {
      render(
        <Confirmation
          isProcessing
          isOpen
          message=""
          confirmText=""
          title=""
          onConfirm={(): void => {}}
          onCancel={(): void => {}}
        />
      )

      const spinner = screen.queryByTestId('modalIsProcessing')
      expect(spinner).toBeVisible()
    })

    test('both buttons are disabled when processing is on', () => {
      render(
        <Confirmation
          isProcessing
          isOpen
          message=""
          confirmText=""
          title=""
          onConfirm={(): void => {}}
          onCancel={(): void => {}}
        />
      )

      const confirmButton = screen.getByTestId('modalConfirmButton')
      const cancelButton = screen.getByTestId('modalCancelButton')

      expect((confirmButton as HTMLButtonElement).disabled).toEqual(true)
      expect((cancelButton as HTMLButtonElement).disabled).toEqual(true)
    })
  })

  describe('onConfirm', () => {
    test('is called when the user clicks the confirmation button', () => {
      const onConfirm = jest.fn()

      render(
        <Confirmation
          isOpen
          message=""
          confirmText=""
          title=""
          onConfirm={onConfirm}
          onCancel={(): void => {}}
        />
      )

      fireEvent.click(screen.queryByTestId('modalConfirmButton')!)

      expect(onConfirm).toHaveBeenCalled()
    })
  })

  describe('onCancel', () => {
    test('is called when the user clicks the cancellation button', () => {
      const onCancel = jest.fn()

      render(
        <Confirmation
          isOpen
          message=""
          confirmText=""
          title=""
          onConfirm={(): void => {}}
          onCancel={onCancel}
        />
      )

      fireEvent.click(screen.queryByTestId('modalCancelButton')!)

      expect(onCancel).toHaveBeenCalled()
    })
  })
})
