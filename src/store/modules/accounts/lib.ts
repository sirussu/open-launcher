import { IValidationTimestamp } from '@/store/modules/accounts/types'
import { DELAY_TIME_MS } from '@/config'

export const getTimestamp = (date: Date, timezone: string): IValidationTimestamp => {
  const timestamp = date.getTime()
  const timestampWithDelayTime = timestamp + DELAY_TIME_MS

  return {
    timestampWithDelayTime,
    timezone,
    timestamp,
  }
}

export const getShiftedTimestamp = (storeTimestamp: IValidationTimestamp, timezone: string, shift: number): IValidationTimestamp => {
  return {
    timestampWithDelayTime: storeTimestamp.timestampWithDelayTime + shift,
    timestamp: storeTimestamp.timestamp + shift,
    timezone,
  }
}

export const getTimestampOffset = (date: Date) => {
  return date.getTimezoneOffset() * 60 * 1000 // in milliseconds
}

export const isTimezoneHasOffset = (stateTimezone: string, currentTimezone: string): boolean => {
  if (stateTimezone && currentTimezone !== stateTimezone) {
    return true
  }

  return false
}

export const isDelayTimeIsGone = (stateTimestamp: number, currentTimestamp: number): boolean => {
  if (stateTimestamp && currentTimestamp > stateTimestamp) {
    return true
  }

  return false
}
