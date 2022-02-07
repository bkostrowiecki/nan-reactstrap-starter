import React, { useCallback, useContext, useEffect } from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { translate } from '../translate/translate';
import { ToastContext, ToastType } from './toasts-context';

type Props = {
  message: string;
  type: ToastType;
  duration: number;
  isHiding: boolean;
  id: string;
}

export const ToastItem: React.FC<Props> = ({
  type,
  message,
  isHiding,
  duration,
  id
}) => {
  const shouldShowCloseButton = duration < 0;

  const { dispatch } = useContext(ToastContext)

  const onCloseClick = useCallback(() => {
    dispatch({
      type: 'hide',
      payload: {
        id
      }
    });
  }, [dispatch]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    if (duration > -1) {
      (async () => {
        await delay(duration - 500);

        dispatch({
          type: 'prepareHiding',
          payload: {
            id,
          }
        })

        await delay(500)

        dispatch({
          type: 'hide',
          payload: {
            id,
          }
        })
      })();
    }
  })

  return (
    <Toast className={isHiding ? 'fade-out' : ''}>
      <ToastHeader icon={type}>
        {translate(type)}
        {shouldShowCloseButton && (
          <button
            onClick={onCloseClick}
            type="button"
            className="toast-close ml-2 close"
            data-dismiss="toast"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </ToastHeader>
      <ToastBody>
        <span
          dangerouslySetInnerHTML={{
            __html: message
          }}
        />
      </ToastBody>
    </Toast>
  )
}
