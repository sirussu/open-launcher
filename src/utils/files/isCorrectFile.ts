import { promises as fs } from 'fs'

import { isFileExists } from './'

/**
 * Check that is correct file (right size and modification date if provided)
 */
export const isCorrectFile = async (
  path: string,
  size: number,
  timestamp?: number
): Promise<boolean> => {
  if (!(await isFileExists(path))) {
    return false
  }

  const stats = await fs.stat(path)

  return (
    !timestamp || (stats.mtime.getTime() === timestamp && stats.size === size)
  )
}
