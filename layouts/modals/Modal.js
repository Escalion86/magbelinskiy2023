import Tooltip from '@components/Tooltip'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ModalButtons from '@layouts/modals/ModalButtons'
import modalsAtom from '@state/atoms/modalsAtom'
import { modalsFuncAtom } from '@state/atoms'
import cn from 'classnames'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Suspense, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const Modal = ({
  Children,
  id,
  // onClose = () => {},
  // onDelete = null,
  // twoCols = false,
  // noPropsToChildren = false,
  // editMode = null,
  // setEditMode = null,
  title,
  text,
  subModalText = null,
  // modals = null,
  onClose,
  onConfirm,
  onConfirm2,
  onDecline,
  confirmButtonName,
  confirmButtonName2,
  declineButtonName,
  closeButtonName,
  // showConfirm,
  // showConfirm2,
  // showDecline,
  closeButtonShow = true,
  declineButtonShow = true,
  onlyCloseButtonShow,
  TopLeftComponent,
  bottomLeftButtonProps,
  bottomLeftComponent,
  declineButtonBgClassName,
  crossShow = true,
}) => {
  // const [rendered, setRendered] = useState(false)
  // const [preventCloseFunc, setPreventCloseFunc] = useState(null)
  const [titleState, setTitleState] = useState(title)
  const modalsFunc = useRecoilValue(modalsFuncAtom)
  const [disableConfirm, setDisableConfirm] = useState(false)
  const [disableDecline, setDisableDecline] = useState(false)
  const [confirmButtonNameState, setConfirmButtonNameState] =
    useState(confirmButtonName)
  const [confirmButtonName2State, setConfirmButtonName2State] =
    useState(confirmButtonName2)
  const [onShowOnCloseConfirmDialog, setOnShowOnCloseConfirmDialog] =
    useState(false)
  const [onConfirmFunc, setOnConfirmFunc] = useState(null)
  const [onConfirm2Func, setOnConfirm2Func] = useState(null)
  const [onDeclineFunc, setOnDeclineFunc] = useState(null)
  const setModals = useSetRecoilState(modalsAtom)
  const [close, setClose] = useState(false)
  const [ComponentInFooter, setComponentInFooter] = useState(null)
  const [closeButtonShowState, setCloseButtonShowState] =
    useState(closeButtonShow)
  const [declineButtonShowState, setDeclineButtonShowState] =
    useState(declineButtonShow)
  const [onlyCloseButtonShowState, setOnlyCloseButtonShowState] =
    useState(onlyCloseButtonShow)
  const [TopLeftComponentState, setTopLeftComponentState] =
    useState(TopLeftComponent)
  const [bottomLeftButton, setBottomLeftButton] = useState(
    bottomLeftButtonProps
  )
  const [bottomLeftComponentState, setBottomLeftComponent] =
    useState(bottomLeftComponent)

  const closeModal = () => {
    onClose && typeof onClose === 'function' && onClose()
    setClose(true)
    setTimeout(
      () => setModals((modals) => modals.filter((modal) => modal.id !== id)),
      200
    )
  }

  const router = useRouter()

  const refreshPage = () => {
    router.replace(router.asPath)
  }

  // const onConfirmClick = () => {
  //   if (onConfirmFunc) return onConfirmFunc(refreshPage)
  //   onConfirm && typeof onConfirm === 'function' && onConfirm(refreshPage)
  //   closeModal()
  // }

  const onConfirmClick =
    typeof onConfirmFunc === 'function'
      ? () => onConfirmFunc(refreshPage)
      : typeof onConfirm === 'function'
      ? () => {
          onConfirm(refreshPage)
          closeModal()
        }
      : undefined

  const onConfirm2Click =
    typeof onConfirm2Func === 'function'
      ? () => onConfirm2Func(refreshPage)
      : typeof onConfirm2 === 'function'
      ? () => {
          onConfirm2(refreshPage)
          closeModal()
        }
      : undefined

  // const onConfirm2Click = () => {
  //   if (onConfirm2Func) return onConfirm2Func(refreshPage)
  //   onConfirm2 && typeof onConfirm2 === 'function' && onConfirm2(refreshPage)
  //   closeModal()
  // }

  const onDeclineClick =
    onShowOnCloseConfirmDialog ||
    typeof onDeclineFunc === 'function' ||
    typeof onDecline === 'function'
      ? () => {
          const decline =
            typeof onDeclineFunc === 'function'
              ? () => onDeclineFunc()
              : typeof onDecline === 'function'
              ? () => {
                  onDecline(refreshPage)
                  closeModal()
                }
              : undefined

          if (onShowOnCloseConfirmDialog) {
            modalsFunc.confirm({
              onConfirm: () => {
                if (typeof decline === 'function') decline()
                else closeModal()
                // setOnShowOnCloseConfirmDialog(false)
              },
            })
          } else {
            decline()
          }
        }
      : undefined

  // const closeFunc = () => {
  //   setRendered(false)
  //   setTimeout(() => {
  //     onClose()
  //   }, 200)
  // }
  // const onCloseWithDelay = () => {
  //   if (formChanged && modals) {
  //     modals.openConfirmModal(
  //       'Отмена изменений',
  //       'Вы уверены что хотите закрыть окно без сохранения изменений?',
  //       closeFunc
  //     )
  //   } else closeFunc()
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setRendered(true)
  //   }, 10)
  // }, [])

  return (
    <motion.div
      className={
        cn(
          'absolute left-0 top-0 z-50 flex h-screen w-full transform justify-center bg-gray-800 bg-opacity-80 duration-200 tablet:items-center tablet:overflow-y-auto',
          subModalText ? 'tablet:pb-5 tablet:pt-10' : 'tablet:py-5'
        )
        //  + (rendered ? ' opacity-100' : ' opacity-0')
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: close ? 0 : 1 }}
      transition={{ duration: 0.1 }}
      onMouseDown={crossShow ? onDeclineClick || closeModal : undefined}
    >
      <motion.div
        className={
          cn(
            'real-screen-height laptop:w-9/12 border-primary relative flex w-full min-w-84 flex-col border-l bg-white pb-1 duration-300 tablet:my-auto tablet:h-auto tablet:w-[95%] tablet:min-w-156 tablet:rounded-lg tablet:pb-2',
            titleState ? 'pt-3' : 'pt-12'
          )
          // + (rendered ? '' : ' scale-50')
        }
        initial={{ scale: 0.5 }}
        animate={{ scale: close ? 0.5 : 1 }}
        transition={{ duration: 0.1 }}
        // onClick={(e) => e?.stopPropagation()}
        onMouseDown={(e) => e?.stopPropagation()}
      >
        {subModalText && (
          <div className="absolute -top-9 left-0 flex w-full justify-center">
            <div className="rounded-md bg-white px-2 py-0.5">
              {subModalText}
            </div>
          </div>
        )}
        {TopLeftComponentState && (
          <div className="absolute left-2 top-2">{TopLeftComponentState}</div>
        )}
        {crossShow && (
          <Tooltip title="Закрыть">
            <div className="absolute right-2 top-2">
              <FontAwesomeIcon
                className="h-8 w-8 transform cursor-pointer text-black duration-200 hover:scale-110"
                icon={faTimes}
                // size="1x"
                onClick={onDeclineClick || closeModal}
              />
            </div>
          </Tooltip>
        )}
        {titleState && (
          <div className="mx-12 mb-3 whitespace-pre-line text-center text-lg font-bold leading-6">
            {titleState}
          </div>
        )}
        {text && <div className="mb-3 px-2 leading-4 tablet:px-3">{text}</div>}
        {/* {editMode && onDelete && (
          <FontAwesomeIcon
            className="absolute w-5 h-5 text-red-700 duration-200 transform cursor-pointer top-4 left-4 hover:scale-110"
            icon={faTrash}
            size="1x"
            onClick={() => {
              onDelete(closeModal)
            }}
          />
        )} */}
        {/* {!editMode && editMode !== null && (
          <FontAwesomeIcon
            className="absolute w-5 h-5 duration-200 transform cursor-pointer text-primary top-4 left-4 hover:scale-110"
            icon={faPencilAlt}
            size="1x"
            onClick={
              setEditMode
                ? () => {
                    setEditMode(true)
                  }
                : null
            }
          />
        )} */}
        {/* {noPropsToChildren
          ? children
          : cloneElement(children, { onClose: closeModal, setBeforeCloseFunc })} */}
        <div className="flex-1 overflow-y-auto px-2 tablet:px-3">
          {Children && (
            <Suspense fallback={<Skeleton count={12} />}>
              <Children
                closeModal={closeModal}
                setOnConfirmFunc={(func) =>
                  setOnConfirmFunc(func ? () => func : null)
                }
                setOnConfirm2Func={(func) =>
                  setOnConfirm2Func(func ? () => func : null)
                }
                setOnDeclineFunc={(func) =>
                  setOnDeclineFunc(func ? () => func : null)
                }
                setOnShowOnCloseConfirmDialog={setOnShowOnCloseConfirmDialog}
                setDisableConfirm={setDisableConfirm}
                setDisableDecline={setDisableDecline}
                setComponentInFooter={setComponentInFooter}
                setOnlyCloseButtonShow={setOnlyCloseButtonShowState}
                setTopLeftComponent={setTopLeftComponentState}
                setBottomLeftButtonProps={setBottomLeftButton}
                setBottomLeftComponent={setBottomLeftComponent}
                setCloseButtonShow={setCloseButtonShowState}
                setDeclineButtonShow={setDeclineButtonShowState}
                setConfirmButtonName={setConfirmButtonNameState}
                setConfirmButtonName2={setConfirmButtonName2State}
                setTitle={setTitleState}
              />
            </Suspense>
          )}
        </div>

        {(onConfirmClick ||
          onConfirm2Click ||
          // showConfirm ||
          closeButtonShowState ||
          // showDecline ||
          ComponentInFooter ||
          onlyCloseButtonShowState ||
          bottomLeftButton ||
          bottomLeftComponentState) && (
          <ModalButtons
            closeButtonShow={
              onlyCloseButtonShowState ||
              (!onDeclineClick && closeButtonShowState)
            }
            declineButtonShow={declineButtonShowState}
            confirmName={confirmButtonNameState}
            confirmName2={confirmButtonName2State}
            declineName={declineButtonName}
            closeButtonName={closeButtonName}
            onConfirmClick={!onlyCloseButtonShowState && onConfirmClick}
            onConfirm2Click={!onlyCloseButtonShowState && onConfirm2Click}
            onDeclineClick={!onlyCloseButtonShowState && onDeclineClick}
            // showConfirm={!onlyCloseButtonShow && showConfirm}
            // showConfirm2={!onlyCloseButtonShow && showConfirm2}
            // showDecline={!onlyCloseButtonShowState && showDecline}
            disableConfirm={disableConfirm}
            disableDecline={disableDecline}
            closeModal={closeModal}
            bottomLeftButton={bottomLeftButton}
            bottomLeftComponent={bottomLeftComponentState}
            declineButtonBgClassName={declineButtonBgClassName}
          >
            {ComponentInFooter}
          </ModalButtons>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Modal
