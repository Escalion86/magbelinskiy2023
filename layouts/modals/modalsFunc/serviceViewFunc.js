import Button from '@components/Button'
import CardButtons from '@components/CardButtons'
import Divider from '@components/Divider'
import ImageGallery from '@components/ImageGallery'
import PriceDiscount from '@components/PriceDiscount'
import TextLine from '@components/TextLine'
import { modalsFuncAtom } from '@state/atoms'
import serviceSelector from '@state/selectors/serviceSelector'
import DOMPurify from 'isomorphic-dompurify'
import { useEffect } from 'react'
import { useAtomValue } from 'jotai'

const CardButtonsComponent = ({ service }) => (
  <CardButtons item={service} typeOfItem="service" forForm />
)

const serviceViewFunc = (serviceId) => {
  const ServiceViewModal = ({
    closeModal,
    setOnConfirmFunc,
    setOnDeclineFunc,
    setOnShowOnCloseConfirmDialog,
    setDisableConfirm,
    setDisableDecline,
    setTopLeftComponent,
  }) => {
    const modalsFunc = useAtomValue(modalsFuncAtom)
    const service = useAtomValue(serviceSelector(serviceId))

    useEffect(() => {
      if (setTopLeftComponent)
        setTopLeftComponent(() => <CardButtonsComponent service={service} />)
    }, [service, setTopLeftComponent])

    if (!service || !serviceId)
      return (
        <div className="flex w-full justify-center text-lg ">
          ОШИБКА! Услуга не найдена!
        </div>
      )

    return (
      <div className="flex flex-col gap-y-2">
        <ImageGallery images={service?.images} />
        <div className="flex flex-1 flex-col">
          <div className="relative flex w-full max-w-full flex-1 flex-col px-2 py-2">
            <div className="flex w-full justify-center text-3xl font-bold">
              {service?.title}
            </div>
            {!setTopLeftComponent && (
              <div className="absolute right-0">
                <CardButtonsComponent service={service} />
              </div>
            )}
            <div
              className="ql textarea w-full max-w-full list-disc overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(service?.description),
              }}
            />

            <Divider thin light />
            <TextLine label="ID">{service?._id}</TextLine>
          </div>
          <Divider thin light />
          <div className="flex w-full flex-col items-center phoneH:flex-row phoneH:justify-between">
            <PriceDiscount
              item={service}
              className="px-2"
              prefix="Стоимость:"
            />
            <Button
              name="Подать заявку"
              stopPropagation
              onClick={() => modalsFunc.service.apply(service._id)}
              thin
            />
          </div>
        </div>
      </div>
    )
  }

  return {
    title: `Услуга`,
    confirmButtonName: 'Подать заявку',
    Children: ServiceViewModal,
  }
}

export default serviceViewFunc
