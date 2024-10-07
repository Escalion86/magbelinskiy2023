import CardButtons from '@components/CardButtons'
import ContactsIconsButtons from '@components/ContactsIconsButtons'
import FormWrapper from '@components/FormWrapper'
import ImageGallery from '@components/ImageGallery'
import TextLine from '@components/TextLine'
import UserName from '@components/UserName'
import UserRelationshipIcon from '@components/UserRelationshipIcon'
import ValueItem from '@components/ValuePicker/ValueItem'
import ZodiacIcon from '@components/ZodiacIcon'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import birthDateToAge from '@helpers/birthDateToAge'
import { GENDERS } from '@helpers/constants'
import formatDate from '@helpers/formatDate'
import { modalsFuncAtom } from '@state/atoms'
import serverSettingsAtom from '@state/atoms/serverSettingsAtom'
import eventsUsersSignedUpWithEventStatusByUserIdCountSelector from '@state/selectors/eventsUsersSignedUpWithEventStatusByUserIdCountSelector'
import isLoggedUserMemberSelector from '@state/selectors/isLoggedUserMemberSelector'
import loggedUserActiveRoleSelector from '@state/selectors/loggedUserActiveRoleSelector'
import userSelector from '@state/selectors/userSelector'
import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

const CardButtonsComponent = ({ user }) => (
  <CardButtons item={user} typeOfItem="user" forForm />
)

const userViewFunc = (userId, params = {}) => {
  const UserModal = ({
    closeModal,
    setOnConfirmFunc,
    setOnDeclineFunc,
    setOnShowOnCloseConfirmDialog,
    setDisableConfirm,
    setDisableDecline,
    setTopLeftComponent,
  }) => {
    const serverDate = new Date(useRecoilValue(serverSettingsAtom)?.dateTime)
    const modalsFunc = useRecoilValue(modalsFuncAtom)
    const isLoggedUserMember = useRecoilValue(isLoggedUserMemberSelector)
    const loggedUserActiveRole = useRecoilValue(loggedUserActiveRoleSelector)
    const isLoggedUserDev = loggedUserActiveRole?.dev
    const seeBirthday = loggedUserActiveRole?.users?.seeBirthday
    const seeUserEvents = loggedUserActiveRole?.users?.seeUserEvents

    const user = useRecoilValue(userSelector(userId))

    const eventsUsersSignedUpCount = useRecoilValue(
      eventsUsersSignedUpWithEventStatusByUserIdCountSelector(userId)
    )

    useEffect(() => {
      if (!user) closeModal()
    }, [user])

    useEffect(() => {
      if (setTopLeftComponent)
        setTopLeftComponent(() => (
          <CardButtons
            item={user}
            typeOfItem="user"
            forForm
            showDeleteButton={false}
          />
        ))
    }, [setTopLeftComponent])

    if (!user) return null

    return (
      <FormWrapper flex className="flex-col">
        <ImageGallery images={user?.images} />
        <div className="mt-1 flex flex-1 flex-col">
          <div className="relative mb-1 flex min-h-6 items-center gap-x-2">
            {/* {user.status === 'member' && (
              <Tooltip title="Участник клуба">
                <div className="w-6 h-6">
                  <Image
                    src="/img/svg_icons/medal.svg"
                    width="24"
                    height="24"
                  />
                </div>
              </Tooltip>
            )} */}
            <UserName user={user} className="text-lg font-bold" />
            {!setTopLeftComponent && (
              <div className="absolute right-0">
                <CardButtonsComponent user={user} />
              </div>
            )}
          </div>
          {user.personalStatus && (
            <div className="pb-3 pt-1 text-sm font-normal italic leading-[15px] text-general">
              {user.personalStatus}
            </div>
          )}
          {isLoggedUserDev && <TextLine label="ID">{user?._id}</TextLine>}
          <TextLine label="Пол">
            {GENDERS.find((item) => item.value === user.gender)?.name ??
              '[не указан]'}
          </TextLine>
          {/* <div className="flex gap-x-2">
              <span className="font-bold">Ориентация:</span>
              <span>
                {
                  ORIENTATIONS.find((item) => item.value === user.orientation)
                    ?.name
                }
              </span>
            </div> */}
          {user.birthday &&
            (seeBirthday ||
              user.security?.showBirthday === true ||
              user.security?.showBirthday === 'full' ||
              user.security?.showBirthday === 'noYear') && (
              <div className="flex items-center gap-x-1">
                <span className="font-bold">Дата рождения:</span>
                <span>
                  {birthDateToAge(
                    user.birthday,
                    serverDate,
                    true,
                    true,
                    seeBirthday ||
                      user.security?.showBirthday === 'full' ||
                      user.security?.showBirthday === true
                  )}
                </span>
                <ZodiacIcon date={user.birthday} />
              </div>
            )}
          <TextLine label="Место проживания">
            {user.town ?? '[не указано]'}
          </TextLine>
          <TextLine label="Отношения">
            <UserRelationshipIcon
              size="m"
              relationship={user.relationship}
              showName
            />
          </TextLine>

          <TextLine label="Дети">
            {user?.haveKids === true
              ? 'Есть'
              : user?.haveKids === false
              ? 'Нет'
              : 'Не указано'}
          </TextLine>
          <ContactsIconsButtons
            user={user}
            withTitle
            grid
            forceShowAll={params?.showContacts}
          />
          <TextLine label="Дата регистрации">
            {formatDate(user.createdAt)}
          </TextLine>

          <div className="flex flex-col gap-x-2 gap-y-1 tablet:flex-row tablet:items-center">
            <div className="flex flex-col">
              <TextLine label="Посетил мероприятий">
                {eventsUsersSignedUpCount.finished}
              </TextLine>
              <TextLine label="Записан на мероприятия">
                {eventsUsersSignedUpCount.signUp}
              </TextLine>
            </div>

            {(seeUserEvents || isLoggedUserMember) &&
              (eventsUsersSignedUpCount.finished > 0 ||
                eventsUsersSignedUpCount.signUp > 0) && (
                <ValueItem
                  name="Посмотреть мероприятия с пользователем"
                  color="general"
                  icon={faCalendarAlt}
                  hoverable
                  onClick={() => modalsFunc.user.events(userId)}
                />
              )}
          </div>
        </div>

        {/* <SelectEventList
          eventsId={eventUsers.map((eventUser) => eventUser.eventId)}
          readOnly
        /> */}
      </FormWrapper>
    )
  }

  return {
    title: `Профиль пользователя`,
    declineButtonName: 'Закрыть',
    closeButtonShow: true,
    Children: UserModal,
    // TopLeftComponent: () => {
    //   return (
    //   <CardButtons id={userId} typeOfItem="user" forForm direction="right" />
    // )},
  }
}

export default userViewFunc
