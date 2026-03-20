'use client'

import React from 'react'
import { List } from 'react-window'

const Row = ({ index, style, itemData, itemRenderer }) =>
  itemRenderer({ index, style, data: itemData })

const FixedSizeList = ({
  height,
  width,
  itemCount,
  itemSize,
  itemData,
  itemKey: _itemKey,
  children,
  overscanCount,
  onItemsRendered,
  className,
  style,
  ...rest
}) => {
  const onRowsRendered = onItemsRendered
    ? (visibleRows, allRows) => {
        onItemsRendered({
          overscanStartIndex: allRows.startIndex,
          overscanStopIndex: allRows.stopIndex,
          visibleStartIndex: visibleRows.startIndex,
          visibleStopIndex: visibleRows.stopIndex,
        })
      }
    : undefined

  return (
    <List
      className={className}
      rowComponent={Row}
      rowProps={{ itemData, itemRenderer: children }}
      rowCount={itemCount}
      rowHeight={itemSize}
      overscanCount={overscanCount}
      onRowsRendered={onRowsRendered}
      style={{
        ...style,
        height,
        width,
      }}
      {...rest}
    />
  )
}

export default FixedSizeList
