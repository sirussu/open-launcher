import { IValidationTimestamp } from '@/store/modules/accounts/types'
import { VERIFY_ACCOUNTS_TIMEOUT } from '@/constants'

export const getTimestamp = (): IValidationTimestamp => {
  const date = new Date()
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const timestamp = date.getTime()
  const timestampWithDelayTime = timestamp + VERIFY_ACCOUNTS_TIMEOUT

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
  return !!(stateTimezone && currentTimezone !== stateTimezone);
}

export const isDelayTimeIsGone = (stateTimestamp: number, currentTimestamp: number): boolean => {
  return currentTimestamp > stateTimestamp;
}
