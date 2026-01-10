import Input from '@components/Input'
import colleaguesAtom from '@state/atoms/colleaguesAtom'
import { modalsFuncAtom } from '@state/atoms'
import { useState } from 'react'
import { useAtomValue } from 'jotai'

const colleagueSelectFunc = (onSelect, title = 'Выбор коллеги') => {
  const ColleagueSelectModal = ({ closeModal }) => {
    const colleagues = useAtomValue(colleaguesAtom)
    const modalsFunc = useAtomValue(modalsFuncAtom)
    const [search, setSearch] = useState('')

    const filteredColleagues = colleagues
      .filter((colleague) => {
        if (!search.trim()) return true
        const text = search.trim().toLowerCase()
        return [
          colleague.name,
          colleague.phone ? `+${colleague.phone}` : '',
          colleague.telegram,
          colleague.whatsapp ? `+${colleague.whatsapp}` : '',
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(text)
      })
      .sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''))

    const onPick = (colleague) => {
      onSelect && onSelect(colleague._id)
      closeModal()
    }

    return (
      <div className="flex h-full flex-col gap-2">
        <Input
          label="Поиск коллеги"
          value={search}
          onChange={setSearch}
          placeholder="Имя или контакт"
        />
        <button
          type="button"
          className="rounded bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-700"
          onClick={() =>
            modalsFunc.colleague?.add((created) => {
              if (created?._id) {
                onSelect && onSelect(created._id)
                closeModal()
              }
            })
          }
        >
          Создать коллегу
        </button>
        <div className="flex-1 overflow-auto rounded border border-gray-200">
          {filteredColleagues.length === 0 ? (
            <div className="p-3 text-sm text-gray-500">
              Коллеги не найдены
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredColleagues.map((colleague) => (
                <button
                  key={colleague._id}
                  className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-gray-50"
                  onClick={() => onPick(colleague)}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900">
                      {colleague.name || '[Без имени]'}
                    </span>
                    <span className="text-sm text-gray-600">
                      {colleague.phone
                        ? `+${colleague.phone}`
                        : 'Телефон не указан'}
                    </span>
                  </div>
                  {colleague.telegram && (
                    <span className="text-xs text-gray-500">
                      {colleague.telegram}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return {
    title,
    closeButtonName: 'Закрыть',
    Children: ColleagueSelectModal,
  }
}

export default colleagueSelectFunc
