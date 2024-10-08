import AddressPicker from '@components/AddressPicker'
import EventTagsChipsSelector from '@components/Chips/EventTagsChipsSelector'
import DirectionSelector from '@components/ComboBox/DirectionSelector'
import DateTimePicker from '@components/DateTimePicker'
import EditableTextarea from '@components/EditableTextarea'
import ErrorsList from '@components/ErrorsList'
import FormRow from '@components/FormRow'
import IconCheckBox from '@components/IconCheckBox'
import Input from '@components/Input'
import InputImages from '@components/InputImages'
import { SelectUser } from '@components/SelectItem'
import TabContext from '@components/Tabs/TabContext'
import TabPanel from '@components/Tabs/TabPanel'
import {
  faEye,
  faEyeSlash,
  faHeart,
  faHeartBroken,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import compareArrays from '@helpers/compareArrays'
import compareObjects from '@helpers/compareObjects'
import {
  DEFAULT_EVENT,
  DEFAULT_USERS_STATUS_DISCOUNT,
} from '@helpers/constants'
import formatMinutes from '@helpers/formatMinutes'
import getDiffBetweenDates from '@helpers/getDiffBetweenDates'
import getEventDuration from '@helpers/getEventDuration'
import isObject from '@helpers/isObject'
import useErrors from '@helpers/useErrors'
import directionsAtom from '@state/atoms/directionsAtom'
import itemsFuncAtom from '@state/atoms/itemsFuncAtom'
import loggedUserAtom from '@state/atoms/loggedUserAtom'
import eventSelector from '@state/selectors/eventSelector'
import { useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { uid } from 'uid'

const eventFunc = (eventId, clone = false) => {
  const EventModal = ({
    closeModal,
    setOnConfirmFunc,
    setOnDeclineFunc,
    setOnShowOnCloseConfirmDialog,
    setDisableConfirm,
    setDisableDecline,
  }) => {
    const event = useRecoilValue(eventSelector(eventId))
    const directions = useRecoilValue(directionsAtom)
    const setEvent = useRecoilValue(itemsFuncAtom).event.set
    // const [refPerticipantsMax, setFocusPerticipantsMax] = useFocus()
    // const [refMansMax, setFocusMansMax] = useFocus()
    // const [refWomansMax, setFocusWomansMax] = useFocus()
    // const [refMansNoviceMax, setFocusMansNoviceMax] = useFocus()
    // const [refWomansNoviceMax, setFocusWomansNoviceMax] = useFocus()
    // const [refMansMemberMax, setFocusMansMemberMax] = useFocus()
    // const [refWomansMemberMax, setFocusWomansMemberMax] = useFocus()
    const [directionId, setDirectionId] = useState(
      event?.directionId ?? DEFAULT_EVENT.directionId
    )

    const defaultOrganizerId =
      event?.organizerId ?? useRecoilValue(loggedUserAtom)._id
    const [organizerId, setOrganizerId] = useState(defaultOrganizerId)

    const [title, setTitle] = useState(event?.title ?? DEFAULT_EVENT.title)
    const [images, setImages] = useState(event?.images ?? DEFAULT_EVENT.images)
    const [description, setDescription] = useState(
      event?.description ?? DEFAULT_EVENT.description
    )

    const defaultTags = useMemo(
      () =>
        typeof event?.tags === 'object' ? event?.tags.filter((tag) => tag) : [],
      []
    )
    const [tags, setTags] = useState(defaultTags)

    const defaultDateStart = useMemo(
      () => event?.dateStart ?? Date.now() - (Date.now() % 3600000) + 3600000,
      []
    )

    const defaultDateEnd = useMemo(
      () => event?.dateEnd ?? defaultDateStart + 3600000,
      []
    )

    const [dateStart, setDateStart] = useState(defaultDateStart)
    const [dateEnd, setDateEnd] = useState(defaultDateEnd)

    // const [duration, setDuration] = useState(
    //   event?.duration ?? DEFAULT_EVENT.duration
    // )

    const [address, setAddress] = useState(
      event?.address && isObject(event.address)
        ? event.address
        : DEFAULT_EVENT.address
    )
    // const [price, setPrice] = useState(event?.price ?? DEFAULT_EVENT.price)
    const [subEvents, setSubEvents] = useState(
      event?.subEvents
        ? event.subEvents
        : eventId
        ? []
        : [
            {
              id: uid(24),
              title: 'Вариант участия №1',
              price: 0,
              usersStatusDiscount: { ...DEFAULT_USERS_STATUS_DISCOUNT },
              maxParticipants: null,
              maxMans: null,
              maxWomans: null,
              maxMansNovice: null,
              maxWomansNovice: null,
              maxMansMember: null,
              maxWomansMember: null,
              minMansAge: 35,
              minWomansAge: 30,
              maxMansAge: 50,
              maxWomansAge: 45,
              usersStatusAccess: {},
              usersRelationshipAccess: 'yes',
            },
          ]
    )

    // const [maxParticipants, setMaxParticipants] = useState(
    //   event?.maxParticipants ?? DEFAULT_EVENT.maxParticipants
    // )
    // const [maxMans, setMaxMans] = useState(
    //   event?.maxMans ?? DEFAULT_EVENT.maxMans
    // )
    // const [maxWomans, setMaxWomans] = useState(
    //   event?.maxWomans ?? DEFAULT_EVENT.maxWomans
    // )
    // const [maxParticipantsCheck, setMaxParticipantsCheck] = useState(
    //   typeof event?.maxParticipants !== 'number'
    // )
    // const [maxMansCheck, setMaxMansCheck] = useState(
    //   typeof event?.maxMans !== 'number'
    // )
    // const [maxWomansCheck, setMaxWomansCheck] = useState(
    //   typeof event?.maxWomans !== 'number'
    // )
    // const [maxMansNovice, setMaxMansNovice] = useState(
    //   event?.maxMansNovice ?? DEFAULT_EVENT.maxMansNovice
    // )
    // const [maxMansMember, setMaxMansMember] = useState(
    //   event?.maxMansMember ?? DEFAULT_EVENT.maxMansMember
    // )
    // const [maxWomansNovice, setMaxWomansNovice] = useState(
    //   event?.maxWomansNovice ?? DEFAULT_EVENT.maxWomansNovice
    // )
    // const [maxWomansMember, setMaxWomansMember] = useState(
    //   event?.maxWomansMember ?? DEFAULT_EVENT.maxWomansMember
    // )
    // const [maxMansNoviceCheck, setMaxMansNoviceCheck] = useState(
    //   typeof event?.maxMansNovice !== 'number'
    // )
    // const [maxMansMemberCheck, setMaxMansMemberCheck] = useState(
    //   typeof event?.maxMansMember !== 'number'
    // )
    // const [maxWomansNoviceCheck, setMaxWomansNoviceCheck] = useState(
    //   typeof event?.maxWomansNovice !== 'number'
    // )
    // const [maxWomansMemberCheck, setMaxWomansMemberCheck] = useState(
    //   typeof event?.maxWomansMember !== 'number'
    // )

    // const [minMansAge, setMinMansAge] = useState(
    //   event?.minMansAge ?? DEFAULT_EVENT.minMansAge
    // )
    // const [minWomansAge, setMinWomansAge] = useState(
    //   event?.minWomansAge ?? DEFAULT_EVENT.minWomansAge
    // )
    // const [maxMansAge, setMaxMansAge] = useState(
    //   event?.maxMansAge ?? DEFAULT_EVENT.maxMansAge
    // )
    // const [maxWomansAge, setMaxWomansAge] = useState(
    //   event?.maxWomansAge ?? DEFAULT_EVENT.maxWomansAge
    // )
    // const defaultUsersStatusAccess = {
    //   ...DEFAULT_USERS_STATUS_ACCESS,
    //   ...event?.usersStatusAccess,
    // }
    // const [usersStatusAccess, setUsersStatusAccess] = useState(
    //   defaultUsersStatusAccess
    // )

    // const defaultUsersStatusDiscount = {
    //   ...DEFAULT_USERS_STATUS_DISCOUNT,
    //   ...(event?.usersStatusDiscount ?? DEFAULT_EVENT.usersStatusDiscount),
    // }
    // const [usersStatusDiscount, setUsersStatusDiscount] = useState(
    //   defaultUsersStatusDiscount
    // )

    // const [usersRelationshipAccess, setUsersRelationshipAccess] = useState(
    //   event?.usersRelationshipAccess ?? DEFAULT_EVENT.usersRelationshipAccess
    // )

    const [showOnSite, setShowOnSite] = useState(
      event?.showOnSite ?? DEFAULT_EVENT.showOnSite
    )
    // const [isReserveActive, setIsReserveActive] = useState(
    //   event?.isReserveActive ?? DEFAULT_EVENT.isReserveActive
    // )
    const [reportImages, setReportImages] = useState(
      event?.reportImages ?? DEFAULT_EVENT.reportImages
    )
    const [report, setReport] = useState(event?.report ?? DEFAULT_EVENT.report)

    const [warning, setWarning] = useState(
      event?.warning ?? DEFAULT_EVENT.warning
    )

    const [likes, setLikes] = useState(event?.likes ?? DEFAULT_EVENT.likes)

    const direction = useMemo(
      () => directions.find(({ _id }) => _id === directionId),
      [directionId]
    )

    // const changeDirectionId = (id) => {
    //   const direction = directions.find(({ _id }) => _id === id)
    //   const rules = direction.rules
    //   if (rules && typeof rules === 'object') {
    //     if (rules?.userStatus) {
    //       setUsersStatusAccess((state) => {
    //         const novice = ['novice', 'any'].includes(rules.userStatus)
    //           ? true
    //           : rules.userStatus === 'member'
    //             ? false
    //             : state.novice
    //         const member = ['member', 'any'].includes(rules.userStatus)
    //           ? true
    //           : rules.userStatus === 'novice'
    //             ? false
    //             : state.member
    //         return { ...state, novice, member }
    //       })
    //     }
    //     if (rules?.userRelationship) {
    //       setUsersRelationshipAccess((state) => {
    //         if (rules.userRelationship === 'any') {
    //           return 'yes'
    //         }
    //         if (rules.userRelationship === 'alone') {
    //           return 'no'
    //         }
    //         if (rules.userRelationship === 'pair') {
    //           return 'only'
    //         }
    //         return state
    //       })
    //     }
    //   }
    //   setDirectionId(id)
    // }

    const [errors, checkErrors, addError, removeError, clearErrors] =
      useErrors()

    const onClickConfirm = async () => {
      let isErrorsExists = checkErrors({
        title,
        description,
        images,
        directionId,
        organizerId,
        dateStart,
        dateEnd,
        tags,
      })
      if (getDiffBetweenDates(dateStart, dateEnd) < 0) {
        addError({
          dateEnd:
            'Дата завершения не может быть раньше даты начала мероприятия',
        })
        isErrorsExists = true
      }
      if (!isErrorsExists) {
        closeModal()
        setEvent(
          {
            _id: event?._id,
            images,
            title: title.trim(),
            description,
            tags,
            showOnSite,
            dateStart,
            dateEnd,
            // duration,
            address,
            // price,
            subEvents,
            directionId,
            // maxParticipants: maxParticipantsCheck ? null : maxParticipants ?? 0,
            // maxMans: maxMansCheck ? null : maxMans ?? 0,
            // maxWomans: maxWomansCheck ? null : maxWomans ?? 0,
            // maxMansNovice: maxMansNoviceCheck ? null : maxMansNovice ?? 0,
            // maxWomansNovice: maxWomansNoviceCheck ? null : maxWomansNovice ?? 0,
            // maxMansMember: maxMansMemberCheck ? null : maxMansMember ?? 0,
            // maxWomansMember: maxWomansMemberCheck ? null : maxWomansMember ?? 0,
            // maxMansAge,
            // minMansAge,
            // maxWomansAge,
            // minWomansAge,
            organizerId,
            // status,
            // usersStatusAccess,
            // usersStatusDiscount,
            // usersRelationshipAccess,
            // isReserveActive,
            report,
            reportImages,
            warning,
            likes,
          },
          clone
        )
      }
    }

    useEffect(() => {
      const isFormChanged =
        event?.title !== title ||
        event?.description !== description ||
        !compareArrays(defaultTags, tags) ||
        event?.showOnSite !== showOnSite ||
        dateStart !== defaultDateStart ||
        dateEnd !== defaultDateEnd ||
        // event?.duration !== duration ||
        !compareArrays(event?.images, images) ||
        !compareObjects(event?.address, address) ||
        // event?.price !== price ||
        !compareObjects(event?.subEvents, subEvents) ||
        event?.directionId !== directionId ||
        // event?.maxParticipants !==
        //   (maxParticipantsCheck ? null : maxParticipants ?? 0) ||
        // event?.maxMans !== (maxMansCheck ? null : maxMans ?? 0) ||
        // event?.maxWomans !== (maxWomansCheck ? null : maxWomans ?? 0) ||
        // event?.maxMansNovice !==
        //   (maxMansNoviceCheck ? null : maxMansNovice ?? 0) ||
        // event?.maxWomansNovice !==
        //   (maxWomansNoviceCheck ? null : maxWomansNovice ?? 0) ||
        // event?.maxMansMember !==
        //   (maxMansMemberCheck ? null : maxMansMember ?? 0) ||
        // event?.maxWomansMember !==
        //   (maxWomansMemberCheck ? null : maxWomansMember ?? 0) ||
        // event?.minMansAge !== minMansAge ||
        // event?.maxMansAge !== maxMansAge ||
        // event?.minWomansAge !== minWomansAge ||
        // event?.maxWomansAge !== maxWomansAge ||
        organizerId !== defaultOrganizerId ||
        // event?.status !== status ||
        // !compareObjects(defaultUsersStatusAccess, usersStatusAccess) ||
        // !compareObjects(defaultUsersStatusDiscount, usersStatusDiscount) ||
        // event?.usersRelationshipAccess !== usersRelationshipAccess ||
        // event?.isReserveActive !== isReserveActive ||
        event?.report !== report ||
        !compareArrays(event?.reportImages, reportImages) ||
        event?.warning !== warning ||
        event?.likes !== likes

      // setOnConfirmFunc(onClickConfirm)
      setOnShowOnCloseConfirmDialog(isFormChanged)
      setDisableConfirm(!isFormChanged)
      setOnConfirmFunc(isFormChanged ? onClickConfirm : undefined)
    }, [
      title,
      description,
      tags,
      showOnSite,
      dateStart,
      dateEnd,
      // duration,
      images,
      address,
      // price,
      subEvents,
      directionId,
      // maxParticipants,
      // maxMans,
      // maxWomans,
      // maxMansNovice,
      // maxWomansNovice,
      // maxMansMember,
      // maxWomansMember,
      // maxMansAge,
      // minMansAge,
      // maxWomansAge,
      // minWomansAge,
      organizerId,
      // maxParticipantsCheck,
      // maxMansCheck,
      // maxWomansCheck,
      // maxMansNoviceCheck,
      // maxWomansNoviceCheck,
      // maxMansMemberCheck,
      // maxWomansMemberCheck,
      // status,
      // usersStatusAccess,
      // usersStatusDiscount,
      // usersRelationshipAccess,
      // isReserveActive,
      report,
      reportImages,
      warning,
      likes,
    ])

    const duration = getEventDuration({ dateStart, dateEnd })

    return (
      <>
        <TabContext value="Общие">
          <TabPanel tabName="Общие" className="px-0">
            {/* <FormWrapper> */}
            <InputImages
              label="Фотографии"
              directory="events"
              images={images}
              onChange={(images) => {
                removeError('images')
                setImages(images)
              }}
              required
              error={errors.images}
            />
            {/* <SelectDirection
              selectedId={directionId}
              onChange={(directionId) => {
                removeError('directionId')
                setDirectionId(directionId)
              }}
              required
              error={errors.directionId}
            /> */}
            <DirectionSelector
              value={directionId}
              onChange={(directionId) => {
                removeError('directionId')
                // changeDirectionId(directionId)
                setDirectionId(directionId)
              }}
              required
              error={errors.directionId}
            />
            {(direction?.rules?.userStatus &&
              direction?.rules?.userStatus !== 'select') ||
              (direction?.rules?.userRelationship &&
                direction?.rules?.userRelationship !== 'select' && (
                  <div className="text-danger -mb-2 pl-2 text-sm">
                    Применены ограничения доступа заданные направлением
                  </div>
                ))}
            <Input
              label="Название"
              type="text"
              value={title}
              onChange={(value) => {
                removeError('title')
                setTitle(value)
              }}
              // labelClassName="w-40"
              error={errors.title}
              required
            />
            <EditableTextarea
              label="Описание"
              html={description}
              uncontrolled={false}
              onChange={(value) => {
                removeError('description')
                setDescription(value)
              }}
              placeholder="Описание мероприятия..."
              required
              error={errors.description}
            />
            <EventTagsChipsSelector
              tags={tags}
              onChange={(value) => {
                removeError('tags')
                setTags(value)
              }}
              canEditChips
              required
              error={errors.tags}
              // readOnly
              // className
            />
            {/* <FormWrapper twoColumns> */}
            <FormRow className="flex-wrap">
              <DateTimePicker
                value={dateStart}
                onChange={(date) => {
                  removeError('dateStart')
                  setDateStart(date)
                }}
                label="Начало"
                required
                error={errors.dateStart}
                noMargin
                // postfix={
                //   getDiffBetweenDates(dateStart) > 0 && 'Внимание: дата прошла!'
                // }
                // postfixClassName="text-danger"
              />
              {getDiffBetweenDates(dateStart) > 0 && (
                <div className="laptop:pt-0 text-danger flex items-center pt-[4px] leading-3">
                  Внимание: дата прошла!
                </div>
              )}
            </FormRow>
            <FormRow>
              <DateTimePicker
                value={dateEnd}
                onChange={(date) => {
                  removeError('dateEnd')
                  setDateEnd(date)
                }}
                label="Завершение"
                required
                error={errors.dateEnd}
                noMargin
                // postfix={formatMinutes(duration)}
              />
              <div className="laptop:pt-0 flex items-center pt-[4px] leading-3">
                {formatMinutes(duration)}
              </div>
            </FormRow>
            {/* <TimePicker
                  value={
                    formatMinutes(duration, true)
                    // (Math.ceil(duration / 60) <= 9
                    //   ? '0' + Math.ceil(duration / 60)
                    //   : Math.ceil(duration / 60)) +
                    // ':' +
                    // (duration % 60 <= 9 ? '0' + (duration % 60) : duration % 60)
                  }
                  onChange={(duration) => {
                    removeError('duration')
                    setDuration(
                      duration
                        .split(':')
                        .reduce((seconds, v) => +v + seconds * 60, 0)
                    )
                  }}
                  label="Продолжительность"
                  required
                  error={errors.duration}
                /> */}
            {/* </FormWrapper> */}
            <SelectUser
              label="Организатор"
              modalTitle="Выбор организатора"
              selectedId={organizerId}
              onChange={(userId) => {
                removeError('organizerId')
                setOrganizerId(userId)
              }}
              required
              error={errors.organizerId}
            />
            <AddressPicker address={address} onChange={setAddress} />
            {/* <CheckBox
              checked={warning}
              labelPos="left"
              // labelClassName="w-40"
              onClick={() => setWarning((checked) => !checked)}
              label="Предупреждение о рисках и травмоопасности на мероприятии"
            /> */}
            <IconCheckBox
              checked={warning}
              onClick={() => setWarning((checked) => !checked)}
              label="Предупреждение о рисках и травмоопасности на мероприятии"
              checkedIcon={faTriangleExclamation}
              checkedIconColor="#AA0000"
              big
            />

            <IconCheckBox
              checked={showOnSite}
              onClick={() => setShowOnSite((checked) => !checked)}
              label="Показывать на сайте"
              checkedIcon={faEye}
              uncheckedIcon={faEyeSlash}
              checkedIconColor="#A855F7"
              big
            />
            <IconCheckBox
              checked={likes}
              onClick={() => setLikes((checked) => !checked)}
              label="Участники ставят лайки другим участникам во время и после мероприятия"
              checkedIcon={faHeart}
              uncheckedIcon={faHeartBroken}
              checkedIconColor="#EC4899"
              big
            />
          </TabPanel>
        </TabContext>
        <ErrorsList errors={errors} />
      </>
    )
  }

  return {
    title: `${eventId && !clone ? 'Редактирование' : 'Создание'} мероприятия`,
    confirmButtonName: eventId && !clone ? 'Применить' : 'Создать',
    Children: EventModal,
  }
}

export default eventFunc
