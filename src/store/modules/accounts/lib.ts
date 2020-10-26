import { IValidationTimestamp } from '@/store/modules/accounts/types'
import { PENDING_TIME_MS } from '@/config'

export const getTimestamp = (date: Date, shift?: number): IValidationTimestamp => {
  const timestamp = date.getTime()
  const timestampWithPendingTime = timestamp + PENDING_TIME_MS
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  if (shift) {
    return {
      timestampWithPendingTime: timestampWithPendingTime + shift,
      timestamp: timestamp + shift,
      timezone,
    }
  }

  return {
    timestampWithPendingTime,
    timezone,
    timestamp,
  }
}

export const getTimestampOffset = (date: Date) => {
  return date.getTimezoneOffset() * 60 * 1000 // in milliseconds
}
