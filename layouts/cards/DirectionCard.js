'use client'

import CardButtons from '@components/CardButtons'
import { CardWrapper } from '@components/CardWrapper'
import modalsFuncAtom from '@state/atoms/modalsFuncAtom'
import directionsAtom from '@state/atoms/directionsAtom'
import itemsFuncAtom from '@state/atoms/itemsFuncAtom'
import loadingAtom from '@state/atoms/loadingAtom'
import directionSelector from '@state/selectors/directionSelector'
import { useAtomValue } from 'jotai'

const DirectionCard = ({ directionId, hidden = false, style }) => {
  const modalsFunc = useAtomValue(modalsFuncAtom)
  const direction = useAtomValue(directionSelector(directionId))
  const loading = useAtomValue(loadingAtom('direction' + directionId))
  const itemFunc = useAtomValue(itemsFuncAtom)
  const directions = useAtomValue(directionsAtom)

  const setUp = async () => {
    if (direction.index === 0) return

    var movedUp = false
    var movedDown = false
    const itemsToChange = directions.map((item) => {
      if (!item.index && item.index === 0)
        Object.keys(directions).reduce((key, v) =>
          directions[v] < directions[key] ? v : key
        )

      if (item.index === direction.index)
        if (!movedUp) {
          movedUp = true
          return { ...item, index: item.index - 1 }
        }

      if (item.index === direction.index - 1)
        if (!movedDown) {
          movedDown = true
          return { ...item, index: item.index + 1 }
        }
    })
    await Promise.all(
      itemsToChange.map(async (item) => {
        if (item)
          await itemFunc.direction.set({
            _id: item._id,
            index: item.index,
          })
      })
    )
  }

  const setDown = async () => {
    if (direction.index >= directions.length - 1) return

    var movedUp = false
    var movedDown = false
    const itemsToChange = directions.map((item) => {
      if (item.index === direction.index)
        if (!movedDown) {
          movedDown = true
          return { ...item, index: item.index + 1 }
        }
      if (item.index === direction.index + 1)
        if (!movedUp) {
          movedUp = true
          return { ...item, index: item.index - 1 }
        }
    })
    await Promise.all(
      itemsToChange.map(async (item) => {
        if (item)
          await itemFunc.direction.set({
            _id: item._id,
            index: item.index,
          })
      })
    )
  }

  return (
    <CardWrapper
      loading={loading}
      onClick={() => !loading && modalsFunc.direction.edit(direction._id)}
      showOnSite={direction.showOnSite}
      hidden={hidden}
      style={style}
    >
      <div className="w-full">
        <div className="flex">
          <div className="flex-1 px-2 py-1 text-xl font-bold ">
            {direction.title}
          </div>
          <CardButtons
            item={direction}
            typeOfItem="direction"
            showOnSiteOnClick={() => {
              itemFunc.direction.set({
                _id: direction._id,
                showOnSite: !direction.showOnSite,
              })
            }}
            onUpClick={direction.index > 0 && setUp}
            onDownClick={direction.index < directions.length - 1 && setDown}
          />
        </div>
        <div className="whitespace-pre-wrap px-2 py-1 text-sm">
          {direction.shortDescription}
        </div>
      </div>
    </CardWrapper>
  )
}

export default DirectionCard
