'use client'

import { useState } from 'react'
import Button from '@components/Button'
import ContentHeader from '@components/ContentHeader'
import Input from '@components/Input'

const DevContent = () => {
  const [calendarId, setCalendarId] = useState('')
  const [forceFullSync, setForceFullSync] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [cleanupLoading, setCleanupLoading] = useState(false)
  const [cleanupError, setCleanupError] = useState('')
  const [cleanupResult, setCleanupResult] = useState(null)

  const handleSync = async () => {
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const response = await fetch('/api/events/google-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: calendarId.trim()
          ? JSON.stringify({
              calendarId: calendarId.trim(),
              forceFullSync,
            })
          : JSON.stringify({ forceFullSync }),
      })
      const rawText = await response.text()
      const data = rawText ? JSON.parse(rawText) : null
      if (!data) throw new Error('Пустой ответ от сервера')
      if (!response.ok || !data.success)
        throw new Error(data.error || 'Не удалось синхронизировать календарь')
      setResult(data.data)
    } catch (syncError) {
      setError(syncError.message || 'Не удалось синхронизировать календарь')
    } finally {
      setLoading(false)
    }
  }

  const handleCleanup = async () => {
    if (
      !window.confirm(
        'Удалить все импортированные из календаря мероприятия, которые еще не проверены?'
      )
    )
      return

    setCleanupLoading(true)
    setCleanupError('')
    setCleanupResult(null)
    try {
      const response = await fetch('/api/events/cleanup-unchecked', { method: 'POST' })
      const rawText = await response.text()
      const data = rawText ? JSON.parse(rawText) : null
      if (!data) throw new Error('Пустой ответ от сервера')
      if (!response.ok || !data.success)
        throw new Error(data.error || 'Не удалось удалить мероприятия')
      setCleanupResult(data.data)
    } catch (cleanupErr) {
      setCleanupError(cleanupErr.message || 'Не удалось удалить мероприятия')
    } finally {
      setCleanupLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <ContentHeader>
        <div className="flex flex-1 items-center justify-between">
          <h2 className="text-xl font-semibold">Разработчик</h2>
        </div>
      </ContentHeader>
      <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3">
          <Input
            label="ID календаря (необязательно)"
            type="text"
            value={calendarId}
            onChange={setCalendarId}
            placeholder="например, your-calendar-id@group.calendar.google.com"
          />
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={forceFullSync}
              onChange={(event) => setForceFullSync(event.target.checked)}
            />
            Полная синхронизация (игнорировать syncToken)
          </label>
          <Button
            name="Синхронизировать календарь"
            onClick={handleSync}
            loading={loading}
            className="w-full sm:w-auto"
          />
        </div>
        <div className="flex flex-col gap-3 rounded border border-amber-200 bg-amber-50 p-3">
          <div className="text-sm text-amber-800">
            Удалить все мероприятия, импортированные из Google Calendar, которые еще не
            отмечены как проверенные.
          </div>
          <Button
            name="Удалить непроверенные импорты"
            onClick={handleCleanup}
            loading={cleanupLoading}
            className="w-full sm:w-auto bg-amber-600 text-white hover:bg-amber-700"
          />
          {cleanupError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              {cleanupError}
            </div>
          )}
          {cleanupResult && (
            <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              Удалено мероприятий: <b>{cleanupResult.deleted ?? 0}</b>
            </div>
          )}
        </div>
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}
        {result && (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            <div>
              Импортировано событий: <b>{result.imported ?? 0}</b>
            </div>
            {Array.isArray(result.results) && result.results.length > 0 && (
              <div className="mt-2 max-h-64 overflow-auto text-xs text-emerald-900">
                <ul className="list-disc space-y-1 pl-4">
                  {result.results.map((item) => (
                    <li key={item.googleId}>
                      {item.title || 'Без названия'} — {item.action}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default DevContent
