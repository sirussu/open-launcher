import { IValidationTimestamp } from '@/store/modules/accounts/types'
import { DELAY_TIME_MS } from '@/constants'

export const getTimestamp = (): IValidationTimestamp => {
  const date = getDate()
  const timezone = getTimezone()
  const timestamp = date.getTime()
  const timestampWithDelayTime = timestamp + DELAY_TIME_MS

  return {
    timestampWithDelayTime,
    timezone,
    timestamp,
  }
}

export const getShiftedTimestamp = (stateTimestamp: IValidationTimestamp, timezone: string, shift: number): IValidationTimestamp => {
  return {
    timestampWithDelayTime: stateTimestamp.timestampWithDelayTime + shift,
    timestamp: stateTimestamp.timestamp + shift,
    timezone,
  }
}

export const getTimestampOffset = (date: Date) => {
  return -date.getTimezoneOffset() * 60 * 1000 // in milliseconds
}

export const isTimezoneHasOffset = (stateTimezone: string, currentTimezone: string): boolean => {
  if (stateTimezone && currentTimezone !== stateTimezone) {
    return true
  }

  return false
}

export const isDelayTimeIsGone = (stateTimestamp: number, currentTimestamp: number): boolean => {
  if (currentTimestamp > stateTimestamp) {
    return true
  }

  return false
}

export const getTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone

export const getDate = () => new Date()
