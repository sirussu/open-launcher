import path from 'path'

import { isFileExists } from './'

const FILES_TO_EXIST = ['Data', 'Data/ruRU']

/**
 * Check is correct directory for downloading client
 */
export const isCorrectClientDirectory = async (
  directory: string
): Promise<boolean> => {
  return (
    await Promise.all(
      FILES_TO_EXIST.map((f) => isFileExists(path.resolve(directory, f)))
    )
  ).every(Boolean)
}
