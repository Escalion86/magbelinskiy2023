import CardButtons from '@components/CardButtons'
import RelationshipSelector from '@components/ComboBox/RelationshipSelector'
import DatePicker from '@components/DatePicker'
import ErrorsList from '@components/ErrorsList'
import FormWrapper from '@components/FormWrapper'
import Input from '@components/Input'
import InputImages from '@components/InputImages'
import PhoneInput from '@components/PhoneInput'
import GenderPicker from '@components/ValuePicker/GenderPicker'
import HaveKidsPicker from '@components/ValuePicker/HaveKidsPicker'
import UserRolePicker from '@components/ValuePicker/UserRolePicker'
import UserStatusPicker from '@components/ValuePicker/UserStatusPicker'
import compareArrays from '@helpers/compareArrays'
import { DEFAULT_USER } from '@helpers/constants'
import useErrors from '@helpers/useErrors'
import itemsFuncAtom from '@state/atoms/itemsFuncAtom'
import loggedUserAtom from '@state/atoms/loggedUserAtom'
import usersAtom from '@state/atoms/usersAtom'
import loggedUserActiveRoleSelector from '@state/selectors/loggedUserActiveRoleSelector'
import userSelector from '@state/selectors/userSelector'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

const userFunc = (userId, clone = false) => {
  const UserModal = ({
    closeModal,
    setOnConfirmFunc,
    setOnDeclineFunc,
    setOnShowOnCloseConfirmDialog,
    setDisableConfirm,
    setDisableDecline,
    setTopLeftComponent,
  }) => {
    const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom)

    const loggedUserActiveRole = useRecoilValue(loggedUserActiveRoleSelector)
    const isLoggedUserDev = loggedUserActiveRole?.dev
    const canSetRole = loggedUserActiveRole?.users?.setRole
    const canSetStatus = loggedUserActiveRole?.users?.setStatus

    const user = useRecoilValue(userSelector(userId))
    const setUser = useRecoilValue(itemsFuncAtom).user.set
    const users = useRecoilValue(usersAtom)

    const [firstName, setFirstName] = useState(
      user?.firstName ?? DEFAULT_USER.firstName
    )
    const [secondName, setSecondName] = useState(
      user?.secondName ?? DEFAULT_USER.secondName
    )
    const [thirdName, setThirdName] = useState(
      user?.thirdName ?? DEFAULT_USER.thirdName
    )
    const [password, setPassword] = useState(
      user?.password ?? DEFAULT_USER.password
    )
    // const [about, setAbout] = useState(user?.about ?? DEFAULT_USER.about)
    // const [interests, setInterests] = useState(user?.interests ?? DEFAULT_USER.interests)
    // const [profession, setProfession] = useState(user?.profession ?? DEFAULT_USER.profession)
    // const [orientation, setOrientation] = useState(user?.orientation ?? DEFAULT_USER.orientation)
    const [gender, setGender] = useState(user?.gender ?? DEFAULT_USER.gender)
    const [relationship, setRelationship] = useState(
      user?.relationship ?? DEFAULT_USER.relationship
    )
    const [personalStatus, setPersonalStatus] = useState(
      user?.personalStatus ?? DEFAULT_USER.personalStatus
    )

    const [email, setEmail] = useState(user?.email ?? DEFAULT_USER.email)
    const [phone, setPhone] = useState(user?.phone ?? DEFAULT_USER.phone)
    const [whatsapp, setWhatsapp] = useState(
      user?.whatsapp ?? DEFAULT_USER.whatsapp
    )
    const [viber, setViber] = useState(user?.viber ?? DEFAULT_USER.viber)
    const [telegram, setTelegram] = useState(
      user?.telegram ?? DEFAULT_USER.telegram
    )
    const [instagram, setInstagram] = useState(
      user?.instagram ?? DEFAULT_USER.instagram
    )
    const [vk, setVk] = useState(user?.vk ?? DEFAULT_USER.vk)
    const [images, setImages] = useState(user?.images ?? DEFAULT_USER.images)
    const [birthday, setBirthday] = useState(
      user?.birthday ?? DEFAULT_USER.birthday
    )
    const [status, setStatus] = useState(user?.status ?? DEFAULT_USER.status)
    const [role, setRole] = useState(user?.role ?? DEFAULT_USER.role)

    const [haveKids, setHaveKids] = useState(
      user?.haveKids ?? DEFAULT_USER.haveKids
    )

    const [errors, checkErrors, addError, removeError, clearErrors] =
      useErrors()

    // const router = useRouter()

    // const refreshPage = () => {
    //   router.replace(router.asPath)
    // }

    const onClickConfirm = async () => {
      // Если создаем нового пользователя в ручную, то сначала проверим - нет ли уже такого номера телефона в системе
      if (!userId && phone) {
        const existedUser = users.find((user) => user.phone === phone)
        if (existedUser) {
          addError({
            phone: 'Пользователь с таким номером телефона уже существует',
          })
          return
        }
      }
      if (
        !checkErrors({
          firstName,
          secondName,
          gender,
          phone,
          viber,
          whatsapp,
          email,
          birthday,
          relationship,
        })
      ) {
        closeModal()
        const result = await setUser(
          {
            _id: user?._id,
            firstName,
            secondName,
            thirdName,
            // about,
            // interests,
            // profession,
            // orientation,
            password: userId ? undefined : password,
            gender,
            relationship,
            personalStatus,
            email,
            phone,
            whatsapp,
            viber,
            telegram,
            instagram,
            vk,
            images,
            birthday,
            status,
            role,
            haveKids,
          },
          clone
        )

        if (user?._id && loggedUser?._id === result?._id) {
          setLoggedUser(result)
        }
        // if (user && !clone) {
        //   await putData(
        //     `/api/users/${user._id}`,
        //     {
        //       name,
        //       secondName,
        //       thirdName,
        //       about,
        //       interests,
        //       profession,
        //       orientation,
        //       gender,
        //       phone,
        //       whatsapp,
        //       viber,
        //       telegram,
        //       instagram,
        //       vk,
        //       image,
        //       birthday,
        //     },
        //     refreshPage
        //   )
        // } else {
        //   await postData(
        //     `/api/users`,
        //     {
        //       name,
        //       secondName,
        //       thirdName,
        //       about,
        //       interests,
        //       profession,
        //       orientation,
        //       gender,
        //       phone,
        //       whatsapp,
        //       viber,
        //       telegram,
        //       instagram,
        //       vk,
        //       image,
        //       birthday,
        //     },
        //     refreshPage
        //   )
        // }
      }
    }

    useEffect(() => {
      const isFormChanged =
        user?.firstName !== firstName ||
        user?.secondName !== secondName ||
        user?.thirdName !== thirdName ||
        (!userId && user?.password !== password) ||
        // user?.about !== about ||
        // user?.interests !== interests ||
        // user?.profession !== profession ||
        // user?.orientation !== orientation ||
        user?.gender !== gender ||
        user?.relationship !== relationship ||
        user?.personalStatus !== personalStatus ||
        user?.email !== email ||
        user?.phone !== phone ||
        user?.whatsapp !== whatsapp ||
        user?.viber !== viber ||
        user?.telegram !== telegram ||
        user?.instagram !== instagram ||
        user?.vk !== vk ||
        !compareArrays(user?.images, images) ||
        user?.birthday !== birthday ||
        user?.haveKids !== haveKids ||
        user?.status !== status ||
        user?.role !== role

      setOnConfirmFunc(onClickConfirm)
      setOnShowOnCloseConfirmDialog(isFormChanged)
      setDisableConfirm(!isFormChanged)
    }, [
      firstName,
      secondName,
      thirdName,
      password,
      // about,
      // interests,
      // profession,
      // orientation,
      gender,
      relationship,
      personalStatus,
      email,
      phone,
      whatsapp,
      viber,
      telegram,
      instagram,
      vk,
      images,
      birthday,
      status,
      role,
      haveKids,
    ])

    useEffect(() => {
      if (setTopLeftComponent)
        setTopLeftComponent(() => (
          <CardButtons
            item={user}
            typeOfItem="user"
            forForm
            noEditButton
            onDelete={closeModal}
          />
        ))
    }, [setTopLeftComponent])

    return (
      <FormWrapper>
        {/* <InputImage
          label="Фотография"
          directory="users"
          image={image}
          onChange={setImage}
        /> */}
        <InputImages
          label="Фотографии"
          directory="users"
          images={images}
          onChange={(images) => {
            removeError('images')
            setImages(images)
          }}
          // required
          error={errors.images}
        />
        <Input
          label="Имя"
          type="text"
          value={firstName}
          onChange={(value) => {
            removeError('firstName')
            setFirstName(value)
          }}
          // labelClassName="w-40"
          error={errors.firstName}
          required
          autoComplete="one-time-code"
        />
        <Input
          label="Фамилия"
          type="text"
          value={secondName}
          onChange={(value) => {
            removeError('secondName')
            setSecondName(value)
          }}
          // labelClassName="w-40"
          error={errors.secondName}
          required
          autoComplete="one-time-code"
        />
        <Input
          label="Отчество"
          type="text"
          value={thirdName}
          onChange={(value) => {
            removeError('thirdName')
            setThirdName(value)
          }}
          error={errors.thirdName}
          autoComplete="one-time-code"
        />
        {!userId && (
          <Input
            label="Пароль"
            type="password"
            value={password}
            onChange={(value) => {
              removeError('password')
              setPassword(value)
            }}
            error={errors.password}
            autoComplete="one-time-code"
          />
        )}
        <GenderPicker
          required
          gender={gender}
          onChange={setGender}
          error={errors.gender}
        />
        {/* <OrientationPicker
          orientation={orientation}
          onChange={setOrientation}
        /> */}
        <DatePicker
          label="День рождения"
          value={birthday}
          onChange={setBirthday}
          showYears
          showZodiac
          required
          error={errors.birthday}
        />
        <RelationshipSelector
          value={relationship}
          onChange={(value) => {
            removeError('relationship')
            setRelationship(value)
          }}
          // placeholder={placeholder}
          // activePlaceholder={activePlaceholder}
          // smallMargin
          className="w-80"
          required
          error={errors.relationship}
          // fullWidth={fullWidth}
        />
        <Input
          label="Статус (будет виден всем на карточке)"
          type="text"
          value={personalStatus}
          onChange={setPersonalStatus}
        />
        <FormWrapper twoColumns>
          <PhoneInput
            required
            label="Телефон"
            value={phone}
            onChange={setPhone}
            error={errors.phone}
            copyPasteButtons
          />
          <PhoneInput
            label="Whatsapp"
            value={whatsapp}
            onChange={setWhatsapp}
            error={errors.whatsapp}
            copyPasteButtons
          />
        </FormWrapper>
        <FormWrapper twoColumns>
          <PhoneInput
            label="Viber"
            value={viber}
            onChange={setViber}
            error={errors.viber}
            copyPasteButtons
          />
          <Input
            prefix="@"
            label="Telegram"
            value={telegram}
            onChange={setTelegram}
            copyPasteButtons
          />
        </FormWrapper>
        <FormWrapper twoColumns>
          <Input
            prefix="@"
            label="Instagram"
            value={instagram}
            onChange={setInstagram}
            copyPasteButtons
          />
          <Input
            prefix="@"
            label="Vk"
            value={vk}
            onChange={setVk}
            copyPasteButtons
          />
        </FormWrapper>
        <Input
          label="Email"
          value={email}
          onChange={setEmail}
          error={errors.email}
          copyPasteButtons
        />
        {/* <CheckBox
          checked={haveKids}
          labelPos="left"
          onClick={() => setHaveKids((checked) => !checked)}
          label="Есть дети"
        /> */}
        <HaveKidsPicker haveKids={haveKids} onChange={setHaveKids} />
        {canSetStatus && (
          <UserStatusPicker
            required
            status={status}
            onChange={setStatus}
            error={errors.status}
          />
        )}
        {canSetRole && (
          <UserRolePicker
            required
            roleId={role}
            onChange={setRole}
            error={errors.role}
            noDev={!isLoggedUserDev}
          />
        )}
        <ErrorsList errors={errors} />
      </FormWrapper>
    )
  }

  return {
    title: `${userId && !clone ? 'Редактирование' : 'Создание'} пользователя`,
    confirmButtonName: userId && !clone ? 'Применить' : 'Создать',
    Children: UserModal,
  }
}

export default userFunc
