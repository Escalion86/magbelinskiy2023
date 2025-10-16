import { faCopy, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowDown,
  faArrowUp,
  faCalendarAlt,
  faCode,
  faEllipsisV,
  faPencilAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EVENT_STATUSES, SERVICE_USER_STATUSES } from '@helpers/constants'
import { modalsFuncAtom } from '@state/atoms'
import windowDimensionsTailwindSelector from '@state/selectors/windowDimensionsTailwindSelector'
import cn from 'classnames'
import { useAtomValue } from 'jotai'
import CardButton from './CardButton'
import DropDown from './DropDown'
import useCopyToClipboard from '@helpers/useCopyToClipboard'
import { useEffect } from 'react'

const MenuItem = ({ active, icon, onClick, color = 'red', tooltipText }) => (
  <div
    className={cn(
      `flex h-9 cursor-pointer items-center gap-x-2 px-2 text-base font-normal duration-300 hover:bg-${color}-600 hover:text-white`,
      active ? `bg-${color}-500 text-white` : `bg-white text-${color}-500`
    )}
    onClick={(e) => {
      onClick && onClick()
    }}
  >
    <FontAwesomeIcon icon={icon} className="h-7 w-7" />
    <div className="prevent-select-text whitespace-nowrap">{tooltipText}</div>
  </div>
)

const CardButtons = ({
  item,
  typeOfItem,
  showOnSiteOnClick,
  onUpClick,
  onDownClick,
  className,
  forForm,
  alwaysCompact,
  alwaysCompactOnPhone,
  showEditButton = true,
  showDeleteButton = true,
  onEditQuestionnaire,
}) => {
  const modalsFunc = useAtomValue(modalsFuncAtom)
  const device = useAtomValue(windowDimensionsTailwindSelector)

  const copyId = useCopyToClipboard(item._id, 'ID скопирован в буфер обмена')

  const upDownSee =
    (!forForm && typeOfItem === 'service') ||
    typeOfItem === 'product' ||
    typeOfItem === 'additionalBlock' ||
    typeOfItem === 'direction'
  // (typeOfItem === 'event' && loggedUserActiveRole.events.edit) ||
  // (typeOfItem === 'user' && loggedUserActiveRole.users.edit) ||
  // (typeOfItem === 'service' && loggedUserActiveRole.services.edit) ||
  // (typeOfItem === 'serviceUser' && loggedUserActiveRole.servicesUsers.edit) ||
  // (typeOfItem === 'product' && loggedUserActiveRole.products.edit) ||
  // (typeOfItem === 'productUser' && loggedUserActiveRole.productsUsers.edit) ||
  // (typeOfItem === 'payment' && loggedUserActiveRole.payments.edit) ||
  // (typeOfItem === 'additionalBlock' &&
  // loggedUserActiveRole.generalPage.additionalBlocks) ||
  // (typeOfItem === 'direction' && loggedUserActiveRole.generalPage.directions) ||
  // (typeOfItem === 'review' && loggedUserActiveRole.generalPage.reviews)

  const show = {
    copyId: true,
    userActionsHistory: typeOfItem === 'user',
    setPasswordBtn: true,
    addToCalendar: typeOfItem === 'event',
    eventUsersBtn: typeOfItem === 'event',
    upBtn: onUpClick && upDownSee,
    downBtn: onDownClick && upDownSee,
    editBtn: showEditButton,
    cloneBtn: !['user', 'review'].includes(typeOfItem),
    showOnSiteBtn: showOnSiteOnClick,
    statusBtn: true,
    deleteBtn: showDeleteButton && item.status !== 'closed',
    paymentsUsersBtn: true,
    userEvents: typeOfItem === 'client',
    userPaymentsBtn: true,
  }

  const numberOfButtons = Object.keys(show).reduce(
    (p, c) => p + (show[c] ? 1 : 0),
    0
  )

  if (numberOfButtons === 0) return null

  const isCompact =
    alwaysCompact ||
    ((numberOfButtons > 3 || alwaysCompactOnPhone) &&
      ['phoneV', 'phoneH', 'tablet'].includes(device))

  const ItemComponent = isCompact ? MenuItem : CardButton

  const items = (
    <>
      {show.copyId && (
        <ItemComponent
          icon={faCode}
          onClick={() => copyId(item._id)}
          color="blue"
          tooltipText="Скопировать ID"
        />
      )}
      {/* {show.paymentsUsersBtn && (
        <ItemComponent
          icon={faMoneyBill}
          onClick={() => {
            modalsFunc.event.payments(item._id)
          }}
          color="amber"
          tooltipText="Финансы"
        />
      )} */}
      {/* {show.userPaymentsBtn && (
        <ItemComponent
          icon={faMoneyBill}
          onClick={() => {
            modalsFunc.user.payments(item._id)
          }}
          color="amber"
          tooltipText="Финансы"
        />
      )} */}
      {show.upBtn && (
        <ItemComponent
          icon={faArrowUp}
          onClick={() => {
            onUpClick()
          }}
          color="gray"
          tooltipText="Переместить выше"
        />
      )}
      {show.downBtn && (
        <ItemComponent
          icon={faArrowDown}
          onClick={() => {
            onDownClick()
          }}
          color="gray"
          tooltipText="Переместить ниже"
        />
      )}
      {show.userEvents && (
        <ItemComponent
          icon={faCalendarAlt}
          onClick={() => {
            modalsFunc[typeOfItem].events(item._id)
          }}
          color="blue"
          tooltipText="Мероприятия с пользователем"
        />
      )}
      {show.editBtn && (
        <ItemComponent
          icon={faPencilAlt}
          onClick={() => {
            modalsFunc[typeOfItem].edit(item._id)
          }}
          color="orange"
          tooltipText="Редактировать"
        />
      )}
      {show.cloneBtn && (
        <ItemComponent
          icon={faCopy}
          onClick={() => {
            modalsFunc[typeOfItem].add(item._id)
          }}
          color="blue"
          tooltipText="Клонировать"
        />
      )}
      {show.statusBtn
        ? (() => {
            const status = item.status ?? 'active'
            const { icon, color, name } = (
              typeOfItem === 'serviceUser'
                ? SERVICE_USER_STATUSES
                : EVENT_STATUSES
            ).find(({ value }) => value === status)
            return (
              <ItemComponent
                icon={icon}
                onClick={() => {
                  modalsFunc[typeOfItem].statusEdit(item._id)
                }}
                color={
                  color.indexOf('-') > 0
                    ? color.slice(0, color.indexOf('-'))
                    : color
                }
                tooltipText={`${name} (изменить статус)`}
              />
            )
          })()
        : null}
      {show.deleteBtn && (
        <ItemComponent
          icon={faTrashAlt}
          onClick={() => {
            modalsFunc[typeOfItem].delete(item._id)
          }}
          color="red"
          tooltipText="Удалить"
        />
      )}
    </>
  )

  return isCompact ? (
    <DropDown
      trigger={
        <div className="flex h-9 w-9 cursor-pointer flex-col items-center justify-center text-general">
          <FontAwesomeIcon icon={faEllipsisV} className="h-7 w-7" />
        </div>
      }
      className={className}
      menuPadding={false}
      openOnHover
    >
      <div className="overflow-hidden rounded-lg">{items}</div>
    </DropDown>
  ) : (
    <div className={cn('flex', className)}>{items}</div>
  )
}

export default CardButtons
