import RequestCard from '@layouts/cards/RequestCard'
import windowDimensionsNumSelector from '@state/selectors/windowDimensionsNumSelector'
import { useRecoilValue } from 'recoil'
import ListWrapper from './ListWrapper'

const RequestsList = ({ requests }) => {
  const widthNum = useRecoilValue(windowDimensionsNumSelector)

  return (
    <ListWrapper
      itemCount={requests.length}
      itemSize={widthNum > 3 ? 166 : widthNum === 3 ? 174 : 221}
      className="bg-general bg-opacity-15"
    >
      {({ index, style }) => (
        <RequestCard
          style={style}
          key={requests[index]._id}
          requestId={requests[index]._id}
        />
      )}
    </ListWrapper>
  )
}

export default RequestsList
