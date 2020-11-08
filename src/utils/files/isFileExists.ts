import { promises as fs } from 'fs'
import path from 'path'

/**
 * Check existence of file or directory (filename - case-insensitive)
 * We can check whole path case-insensitive, but that requires to go from '/' - bad idea
 */
export const isFileExists = async (
  fileOrDirectory: string
): Promise<boolean> => {
  const parent = path.dirname(fileOrDirectory)
  const file = path.basename(fileOrDirectory).toLocaleLowerCase()
  try {
    const files = await fs.readdir(parent)

    return files.some((f) => f.toLocaleLowerCase() === file)
  } catch {
    return false
  }
}
