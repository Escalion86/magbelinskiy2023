'use client'

import { useEffect, useMemo, useState } from 'react'
import { useAtomValue } from 'jotai'
import ContentHeader from '@components/ContentHeader'
import InputWrapper from '@components/InputWrapper'
import IconCheckBox from '@components/IconCheckBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt'
import siteSettingsAtom from '@state/atoms/siteSettingsAtom'
import { modalsFuncAtom } from '@state/atoms'

const normalizeTowns = (towns = []) =>
  Array.from(
    new Set(
      towns
        .map((town) => (typeof town === 'string' ? town.trim() : ''))
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, 'ru'))

const SettingsContent = () => {
  const siteSettings = useAtomValue(siteSettingsAtom)
  const modalsFunc = useAtomValue(modalsFuncAtom)
  const [darkTheme, setDarkTheme] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const isDark = storedTheme === 'dark'
    setDarkTheme(isDark)
    document.body.classList.toggle('theme-dark', isDark)
  }, [])

  const townsOptions = useMemo(
    () => normalizeTowns(siteSettings?.towns ?? []),
    [siteSettings?.towns]
  )

  return (
    <div className="flex h-full flex-col gap-4">
      <ContentHeader>
        <div className="flex flex-1 items-center justify-between">
          <div />
          <div />
        </div>
      </ContentHeader>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <InputWrapper label="Тема" fullWidth>
          <div className="flex w-full items-center justify-between gap-3">
            <div className="text-sm text-gray-600">
              Темная тема
            </div>
            <IconCheckBox
              checked={darkTheme}
              onClick={() => {
                const nextValue = !darkTheme
                setDarkTheme(nextValue)
                localStorage.setItem('theme', nextValue ? 'dark' : 'light')
                document.body.classList.toggle('theme-dark', nextValue)
              }}
              checkedIconColor="#111827"
              uncheckedIconColor="#9ca3af"
              noMargin
            />
          </div>
        </InputWrapper>
        <InputWrapper label="Города" fullWidth>
          <div className="flex w-full items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <div className="text-sm text-gray-600">
                Основной:{' '}
                <span className="font-semibold text-gray-900">
                  {siteSettings?.defaultTown || 'Не выбран'}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Городов создано: {townsOptions.length}
              </div>
            </div>
            <button
              type="button"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-orange-600 bg-orange-50 text-orange-500 shadow-sm transition hover:bg-orange-100 hover:text-orange-600"
              onClick={() => modalsFunc.settings?.towns()}
              title="Редактировать города"
            >
              <FontAwesomeIcon className="h-5 w-5" icon={faPencilAlt} />
            </button>
          </div>
        </InputWrapper>
      </div>
    </div>
  )
}

export default SettingsContent
