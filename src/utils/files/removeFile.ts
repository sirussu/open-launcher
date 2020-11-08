import { promises as fs } from 'fs'

import { isFileExists } from './'

/**
 * Remove file from disk
 * @param path - absolute path to file
 */
export const removeFile = async (path: string): Promise<void> => {
  if (await isFileExists(path)) {
    return await fs.unlink(path)
  }
}
